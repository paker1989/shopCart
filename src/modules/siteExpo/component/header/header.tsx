import * as React from 'react';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { useState, useEffect } from 'react';

import Option from './option';

import './header.scss';
import { FormattedMessage } from 'react-intl';

const _test_options_ = [
    { anchor: 'carousel', text: <FormattedMessage id="se.accueil" /> },
    { anchor: 'aboutus', text: <FormattedMessage id="se.aboutus" /> },
    { anchor: 'service', text: <FormattedMessage id="se.service" /> },
    { anchor: 'expertise', text: <FormattedMessage id="se.expertise" /> },
    { anchor: 'contactus', text: <FormattedMessage id="se.contactus" /> },
];
// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const Header = props => {
    const { goTo, currentAnchor, changeLocale, locale } = props;
    const [positionClass, setPositionClass] = useState('is-absolute');
    const setHeaderPosition = throttle(() => {
        const scrollTop =
            document.body.scrollTop + document.documentElement.scrollTop;
        if (scrollTop > 70) {
            setPositionClass('is-fixed');
        } else if (scrollTop <= 70) {
            setPositionClass('is-absolute');
        }
    }, 200);

    useEffect(() => {
        window.addEventListener('scroll', setHeaderPosition);
        return () => {
            window.removeEventListener('scroll', setHeaderPosition);
        };
    }, []);

    const containerClass = cx(
        {
            ['expo-header']: true,
        },
        positionClass
    );
    return (
        <div className={containerClass}>
            <div className="expo-header-logo">
                <img src="static/image/logo2.png"></img>
            </div>
            <div className="expo-header-menu">
                {locale === 'zh' && (
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
                )}
                {_test_options_.map((item, index) => (
                    <Option
                        {...item}
                        goTo={goTo}
                        currentAnchor={currentAnchor}
                        key={`option-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Header;
