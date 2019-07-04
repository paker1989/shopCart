
import cx from 'classnames';
import React from 'react';
import { Delete, Loading, Reload } from '../../../icon';
import './ImagePreview.scss';


// const _STATUS_TYPES = ['success', 'standby', 'progress', 'fail'];

class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { images, handleAction } = this.props;

        return (
            <div className="image-preview-list">
                {images.map(image => {
                    const { src, fk, status } = image;

                    const imageBlurClass = cx({
                        ['image-blur']: true,
                        ['is-success']: status === 'success',
                        ['is-failure']: status === 'fail',
                        ['is-inprogress']: status === 'progress'
                    });

                    return (
                        <div className="image-preview-container"
                            key={fk}>
                            <div className={imageBlurClass}></div>
                            <div className="image-preview-body">
                                <div className="image-info-header">
                                    <div className="image-info-part grow">
                                        <Delete
                                            visible={status !== 'progress'}
                                            className="preview-icon"
                                            circle={true}
                                            onClick={() => handleAction(image, '_delete_')} />
                                        <p className="image-info-text">{image.file.name}</p>
                                    </div>
                                    <div className="image-info-part right grow no-shrink">
                                        {(status === 'fail') && (
                                            <p className="image-info-text">Error during upload</p>
                                        )}
                                        <Reload
                                            visible={status === 'fail'}
                                            className="preview-icon"
                                            circle={true}
                                            onClick={() => handleAction(image, '_reload_')} />
                                        {(status === 'progress') && (
                                            <p className="image-info-text">Uploading</p>
                                        )}
                                        <Loading
                                            visible={status === 'progress'}
                                            className="preview-icon"
                                            circle={true} />
                                    </div>


                                </div>
                                <img src={src} className="image-preview" />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ImagePreview;