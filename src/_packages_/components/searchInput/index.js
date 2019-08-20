import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import noop from 'lodash/noop';

import Input from '../input';
import './searchInput.scss';

class SearchInput extends React.Component {

    static propTypes = {
        prefix: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
    }

    static defaultProps = {
        onChange: noop,
        prefix: 'bxu',
        value: '',
    }

    render() {
        const { prefix, className, ...inputProps } = this.props;
        let classes = cx({
            [`${prefix}-searchinput_container`]: true,
        }, className);

        return (
            <div className={classes}>
                <Input
                    showClear={true}
                    {...inputProps} />
                <span className="search-icon">
                    {/* <FontAwesomeIcon icon="search"/> */}
                    <svg className="ali-icon grey" aria-hidden="true">
                        <use xlinkHref="#icon-49shurushanchu-2"></use>
                    </svg>
                </span>
            </div>
        );
    }
}

export default SearchInput;