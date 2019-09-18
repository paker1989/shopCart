import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import * as LayoutActionCreator from '../../../../store/action/layoutAction';

import './content.scss';

const layouts = [
    { title: <FormattedMessage id="cal.day" />, abbr: 'D', link: '/day' },
    { title: <FormattedMessage id="cal.week" />, abbr: 'W', link: '/week' },
    { title: <FormattedMessage id="cal.month" />, abbr: 'M', link: '/month' },
    { title: <FormattedMessage id="cal.year" />, abbr: 'Y', link: '/year' },
    { title: <FormattedMessage id="cal.4days" />, abbr: 'X', link: '#' },
];

const mapDispatchToProps = dispatch => ({
    updateLayout: layout => dispatch(LayoutActionCreator.updateLayout(layout)),
});

const _test_extra_options = [
    {
        title: <FormattedMessage id="cal.displaywe" />,
        status: 'enabled',
    },
]; // possible status: disabled, selected, enabled

class LayoutPickerContent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    /**
     * @description just to remind componnts to update
     */
    handleNav = (link: string) => {
        const { history, updateLayout } = this.props;
        updateLayout(link.replace('/', ''));
        history.push(link);
    };

    render() {
        return (
            <div className="layoutPicker-content-container">
                <div className="layoutPicker-content-container-options__main">
                    {layouts.map((option, index) => (
                        <div
                            className="item-wrapper"
                            key={`layout-option-${index}`}
                            onClick={() => this.handleNav(option.link)}
                        >
                            <span className="item-title font-layout-option">
                                {option.title}
                            </span>
                            <span className="item-title font-layout-option">
                                {option.abbr}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="layoutPicker-content-container-options__extra">
                    {_test_extra_options.map((option, index) => {
                        let optionClass = cx({
                            ['item-wrapper']: true,
                            [`is-${option.status}`]: true,
                        });

                        return (
                            <div
                                className={optionClass}
                                key={`extra-option-${index}`}
                            >
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-done"></use>
                                </svg>
                                <span className="item-title font-layout-option">
                                    {option.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(() => ({}), mapDispatchToProps)(withRouter(LayoutPickerContent));
