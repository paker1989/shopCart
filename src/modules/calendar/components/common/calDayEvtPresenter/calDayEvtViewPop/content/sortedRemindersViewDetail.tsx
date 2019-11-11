import * as React from 'react';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';
import { FormattedMessage } from 'react-intl';

export interface ISortedRemindersViewDetailProps {
    sortedReminder: CalEvtDataNS.ICalEvtSortedReminderDataModel;
}

const SortedRemindersViewDetail = (props: ISortedRemindersViewDetailProps) => {
    const { sortedReminder } = props;
    return (
        <React.Fragment>
            <div className="action-container">
                <span className="icon-label">
                    <div className="icon-circle-wrapper">
                        <svg className="ali-icon" aria-hidden="true">
                            <use xlinkHref="#icon-close"></use>
                        </svg>
                    </div>
                </span>
            </div>
            <div className="fields-container">
                <div className="field is-double-margin">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <span className="text-label size-h1 height-h1">
                            <FormattedMessage
                                id="cal.nbReminders"
                                values={{ nb: sortedReminder.reminders.length }}
                            />
                        </span>
                    </div>
                </div>
                <div className="field">
                    <div className="field-label height-h2">
                        <span className="icon-label">
                            <div className="icon-circle-wrapper">
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-time-circle"></use>
                                </svg>
                            </div>
                        </span>
                    </div>
                    <div className="field-body">
                        <span className="text-label size-h3 height-h2">
                            Monday, November 4
                        </span>
                    </div>
                </div>
                {sortedReminder.reminders.map((item, index) => (
                    <div className="field" key={`sorted-reminder-${index}}`}>
                        <div className="field-label height-h0">
                            <span className="icon-label">
                                <div className="icon-circle-wrapper">
                                    <svg
                                        className="ali-icon"
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#icon-touch"></use>
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <div className="field-body inline">
                            <span className="text-label size-h3 height-h0">
                                {item.title}
                            </span>
                            <div className="on-hover-actions">
                                <span className="icon-label">
                                    <div className="icon-circle-wrapper">
                                        <svg
                                            className="ali-icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="#icon-edit"></use>
                                        </svg>
                                    </div>
                                </span>
                                <span className="icon-label">
                                    <div className="icon-circle-wrapper">
                                        <svg
                                            className="ali-icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="#icon-shanchu"></use>
                                        </svg>
                                    </div>
                                </span>
                                <span className="icon-label">
                                    <div className="icon-circle-wrapper">
                                        <svg
                                            className="ali-icon"
                                            aria-hidden="true"
                                        >
                                            <use xlinkHref="#icon-done"></use>
                                        </svg>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default SortedRemindersViewDetail;
