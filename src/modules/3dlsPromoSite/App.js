import React from "react";

import DiscoverContainer from './components/discoverContainer/discoverContainer';
import './main.scss';
import './assets/style/theme.scss';


// const data = [
//     { source: './static/img/cls_banner.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
//     { source: './static/img/cls_banner2.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
//     { source: './static/img/demo2.png', },
//     { source: './static/img/demo3.jpg' },
// ];

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
                                <p>3DS Learning Space is a unique learning portal developed by</p>
                                <p>Dassault Systèmes to host a scientific course library of Dassault</p>
                                <p>Systèmes products and solutions.</p>
                            </div>
                            <span role="button" className="btn carousel-main-text--btn">Contact Us</span>
                        </div>
                    </div>
                    <img src="./static/img/1495-new.png" className="carousel-main-img"></img>
                    {/* <div className="carousel-discover">
                        <img src="./static/svg/arrow.svg"/>
                        <span className="carousel-discover--text">Discover</span>
                    </div> */}
                </section>
                <DiscoverContainer />
            </div>
        )
    }
}

export default App;
