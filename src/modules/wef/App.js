import React from 'react';

import CourseMetaContainer from './components/courseMetaContainer/courseMetaContainer';
import GetAccess from './components/getAccessContainer/getAccess';
import Footer from './components/footer/footer';

import './main.scss';
import './assets/style/theme.scss';

const voucherLink = 'https://learningspace.3ds.com/CompanionManager/ui/#/?vuid=69729864';

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

    setCourseMetaRef = (ref) => {
        this.courseMetaRef = ref;
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
            case 'courseMeta':
                this.courseMetaRef.scrollIntoView({
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
                    <a
                        href="https://learningspace.3ds.com/CompanionManager/ui/#/"
                        target="_blank"
                        alt="3dls-logo"
                        className="dls-header-logo"
                    >
                        <img
                            src="./static/img/header_1920.png"
                            alt="3dls-logo"
                        />
                    </a>
                </div>
                <section className="carousel-container">
                    {/* <div className="carousel-header">
                        <div className="dls-logo">
                            <img src="./static/img/3DS_LOGO_3DEXP_EDU_WHITE_RGB.png" />
                            <b className="divider"></b>
                            <span className="logo-text">Learning Space</span>
                        </div>
                    </div> */}
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
                                    COVID-19 pandemic.
                                </p>
                                <p>
                                    Discover below some inspirational modules
                                    dedicated to Digital continuity, Digital
                                    Factory and Additive Manufacturing.
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
                            this.scrollTo('courseMeta');
                        }}
                    >
                        <img src="./static/svg/arrow.svg" />
                        <span className="discover-btn--text">Discover</span>
                    </div>
                </section>
                {/* <DiscoverContainer
                    setDiscoverRef={this.setDiscoverRef}
                    scrollTo={this.scrollTo}
                /> */}
                <CourseMetaContainer setCourseMetaRef={this.setCourseMetaRef} voucherLink={voucherLink}/>
                <GetAccess voucherLink={voucherLink}/>
                {/* <ContactUs setContactRef={this.setContactRef} /> */}
                <Footer />
            </div>
        );
    }
}

export default App;
