import React from "react";

import DiscoverContainer from './components/discoverContainer/discoverContainer';
import ContactUs from './components/ContactUs/ContactUs';
// import ContactUsForm from './components/contactusForm/contactusForm';
import Footer from './components/footer/footer';


import './main.scss';
import './assets/style/theme.scss';



class App extends React.Component {

    constructor(props) {
        super(props);
    }

    setContactRef = (ref) => {
        this.contactRef = ref;
    }

    setDiscoverRef = (ref) => {
        this.discoverRef = ref;
    }

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
    }

    render() {
        return (
            <div className="dls-promo-container">
                <section className="carousel-container">
                    <div className="carousel-header">
                        <img src="./static/img/logo.png" className="dls-logo" />
                    </div>
                    <div className="carousel-main">
                        <div className="carousel-main-text">
                            <div className="carousel-main-text--main">
                                <p>Learn anywhere, anytime.</p>
                            </div>
                            <div className="carousel-main-text--sub">
                                <p>3DS Learning Space is an online learning portal developed by Dassault
                                     Systèmes providing the best learning experiences to master Dassault Systèmes products and solutions.</p>
                            </div>
                            <span role="button"
                                className="btn carousel-main-text--btn"
                                onClick={() => {
                                    this.scrollTo('contactus')
                                }}>
                                Contact us
                                </span>
                        </div>
                    </div>
                    <img src="./static/img/1495-new.png" className="carousel-main-img"></img>
                    <div className="discover-btn">
                        <img src="./static/svg/arrow.svg" />
                        <span className="discover-btn--text" onClick={() => {
                            this.scrollTo('discover');
                        }}>Discover</span>
                    </div>
                </section>
                <DiscoverContainer setDiscoverRef={this.setDiscoverRef} scrollTo={this.scrollTo} />
                <ContactUs setContactRef={this.setContactRef} />
                <Footer />
            </div>
        )
    }
}

export default App;
