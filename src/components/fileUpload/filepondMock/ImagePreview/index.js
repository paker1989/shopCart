
import React from 'react';

import cx from 'classnames';
import { Reload, Delete, Loading } from '../../../icon';
import './ImagePreview.scss';


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

                    console.log(status);

                    const imageBlurClass = cx({
                        ['image-blur']: true,
                        ['is-success']: status === 'success',
                        ['is-failure']: status === 'fail',
                        ['is-inprogress']: status === 'progress'
                    })
                    return (
                        <div className="image-preview-container"
                            key={fk}>
                            <div className={imageBlurClass}></div>
                            <div className="image-preview-body">
                                <Reload
                                    className="preview-icon right"
                                    circle={true}
                                    onClick={() => handleAction(fk, '_reload_')} />
                                <Delete
                                    className="preview-icon left"
                                    circle={true}
                                    onClick={() => handleAction(fk, '_delete_')} />
                                <Loading
                                    className="preview-icon right"
                                    circle={true} />
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