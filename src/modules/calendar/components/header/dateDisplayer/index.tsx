import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage, FormattedDate } from 'react-intl';

import { DayConverter } from '../../../utils/i18nProvider';
import CalTooltip from '../../../../../_packages_/components/calTooltip';
import { getPath, getDateToNav } from '../../../utils/routeHelper';

import './dateDisplayer.scss';

const _test_chinese_month_Display = '农历七月 ~ 八月';

const mapStateToProps = state => {
    return {
        currentWeek: state.dateReducers.currentWeek,
        currentDate: state.dateReducers.currentDate,
        currentMonth: state.dateReducers.currentMonth,
        currentYear: state.dateReducers.currentYear,
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
        const { currentDate, currentYear, currentWeek, match } = this.props;
        const todayDate = new Date();

        let displayText;
        let showWeek = true;
        let path = match.params.layout;

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

        const todayTooltipContent = (
            <FormattedMessage
                id="cal.day.descrip"
                values={{
                    date: (
                        <FormattedDate
                            value={todayDate}
                            month="long"
                            day="numeric"
                        />
                    ),
                    day: (
                        <FormattedMessage
                            id={DayConverter[todayDate.getDay()]}
                        />
                    ),
                }}
            />
        );

        return (
            <div className="header-dateDisplayer-container">
                <div className="header-dateDisplayer-container__left">
                    <CalTooltip content={todayTooltipContent}>
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
                    </CalTooltip>
                    <div className="header-dateDisplayer-container__dateSwitch">
                        <div className="header-dateDisplayer-container__monthArrow">
                            <CalTooltip
                                content={
                                    <FormattedMessage id={`cal.prev${path}`} />
                                }
                            >
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
                            </CalTooltip>
                            <CalTooltip
                                content={
                                    <FormattedMessage id={`cal.next${path}`} />
                                }
                            >
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
                            </CalTooltip>
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
