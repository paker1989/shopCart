import React from 'react';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';

import FileInput from '../FileInput';
import Uploaded from '../Uploaded';
import { checkTypeIncludes, isImage } from '../../utils/accept';

import './UploadPanel.scss';


class UploadPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            localImages: [],
            localTexts: [],
            netWorkImageSrc: '',
            lastImageIndex: 0,
            lastFileIndex: 0,
            errorMessage: '',
            uploading: false
        }
    }

    handleFileChange = (files) => {
        let { localImages,
            localTexts,
            lastFileIndex,
            lastImageIndex } = this.state;
        if (!files)
            return;

        files.forEach((item) => {
            if (isImage(item.file.type)) {
                localImages.splice(localImages.length, 0, item);

                this.setState({
                    localImages,
                    lastImageIndex: ++lastImageIndex
                });
            } else {
                localTexts.splice(localTexts.length, 0, item);
                this.setState({
                    localTexts,
                    lastFileIndex: ++lastFileIndex
                });
            }
        })
    }

    handleNetWorkImage = (e) => {
        const { value } = e.target;
        if (value && value.trim().length > 0) {
            this.setState({ netWorkImageSrc: value });
        }
    }

    retrievenwImage = () => {
        const { netWorkImageSrc } = this.state;
        const { onClose } = this.props;

        if (netWorkImageSrc.length > 0) {
            onClose && onClose();
        }
    }

    deleteUploaded = (fk, sourceType) => {
        const { localImages, localTexts } = this.state;

        switch (sourceType) {
            case '_TEXT_':
                localTexts.splice(localTexts.findIndex((item) => {
                    return item.fk === fk;
                }), 1);
                this.setState({ localTexts });
                break;
            case '_IMAGE_':
                localImages.splice(localImages.findIndex((item) => {
                    return item.fk === fk;
                }), 1);
                this.setState({ localTexts });
                break;
            default:
                break;
        }
    }

    /**
     * handle upload
     */
    handleUpload = () => {
        const { onClose, exeUpload } = this.props;
        let { localImages, localTexts } = this.state;

        if (!exeUpload || !isFunction(exeUpload)) {
            console.warn('exeUpload method is missing');
            onClose();
            return;
        }

        const handleError = (res) => {
            this.setState({
                errorMessage: res
            });
        }

        const continuation = () => {
            const res = exeUpload({
                images: localImages,
                texts: localTexts
            });
            if (res && isFunction(res.then)) {
                res.then(onClose, handleError);
            } else {
                onClose();
            }
        }

        this.setState({
            uploading: true
        }, continuation);
    }

    render() {
        const { prefix,
            maxAmount,
            maxSize,
            type,
            localOnly,
            onClose,
        } = this.props;

        const { localImages,
            localTexts,
            lastImageIndex,
            lastFileIndex,
            uploading
        } = this.state;

        // show it when localOnly is false and type contains image
        const isShowNetwork = !localOnly && checkTypeIncludes(type, 'image');
        const isConfirmValid = localImages.length > 0 || localTexts.length > 0;
        const confirmButtonClass = cx({
            [`${prefix}-confirm`]: true,
            ['is-valid']: isConfirmValid,
        });

        return (
            <React.Fragment>
                <div className={`${prefix}-uploader-head-container`}>
                    <span className="head-title">资源选择</span>
                    <span className="head-close-button"
                        onClick={onClose}>×</span>
                </div>
                <div className={`${prefix}-uploader-content-container`}>
                    {isShowNetwork && (
                        <div className={`${prefix}-uploader-row`}>
                            <div className="upload-label">网络图片:</div>
                            <div className="upload-body upload-network-image-wraper">
                                <input
                                    type="text"
                                    placeholder="请添加网络图片地址"
                                    onChange={this.handleNetWorkImage} />
                                <button onClick={this.retrievenwImage}>提取</button>
                            </div>
                        </div>
                    )}
                    <div className={`${prefix}-uploader-row`}>
                        <div className="upload-label">本地资源:</div>
                        <div className="upload-body">
                            <div className="upload-icon">
                                <span>+</span>
                                <FileInput
                                    lastImageIndex={lastImageIndex}
                                    lastFileIndex={lastFileIndex}
                                    type={type}
                                    maxAmount={maxAmount}
                                    maxSize={maxSize}
                                    onChange={this.handleFileChange} />
                            </div>
                        </div>
                    </div>
                    <div className={`${prefix}-uploader-row`}>
                        <div className="upload-label">已选择资源:</div>
                        <Uploaded images={localImages}
                            texts={localTexts}
                            showDelete={true}
                            onDelete={this.deleteUploaded} />
                    </div>
                </div>
                <div className={`${prefix}-uploader-confirm-container`}>
                    <button className={confirmButtonClass}
                        onClick={this.handleUpload}>确 认</button>
                </div>
            </React.Fragment>
        );
    }
}

export default UploadPanel;