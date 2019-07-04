
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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

    handleChange = (localFiles) => {
        const { exeUpload, autoUpload } = this.props;
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

        /**
         * @description uppload
         * @param {*} list 
         * @param {*} targetList 
         */
        const continuation = (list, targetList, type) => {
            list.forEach((data) => {
                let res = exeUpload(data);
                if (res && res.then) {
                    res.then(() => {
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
                    }, () => {
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
                    })
                } else {
                    targetList.find(e => e.fk === data.fk)
                        .status = 'is-success';

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
            });
        }

        this.setState({
            images: allImages,
            texts: allTexts
        }, () => {
            if (!autoUpload)
                return;

            if (typeof exeUpload === 'undefined') {
                console.error('exeUpload is undefind');
                return;
            }

            let { images, texts } = this.state;

            continuation(newImages, images, '_image_');
            continuation(newTexts, texts, '_text_');

        });
    }

    handleAction = (fk, action, type) => {
        let { texts, images } = this.state;
        switch (action) {
            case '_delete_':
                if (type === '_image_') {
                    images.splice(images.findIndex(e => e.fk === fk), 1);
                    this.setState({ images });
                }
                break;
            case '_reload_':
                break;
        }
    }

    isImage = (data) => {
        return data.src !== undefined;
    }

    render() {
        const { texts, images } = this.state;
        const wrapperClass = cx({
            ['file-pond-container']: true,
            ['is-expand']: texts.length + images.length > 0
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