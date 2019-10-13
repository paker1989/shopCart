import * as React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import CalDaySimpleEvtList from '../../../../common/calDayEvtPresenter/calDaySimpleEvtList';
import { CalendarNS } from '../../../../../utils/types';
import { isSameDay } from '../../../../../../../_packages_/components/datePicker/common/util';
import { getYYYYMMDDDate } from '../../../../../utils/timeUtils';

import './header.scss';

const mapStateToProps = (state, ownProps) => ({
    evts: state.evtsReducers.cachedEvts[getYYYYMMDDDate(ownProps.date)],
});

class DefaultHeader extends React.Component<
    CalendarNS.ISingleDayDefaultHeaderProps,
    any
> {
    static defaultProps = {
        textAlign: 'left',
    };

    render() {
        const {
            textAlign,
            cnCalendarNb,
            date,
            dayAt,
            onClick,
            evts,
        } = this.props;

        // console.log(evts);
        const wholedayEvts = evts ? evts.filter(evt => evt.allDayEvt) : null;

        const isToday = isSameDay(date, new Date());

        const wrapperClass = cx({
            ['singleDayCol-defaultHeader-container']: true,
            [`is-${textAlign}`]: true,
        });

        const dateContentClass = cx({
            ['singleDayCol-defaultHeader-container__dateContent']: true,
            [`is-clickable`]: typeof onClick === 'function',
            ['is-today']: isToday,
        });

        const calendarNbClass = cx({
            ['singleDayCol-defaultHeader-container__cnCalendarNb']: true,
            ['is-lighter-grey']: !isToday,
        });

        const dateContent = (
            <div
                className={dateContentClass}
                onClick={() => {
                    onClick && onClick(date);
                }}
            >
                {date && (
                    <span className="singleDayCol-defaultHeader-container__dateNumber">
                        {date.getDate()}
                    </span>
                )}
                {cnCalendarNb && (
                    <span className={calendarNbClass}>{cnCalendarNb}</span>
                )}
            </div>
        );

        return (
            <div className={wrapperClass}>
                <div className="text-wrapper">
                    {dayAt && (
                        <span className="singleDayCol-defaultHeader-container__dayAt font-subtitle">
                            {dayAt}
                        </span>
                    )}
                    {dateContent}
                </div>
                {wholedayEvts && (
                    <div className="evtList-wrapper">
                        {/* <div className="placeholder"></div> */}
                        <CalDaySimpleEvtList evts={wholedayEvts} />
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(DefaultHeader);
