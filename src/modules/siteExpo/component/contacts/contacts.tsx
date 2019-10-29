import * as React from 'react';
import cx from 'classnames';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CalTooltip from '../../../../_packages_/components/calTooltip';

import './contacts.scss';

// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const Contacts = props => {
    const { getCarouselRef, setContactusRef, changeLocale, locale } = props;
    const [showCode, setShowCode] = useState(false);

    const wechatClass = cx({
        ['wechat-logo']: true,
        ['is-rotateOut']: showCode === true,
    });

    const linkedInClass = cx({
        ['is-hide']: showCode === true,
    });

    const qcCodeClass = cx({
        ['qc-logo']: true,
        ['is-hide']: showCode === false,
    });

    return (
        <div
            className="contacts-container"
            ref={ref => {
                setContactusRef(ref);
            }}
        >
            <div className="coordonne">
                <div>
                    <FormattedMessage id="se.company.title" />
                </div>
                <div>06 50 60 89 12</div>
                <div>xb.webdev@gmail.com</div>
            </div>
            <div className="social-network">
                <div className="main-title">
                    <FormattedMessage id="se.contactus" />
                </div>
                <div className="logos">
                    <CalTooltip
                        content={
                            <img
                                src="static/image/qccode.png"
                                className={qcCodeClass}
                            />
                        }
                        trigger="click"
                        contentClass="wechat-tooltip"
                    >
                        <img
                            src="static/image/wechat.svg"
                            className={wechatClass}
                        />
                    </CalTooltip>
                    <img
                        src="static/image/linkedIn.svg"
                        className={linkedInClass}
                    />
                </div>
            </div>
            <div className="go-up">
                <img
                    src="static/image/top.svg"
                    onClick={() => {
                        const carouselRef = getCarouselRef();
                        if (carouselRef) {
                            carouselRef.scrollIntoView({
                                behavior: 'smooth',
                            });
                        }
                    }}
                />
                <span>
                    <FormattedMessage id="se.top" />
                </span>
            </div>
            <div className="copy-right">
                <div className="content">
                    {/* {locale === 'zh' && (
                        <img
                            src="static/image/french.svg"
                            onClick={() => {
                                changeLocale('fr');
                            }}
                        />
                    )}
                    {locale === 'fr' && (
                        <img
                            src="static/image/china.png"
                            onClick={() => {
                                changeLocale('zh');
                            }}
                        />
                    )} */}
                    <span>Copyright © 2019 WZ Tech. All Rights Reserved</span>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
