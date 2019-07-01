
import React from 'react';

import './ImagePreview.scss';


class ImagePreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { images } = this.props;

        console.log(images);
        return (
            <div className="image-preview-list">
                {images.map(image => {
                    const { src, fk } = image;
                    console.log(src)
                    return (
                        <div className="image-preview-container"
                            key={fk}>
                          <img src={src} className="image-preview"/>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ImagePreview;