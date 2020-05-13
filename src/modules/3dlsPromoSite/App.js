import React from 'react';
import { Tooltip } from 'zent';

import DiscoverContainer from './components/discoverContainer/discoverContainer';
import ContactUs from './components/ContactUs/ContactUs';
// import ContactUsForm from './components/contactusForm/contactusForm';
import Footer from './components/footer/footer';

import AcclaimBanner from './components/lp-acclaim-banner/lp-acclaim-banner';

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
                <section className="carousel-container">
                    <div className="carousel-header">
                        <div className="dls-logo">
                            <img src="./static/img/3DS_LOGO_3DEXP_EDU_WHITE_RGB.png" />
                            <b className="divider"></b>
                            <span className="logo-text">Learning Space</span>
                        </div>
                    </div>
                    <AcclaimBanner state="ns" passed={1} total={5}/>
                    <br />
                    <AcclaimBanner
                        state="pending"
                        acceptUrl="https://youracclaim.fr"
                        passed={0} total={3}
                    />
                    <br />
                    <AcclaimBanner
                        state="accepted"
                        badgeTplt="https://sandbox-images.youracclaim.com/images/186c0e8c-d614-451e-9c7b-1de9ba717108/PPL.png"
                        examTitle="CATIA Mechanical Design Expert"
                        viewBadgeUrl="https://sandbox.youracclaim.com/badges/49bdd881-8666-4a83-b478-a006147a595e"
                        passed={2} total={3}
                    />
                    <div className="carousel-main">
                        <div className="carousel-main-text">
                            <div className="carousel-main-text--main">
                                <p>Learn anywhere, anytime.</p>
                            </div>
                            <div className="carousel-main-text--sub">
                                <p>
                                    3DEXPERIENCE Edu Learning Space is an online
                                    learning portal developed by Dassault
                                    Systèmes providing the best learning
                                    experiences to master Dassault Systèmes
                                    products and solutions.
                                </p>
                            </div>
                            <span
                                role="button"
                                className="btn carousel-main-text--btn"
                                onClick={() => {
                                    this.scrollTo('contactus');
                                }}
                            >
                                Contact us
                            </span>
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
                        {/* <Tooltip trigger="hover"
                            className="discover-tooltip"
                            position="auto-top-center"
                            title="Click to discover 3DS Learning Space highlights"> */}
                        <span className="discover-btn--text">Discover</span>
                        {/* </Tooltip> */}
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
