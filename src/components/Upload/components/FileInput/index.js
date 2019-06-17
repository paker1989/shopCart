import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';

import { DEFAULT_ACCEPT, getAcceptFromArray } from '../../utils/accept';
import './FileInput.scss';

class FileInput extends React.PureComponent {

  static propTypes = {
    type: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    multiple: PropTypes.bool
  }

  static defaultProps = {
    type: ['image', 'text'],
    multiple: false
  }


  constructor(props) {
    super(props);
  }

  render() {
    const { type, multiple } = this.props;
    const accept = isArray(type) ? getAcceptFromArray(type) : DEFAULT_ACCEPT[type];

    return (
      <input
        className="upload-input"
        type="file"
        accept={accept}
        multiple={multiple}/>
    );
  }
}

export default FileInput;