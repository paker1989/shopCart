import React from "react";

import DiscoverContainer from './components/discoverContainer/discoverContainer';
import ContactUs from './components/ContactUs/ContactUs';
import Footer from './components/footer/footer';


import './main.scss';
import './assets/style/theme.scss';



class App extends React.Component {
    constructor(props) {
        super(props);
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
                                <p>learn anywhere, anytime.</p>
                            </div>
                            <div className="carousel-main-text--sub">
                                <p>3DS Learning Space is a unique learning portal developed by
                                Dassault Systèmes to host a scientific course library of Dassault
                                Systèmes products and solutions.</p>
                            </div>
                            <span role="button" className="btn carousel-main-text--btn">Contact us</span>
                        </div>
                    </div>
                    <img src="./static/img/1495-new.png" className="carousel-main-img"></img>
                </section>
                <DiscoverContainer />
                <ContactUs />
                <Footer />
            </div>
        )
    }
}

export default App;
