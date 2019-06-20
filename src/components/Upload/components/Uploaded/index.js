import React from 'react';

import './Uploaded.scss';
import { formatSize } from '../../utils/accept'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Uploaded extends React.Component {

  constructor(props) {
    super(props);
    const { showDelete, onDelete } = this.props;

    if ((showDelete && !onDelete) || (!showDelete && onDelete)) {
        throw new Error('show delete and onDelete props are both required.');
    }
  }

  render() {
    const {
      images,
      texts,
      showDelete,
      onDelete,
    } = this.props;

    return (
      <div className="uploaded-result-container">
        {(images && images.length > 0) && (
            <ul className="local-images-list">
                {images.map(image => (
                <li key={image.fk}>
                    <div className="local-image-wrapper"               
                        style={{backgroundImage: `url("${image.src}")`}}>
                        {showDelete && (
                            <span onClick={() => {onDelete(image.fk, '_IMAGE_')}}>
                                <FontAwesomeIcon icon="times-circle"/>
                            </span>)}
                    </div>
                </li>
                ))}
            </ul>
        )}
        {(texts && texts.length > 0) && (
            <ul className="local-text-list">
                {texts.map(item => (
                <li key={item.fk}>
                    <div className="local-file-wraper">
                        <p className="name-label">{item.file.name}</p>
                        <p className="size-label">{formatSize(item.file.size)}</p>
                        {showDelete && (
                            <span onClick={() => {onDelete(item.fk, '_TEXT_')}}>
                                <FontAwesomeIcon icon="times-circle"/>
                            </span>)}
                    </div>
                </li>
                ))}
            </ul>  
        )}   
      </div>
    );
  }
}

export default Uploaded;