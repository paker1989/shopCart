
import React from 'react';
import cx from 'classnames';

import FileInput from '../components/FileInput';
import ImagePreview from './ImagePreview';
import './filepondMock.scss';

class FilePond extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            texts: [],
            images: []
        }
    }
    handleChange = (localFiles) => {
        console.log(localFiles);
        const { texts, images } = this.state;

        let newImages = images.concat(
            localFiles.filter(data => this.isImage(data)));
        let newTexts = texts.concat(
            localFiles.filter(data => this.isImage(data) === false));
        this.setState({
            images: newImages,
            texts: newTexts
        });     
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
                   /> 
                </div>
            </div>
        );
    }
}

export default FilePond;