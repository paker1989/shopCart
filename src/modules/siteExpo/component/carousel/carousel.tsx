import * as React from 'react';
import { useRef } from 'react';
import cx from 'classnames';

import './carousel.scss';
import useScrollPosition from '../common/useScrollPosition';
import { FormattedMessage } from 'react-intl';

const Carousel = props => {
    const { setCarouselRef, goTo } = props;
    const ref = useRef<HTMLDivElement>(null);
    const slideIn = useScrollPosition(40, ref);

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
        <div
            className="accueil"
            ref={ref => {
                setCarouselRef(ref);
            }}
        >
            <div className="carousel-bg">
                <img src="static/image/carousel1.png" />
            </div>
            <div className="carousel-overlay"></div>
            <div className="carousel-content">
                <div className="text-wrapper" ref={ref}>
                    <div className={titleMainClass}>
                        <FormattedMessage id="se.carousel.title" />
                    </div>
                    <div className={titleSubClass}>
                        <FormattedMessage id="se.carousel.subtitle" />
                    </div>
                    <div className={carouselBtnClass} role="button" onClick={() => {goTo('contactus')}}>
                        <FormattedMessage id="se.contactus" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
