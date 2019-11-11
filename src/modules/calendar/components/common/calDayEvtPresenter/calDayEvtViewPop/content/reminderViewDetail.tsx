import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

export interface IReminderViewDetailProps {
    reminder: CalEvtDataNS.ICalEvtCompleteReminderDataModel;
}

const _test_done_flag = true;

const ReminderViewDetail = (props: IReminderViewDetailProps) => {
    const { reminder } = props;
    return (
        <React.Fragment>
            <div className="action-container">
                <div className="action-icons">
                    {!_test_done_flag && (
                        <span className="icon-label">
                            <div className="icon-circle-wrapper">
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-edit"></use>
                                </svg>
                            </div>
                        </span>
                    )}
                    {!_test_done_flag && (
                        <span className="icon-label">
                            <div className="icon-circle-wrapper">
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shanchu"></use>
                                </svg>
                            </div>
                        </span>
                    )}
                    <span className="icon-label">
                        <div className="icon-circle-wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </span>
                </div>
            </div>
            <div className="fields-container">
                <div className="field is-double-margin">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <span className="text-label size-h1 height-h1">
                            {_test_done_flag ? (
                                <FormattedMessage
                                    id="cal.reminderdone"
                                    values={{ nb: 1 }}
                                />
                            ) : (
                                reminder.title
                            )}
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
                        {!reminder.allDayEvt && (
                            <span className="text-label font-subtitle">
                                6pm
                            </span>
                        )}
                    </div>
                </div>
                {_test_done_flag && (
                    <div className="field">
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
                            <span className="text-label size-h3 height-h0 is-done">
                                {reminder.title}
                            </span>
                            <div className="on-hover-actions">
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
                                            <use xlinkHref="#icon-redo"></use>
                                        </svg>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {!_test_done_flag && (
                <div className="footer-container">
                    <div className="action-container right">
                        <span className="action-text-wrapper size-h3">
                            <FormattedMessage id="cal.markasdone" />
                        </span>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default ReminderViewDetail;
