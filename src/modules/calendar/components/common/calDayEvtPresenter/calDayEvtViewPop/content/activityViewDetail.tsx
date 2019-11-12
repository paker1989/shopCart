import * as React from 'react';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';
import { CalendarNS } from '../../../../../utils/types';

export interface IActivityViewDetailProps
    extends CalendarNS.ICalDayViewContentCommonProps {
    activity: CalEvtDataNS.ICalEvtCompleteActivityDataModel;
}

const ActivityViewDetail = (props: IActivityViewDetailProps) => {
    const { activity, onClose, onDelete } = props;
    console.log(activity);

    return (
        <React.Fragment>
            <div className="action-container">
                <div className="action-icons">
                    <span className="icon-label">
                        <div className="icon-circle-wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                            </svg>
                        </div>
                    </span>
                    <span className="icon-label">
                        <div className="icon-circle-wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-shanchu"></use>
                            </svg>
                        </div>
                    </span>
                    <span className="icon-label">
                        <div className="icon-circle-wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-dots-vertical"></use>
                            </svg>
                        </div>
                    </span>
                    <span className="icon-label">
                        <div
                            className="icon-circle-wrapper"
                            onClick={() => {
                                onClose && onClose();
                            }}
                        >
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </span>
                </div>
            </div>
            <div className="fields-container">
                <div className="field is-double-margin">
                    <div className="field-label height-h1">
                        <div
                            className="color-dot"
                            style={{ backgroundColor: activity.opts.color }}
                        ></div>
                    </div>
                    <div className="field-body">
                        <span className="text-label size-h1 height-h1">
                            {activity.title}
                        </span>
                        <span className="size-h2">Monday, November 4</span>
                    </div>
                </div>
                {activity.opts.address && (
                    <div className="field">
                        <div className="field-label height-h2">
                            <span className="icon-label">
                                <div className="icon-circle-wrapper">
                                    <svg
                                        className="ali-icon"
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#icon-location"></use>
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <div className="field-body">
                            <span className="text-label height-h2">
                                {activity.opts.address}
                            </span>
                        </div>
                    </div>
                )}
                {activity.opts.description && (
                    <div className="field">
                        <div className="field-label height-h2">
                            <span className="icon-label">
                                <div className="icon-circle-wrapper">
                                    <svg
                                        className="ali-icon"
                                        aria-hidden="true"
                                    >
                                        <use xlinkHref="#icon-unorderedlist"></use>
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <div className="field-body">
                            <span className="text-label height-h2">
                                {activity.opts.description}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default ActivityViewDetail;
