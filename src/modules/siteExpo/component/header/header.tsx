import * as React from 'react';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { useState, useEffect, useRef } from 'react';

import './header.scss';

// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const Header = props => {
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

    // console.log('render header ' + positionClass);
    return (
        <div className={containerClass}>
            <div className="expo-header-logo">
                <img src="static/image/logo2.png"></img>
            </div>
            <div className="expo-header-menu">
                <span className="menu-item">欢迎</span>
                <span className="menu-item">关于我们</span>
                <span className="menu-item">业务流程</span>
                <span className="menu-item">业务介绍</span>
                <span className="menu-item">联系我们</span>
            </div>
        </div>
    );
};

export default Header;
