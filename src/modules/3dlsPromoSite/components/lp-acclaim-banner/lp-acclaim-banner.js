import React from 'react';
import generalBadgeTemplate from '../../assets/img/badge_general.png';
// import viewIcon from '../../assets/img/visibility.svg';

import cx from 'classnames';

import './lp-acclaim-banner.scss';
import './lp-acclaim-banner.responsive.scss';

const LpAcclaimBanner = (props) => {
    const { state, acceptUrl, badgeTplt, examTitle, viewBadgeUrl } = props;
    const { passed, total } = props;

    const claimBadge = () => {
        window.location.href = acceptUrl;
    };
    const viewBadge = () => {
        window.open(viewBadgeUrl, '_blank');
    };

    const percentage = passed / total;
    const rightCircleCls = cx({
        ['circle-bar-right']: true,
        ['overhalf']: percentage > 0.5,
    });

    const rightRotate = percentage <= 0.5 ? 360 * percentage : 0;
    const leftRotate = percentage <= 0.5 ? 0 : 360 * (percentage - 0.5);
    return (
        <div className="lp-acclaim-banner">
            {state === 'ns' && (
                <div className="acclaim-ns">
                    <div className="circle-badge-wrapper">
                        <img src={generalBadgeTemplate} alt="badge template" />
                    </div>

                    <span className="badge-text">Badge Associated</span>
                </div>
            )}
            {state === 'pending' && (
                <div
                    role="button"
                    className="acclaim-button"
                    onClick={claimBadge}
                >
                    <img src={generalBadgeTemplate} alt="badge template" />
                    <span className="badge-btn-text">Claim your badge</span>
                </div>
            )}
            {state === 'accepted' && (
                <div className="acclaim-accepted-new">
                    <div className="tplt-wrapper">
                        {/* <img src={badgeTplt} alt={examTitle} /> */}
                        <div className="circle-badge-wrapper">
                            <img src={badgeTplt} alt={examTitle} />
                        </div>
                        <div className="done-wrapper">
                            <div className="done-icon-wrapper">
                                <img src="./static/img/done.svg" />
                            </div>
                        </div>
                    </div>
                    <div role="button" className="view-bge-btn">
                        View Badge
                    </div>
                </div>
            )}
            {/* {state === 'accepted' && (
                <div className="acclaim-accepted">
                    <div className="acclaim-accepted-button">
                        <img src={badgeTplt} alt="badge template" />
                        <span className="badge-btn-text">{examTitle}</span>
                    </div>
                    <div className="view-badge">
                        <img src={viewIcon} alt="view badge" />
                        <span className="view-text" onClick={viewBadge}>
                            View badge
                        </span>
                    </div>
                </div>
            )} */}
            {/* <div className="exam-status">
                <span className="label">Exam Status</span>
                <div className="progress-circle">
                    <div
                        class="circle-bar-left"
                        style={{ transform: `rotate(${leftRotate}deg)` }}
                    ></div>
                    <div
                        className={rightCircleCls}
                        style={{ transform: `rotate(${rightRotate}deg)` }}
                    ></div>
                    <div className="mask">
                        <span>{`${passed}/${total}`}</span>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default LpAcclaimBanner;
