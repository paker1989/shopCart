
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Notify from '../../notify';
import FileInput from '../components/FileInput';
import './filepondMock.scss';
import ImagePreview from './ImagePreview';

class FilePond extends React.Component {

    static propTypes = {
        exeupload: PropTypes.func,
        autoUpload: PropTypes.bool,
    }

    static defaultProps = {
        autoUpload: true
    }

    constructor(props) {
        super(props);
        this.state = {
            texts: [],
            images: []
        }
    }

    handleUpload = (data, type, cb) => {
        const { exeUpload } = this.props;

        if (typeof exeUpload !== 'function') {
            Notify.error('exeUpload is missing');
            return;
        }

        let res = exeUpload(data, type);
        if (res && res.then) {
            res.then(() => {
                cb(null, data);
            }, (err) => {
                err = err || new Error('upload failed for ' + JSON.stringify(data));
                cb(err, data);
            })
        }
    }

    /**
         * @description update a single item
         * @param {*} data  
         * @param {*} targetList 
         * @param {*} type
     */
    uploadItem = (data, targetList, type) => {
        /**
         * @description update item status according to upload result
         * @param {*} err 
         * @param {*} data 
         */
        const cb = (err, data) => {
            if (err) {
                targetList
                    .find(e => e.fk === data.fk)
                    .status = 'fail';

                if (type === '_image_') {
                    this.setState({
                        images: targetList
                    });
                } else {
                    this.setState({
                        texts: targetList
                    });
                }
                return;
            }

            targetList
                .find(e => e.fk === data.fk)
                .status = 'success';
            if (type === '_image_') {
                this.setState({
                    images: targetList
                });
            } else {
                this.setState({
                    texts: targetList
                });
            }
        }

        this.handleUpload(data, type, cb);
    }

    handleChange = (localFiles) => {
        const { autoUpload } = this.props;
        const { texts, images } = this.state;
        const status = autoUpload ? 'progress' : 'standby';

        let newImages = localFiles
            .filter(data => this.isImage(data))
            .map(data => {
                data.status = status;
                return data;
            });

        let newTexts = localFiles
            .filter(data => this.isImage(data) === false)
            .map(data => {
                data.status = status;
                return data;
            });

        let allImages = images.concat(newImages);
        let allTexts = texts.concat(newTexts);

        this.setState({
            images: allImages,
            texts: allTexts
        }, () => {
            if (!autoUpload)
                return;

            let { images, texts } = this.state;

            newImages.forEach((image) => {
                this.uploadItem(image, images, '_image_');
            });
            newTexts.forEach((text) => {
                this.uploadItem(text, texts, '_text_');
            });
        });
    }

    /**
     *@description handle action requested from preview items
     */
    handleAction = (data, action, type) => {
        let { texts, images } = this.state;

        switch (action) {
            case '_delete_':
                if (type === '_image_') {
                    images.splice(images.findIndex(e => e.fk === data.fk), 1);
                    this.setState({ images });
                } else {
                    texts.splice(texts.findIndex(e => e.fk === data.fk), 1);
                    this.setState({ texts });
                }
                break;
            case '_reload_':
                if (type === '_image_') {
                    images
                        .find(item => item.fk === data.fk)
                        .status = 'progress';
                    this.setState({
                        images
                    }, () => {
                        this.uploadItem(data, images, type);
                    })
                } else {
                    texts
                        .find(item => item.fk === data.fk)
                        .status = 'progress';
                    this.setState({
                        texts
                    }, () => {
                        this.uploadItem(data, texts, type);
                    })
                }
                break;
        }
    }

    isImage = (data) => {
        return data.src !== undefined;
    }

    render() {
        const { texts, images } = this.state;
        const isContainFailure = !!(texts.find(item => item.status === 'fail')
            || images.find(item => item.status === 'fail'));

        const wrapperClass = cx({
            ['file-pond-container']: true,
            ['is-expand']: texts.length + images.length > 0,
            ['upload-fail']: isContainFailure
        })

        return (
            <div className={wrapperClass}>
                <div className="tip-container">
                    <span>Drag & drop your files or <a>Browser</a></span>
                    <FileInput maxAmount={0}
                        lastImageIndex={images.length}
                        lastFileIndex={texts.length}
                        onChange={this.handleChange} />
                </div>
                <div className="images-container">
                    <ImagePreview
                        images={images}
                        handleAction={(fk, action) => this.handleAction(fk, action, '_image_')}
                    />
                </div>
            </div>
        );
    }
}

export default FilePond;