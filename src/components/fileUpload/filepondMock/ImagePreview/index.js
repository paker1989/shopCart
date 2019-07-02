
import React from 'react';

import cx from 'classnames';
import { Reload, Delete } from '../../../icon';
import './ImagePreview.scss';


class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { images, status } = this.props;

        // console.log(images);
        return (
            <div className="image-preview-list">
                {images.map(image => {
                    const { src, fk } = image;
                    console.log(src);
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
                                <Reload/>
                                <Delete />
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