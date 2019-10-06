import * as React from 'react';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import CalDaySimpleEvtList from './calDaySimpleEvtList';
import { DayConverter } from '../../../../../_packages_/utils/i18nHelper';
import * as EvtsActionCreator from '../../../store/action/evtsAction';
import { getYYYYMMDDDate } from '../../../utils/timeUtils';
import { CalendarNS } from '../../../utils/types';

import './dayEvtPresenter.scss';

const Content = (props: CalendarNS.ICalEventPresenterProps) => {
    const { showClose, date } = props;
    const dateKey = getYYYYMMDDDate(date);
    const evtData = useSelector(
        (state: any) => state.evtsReducers.cachedEvts[dateKey]
    );
    const dispatch = useDispatch();
    const [calEvts, setCalEvts] = useState([]);
    const [loading, setLoading] = useState(true);

    const onClose = () => {
        props.onClose();
    };

    //load evts when it is undefined
    useEffect(() => {
        if (!evtData) {
            setLoading(true);
            dispatch(EvtsActionCreator.fetchEvts(date));
        } else {
            setLoading(false);
            setCalEvts(evtData.evts);
        }
    }, [evtData]);

    const renderClose = showClose && (
        <div className="dayEvent-presenter-content__close" onClick={onClose}>
            <div className="dayEvent-presenter-content__close--wrapper">
                <svg className="ali-icon" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                </svg>
            </div>
        </div>
    );

    const renderDate = (
        <div className="dayEvent-presenter-content__dateDisplay">
            <span className="dayEvent-presenter-content__dateDisplay--showDay">
                <FormattedMessage id={DayConverter[date.getDay()]} />
            </span>
            <div className="dayEvent-presenter-content__dateDisplay--showDate is-lighter-gey">
                <span>{date.getDate()}</span>
            </div>
        </div>
    );

    const loadingContent = (
        <div className="cal-animated-background content-loading"></div>
    );
    
    return (
        <div className="dayEvent-presenter-content">
            {renderClose}
            <div className="dayEvent-presenter-content__main">
                {renderDate}
                <div className="dayEvent-presenter-content__events">
                    {loading ? (
                        loadingContent
                    ) : (
                        <CalDaySimpleEvtList evts={calEvts} />
                    )}
                </div>
            </div>
        </div>
    );
};

Content.defaultProps = {
    showClose: true,
};

export default Content;
