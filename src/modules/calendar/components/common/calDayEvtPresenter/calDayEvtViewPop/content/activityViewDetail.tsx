import * as React from 'react';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

export interface IActivityViewDetailProps {
    activity: CalEvtDataNS.ICalEvtCompleteActivityDataModel;
}

const ActivityViewDetail = (props: IActivityViewDetailProps) => {
    const { activity } = props;

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
                    <div className="field-label">
                        <div
                            className="color-dot"
                            style={{ backgroundColor: activity.opts.color }}
                        ></div>
                    </div>
                    <div className="field-body">
                        <span className="info-title">{activity.title}</span>
                        <span className="info-time">Monday, November 4</span>
                    </div>
                </div>
                {activity.opts.address && (
                    <div className="field">
                        <div className="field-label">
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
                            <span className="text-label">
                                {activity.opts.address}
                            </span>
                        </div>
                    </div>
                )}
                {activity.opts.description && (
                    <div className="field">
                        <div className="field-label">
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
                            <span className="text-label">
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