import React from 'react';
import { Tooltip } from 'zent';

import DiscoverContainer from './components/discoverContainer/discoverContainer';
import ContactUs from './components/ContactUs/ContactUs';
import Footer from './components/footer/footer';

import './main.scss';
import './assets/style/theme.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    setContactRef = (ref) => {
        this.contactRef = ref;
    };

    setDiscoverRef = (ref) => {
        this.discoverRef = ref;
    };

    scrollTo = (target) => {
        switch (target) {
            case 'contactus':
                this.contactRef.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
            case 'discover':
                this.discoverRef.scrollIntoView({
                    behavior: 'smooth',
                });
                break;
        }
    };

    render() {
        return (
            <div className="dls-promo-container">
                <div role="header" className="edu-header">
                    <a
                        href="https://www.3ds.com/"
                        target="_blank"
                        alt="ds-logo"
                        className="ds-logo"
                    >
                        <span class="ds-hide">Dassault Systèmes</span>
                    </a>
                </div>
                <section className="carousel-container">
                    <div className="carousel-header">
                        <div className="dls-logo">
                            <img src="./static/img/3DS_LOGO_3DEXP_EDU_WHITE_RGB.png" />
                            <b className="divider"></b>
                            <span className="logo-text">Learning Space</span>
                        </div>
                    </div>
                    <div className="carousel-main">
                        <div className="carousel-main-text">
                            <div className="carousel-main-text--main">
                                <p>
                                    Dassault Systèmes’ initiatives to tackle
                                    COVID-19 challenges
                                </p>
                            </div>
                            <div className="carousel-main-text--sub">
                                <p>
                                    In collaboration with the World Economic
                                    Forum, Dassault Systèmes wants to focus on
                                    supporting its customers, partners and
                                    communities worldwide during the ongoing
                                    COVID-19 pandemic. Discover below some
                                    inspirational modules dedicated to Digital
                                    continuity, Digital Factory and Additive
                                    Manufacturing.
                                </p>
                            </div>
                            {/* <span
                                role="button"
                                className="btn carousel-main-text--btn"
                                onClick={() => {
                                    this.scrollTo('contactus');
                                }}
                            >
                                Contact us
                            </span> */}
                        </div>
                    </div>
                    <img
                        src="./static/img/1495-new2.png"
                        className="carousel-main-img"
                    ></img>
                    <div
                        className="discover-btn"
                        onClick={() => {
                            this.scrollTo('discover');
                        }}
                    >
                        <img src="./static/svg/arrow.svg" />
                        <span className="discover-btn--text">Discover</span>
                    </div>
                </section>
                <DiscoverContainer
                    setDiscoverRef={this.setDiscoverRef}
                    scrollTo={this.scrollTo}
                />
                <ContactUs setContactRef={this.setContactRef} />
                <Footer />
            </div>
        );
    }
}

export default App;
