import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Saturation from './commons/Saturation';

export default ({
  prefix,
}) => {
  console.log('color board' + prefix);
  return (
    <div className={`${prefix}-colorboard-container`}>
      <Saturation 
        prefix={prefix}
      />
    </div>
  );
}