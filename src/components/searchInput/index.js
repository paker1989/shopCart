import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Input from '../input';

class SearchInput extends React.Component {
 
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const { prefix, className } = this.props;
    let classes = cx({
      [`${prefix}-searchinput_container`]: true,
    }, className);

    return (
      <div className={classes}>
        <Input
          showClear={true}/>
      </div>
    );
  }
}

export default SearchInput;