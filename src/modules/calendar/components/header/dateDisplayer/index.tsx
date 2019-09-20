import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage, FormattedDate } from 'react-intl';
import { getPath, getDateToNav } from '../../../utils/routeHelper';

import './dateDisplayer.scss';

const _test_chinese_month_Display = '农历七月 ~ 八月';

const mapStateToProps = state => {
    return {
        currentWeek: state.dateReducers.currentWeek,
        currentDate: state.dateReducers.currentDate,
        currentMonth: state.dateReducers.currentMonth,
        currentYear: state.dateReducers.currentYear,
        layout: state.layoutReducers.layout,
    };
};

class DateDisplayer extends React.Component<any, any> {
    handleToggle = (action: 'prev' | 'next') => {
        const { match, currentDate, history } = this.props;
        const { layout } = match.params;
        const targetDate = getDateToNav(currentDate, layout, action);
        history.push(getPath(targetDate, match.params));
    };

    toTargetDate = () => {
        const { match, history } = this.props;
        history.push(getPath(new Date(), match.params));
    };

    render() {
        const { location, currentDate, currentYear, currentWeek } = this.props;
        let displayText;
        let showWeek = true;
        let path = location.pathname.replace('/', '');

        if (path === 'year' || path === 'month') {
            showWeek = false;
        }
        if (path === 'year') {
            displayText = currentYear;
        } else {
            displayText = (
                <FormattedDate
                    value={currentDate}
                    year="numeric"
                    month="long"
                />
            );
        }

        return (
            <div className="header-dateDisplayer-container">
                <div className="header-dateDisplayer-container__left">
                    <div
                        onClick={this.toTargetDate}
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
                            <div
                                className="circle-wrapper"
                                onClick={() => this.handleToggle('prev')}
                            >
                                <span>
                                    <svg
                                        className="ali-icon"
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#icon-left" />
                                    </svg>
                                </span>
                            </div>
                            <div
                                className="circle-wrapper"
                                onClick={() => this.handleToggle('next')}
                            >
                                <span>
                                    <svg
                                        className="ali-icon"
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#icon-right" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="header-dateDisplayer-container__monthDisplay">
                            <div className="header-dateDisplayer-container__monthDisplay-text no-select">
                                <span>{displayText}</span>
                                {showWeek && (
                                    <div className="header-dateDisplayer-container__weekDisplay">
                                        <span>
                                            <FormattedMessage
                                                id="cal.nbOfWeek"
                                                values={{
                                                    noOfWeek: currentWeek,
                                                }}
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="font-subtitle no-select">
                                {_test_chinese_month_Display}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(DateDisplayer));
