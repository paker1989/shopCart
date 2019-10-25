import * as React from 'react';
import { useRef } from 'react';
import cx from 'classnames';

import './carousel.scss';
import useScrollPosition from '../common/useScrollPosition';

const Carousel = () => {
    const ref = useRef<HTMLDivElement>(null);
    const slideIn = useScrollPosition(40, ref);

    // if (slideIn) {
    //     console.log('slide in carousel');
    // }
    const titleMainClass = cx({
        ['carousel-title-main']: true,
        ['slideIn']: slideIn,
    });

    const titleSubClass = cx({
        ['carousel-title-sub']: true,
        ['slideIn']: slideIn,
    });

    const carouselBtnClass = cx({
        ['carousel-btn']: true,
        ['slideIn']: slideIn,
    });

    return (
        <div className="accueil">
            <div className="carousel-bg"></div>
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
                <div className="text-wrapper" ref={ref}>
                    <div className={titleMainClass}>最前沿的网站解决方案</div>
                    <div className={titleSubClass}>
                        静态网站 - 电商解决方案 - 小程序 - 网站维护
                    </div>
                    <div className={carouselBtnClass} role="button">
                        联系我们
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
