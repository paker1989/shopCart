import * as React from 'react';
import cx from 'classnames';

export default props => {
    const { anchor, text, currentAnchor, goTo } = props;
    const optionClass = cx({
      ['menu-item']: true,
      ['is-active']: anchor == currentAnchor
    })
    return (
        <span
            className={optionClass}
            onClick={() => {
                goTo(anchor);
            }}
        >
            {text}
        </span>
    );
};
