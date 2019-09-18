import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, FormattedDate } from 'react-intl';

import * as dateActionCreator from '../../../store/action/dateAction';

import './dateDisplayer.scss';

const _test_month_Display = (
    <FormattedDate value={new Date()} year="numeric" month="long" />
);
const _test_chinese_month_Display = '农历七月 ~ 八月';

const mapStateToProps = state => {
    return {
        currentWeek: state.dateReducers.currentWeek,
        currentDate: state.dateReducers.currentDate,
        currentMonth: state.dateReducers.currentMonth,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toNextWeek: (currentDate: Date) =>
            dispatch(dateActionCreator.toNextWeek(currentDate)),
        toPrevWeek: (currentDate: Date) =>
            dispatch(dateActionCreator.toPrevWeek(currentDate)),
        toNextDay: (currentDate: Date) =>
            dispatch(dateActionCreator.toNextDay(currentDate)),
        toPrevDay: (currentDate: Date) =>
            dispatch(dateActionCreator.toPrevDay(currentDate)),
        toNextMonth: (currentDate: Date) =>
            dispatch(dateActionCreator.toNextMonth(currentDate)),
        toPrevMonth: (currentDate: Date) =>
            dispatch(dateActionCreator.toPrevMonth(currentDate)),
        toNextYear: (currentDate: Date) =>
            dispatch(dateActionCreator.toNextYear(currentDate)),
        toPrevYear: (currentDate: Date) =>
            dispatch(dateActionCreator.toPrevYear(currentDate)),
    };
};

class DateDisplayer extends React.Component<any, any> {
    handleToggle = (action: 'prev' | 'next') => {
        const {
            location,
            currentDate,
            toNextWeek,
            toPrevWeek,
            toNextDay,
            toPrevDay,
            toNextMonth,
            toPrevMonth,
            toNextYear,
            toPrevYear,
        } = this.props;

        switch (location.pathname) {
            case '/month':
                action === 'next'
                    ? toNextMonth(currentDate)
                    : toPrevMonth(currentDate);
                return;
            case '/week':
                action === 'next'
                    ? toNextWeek(currentDate)
                    : toPrevWeek(currentDate);
                return;
            case '/day':
                action === 'next'
                    ? toNextDay(currentDate)
                    : toPrevDay(currentDate);
                return;
            case '/year':
                action === 'next'
                    ? toNextYear(currentDate)
                    : toPrevYear(currentDate);
                return;
            default:
                return;
        }
    };

    render() {
        return (
            <div className="header-dateDisplayer-container">
                <div className="header-dateDisplayer-container__left">
                    <div
                        role="button"
                        arial-label="today"
                        className="btn header-dateDisplayer-container__today"
                    >
                        <span>
                            <FormattedMessage id="cal.today" />
                        </span>
                    </div>
                    <div className="header-dateDisplayer-container__dateSwitch">
                        <div className="header-dateDisplayer-container__monthArrow">
                            <span onClick={() => this.handleToggle('prev')}>
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-left" />
                                </svg>
                            </span>
                            <span onClick={() => this.handleToggle('next')}>
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-right" />
                                </svg>
                            </span>
                        </div>
                        <div className="header-dateDisplayer-container__monthDisplay">
                            <div className="header-dateDisplayer-container__monthDisplay-text">
                                {_test_month_Display}
                            </div>
                            <div className="font-subtitle">
                                {_test_chinese_month_Display}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DateDisplayer));
