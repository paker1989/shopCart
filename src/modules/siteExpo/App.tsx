import * as React from 'react';
// import { withRouter } from 'react-router-dom';
// import * as dateActionCreator from './store/action/dateAction';
// import * as layoutActionCreator from './store/action/layoutAction';
// import { connect } from 'react-redux';
import Header from './component/header/header';
import AboutUs from './component/aboutus/aboutus';
import ServiceList from './component/serviceList/serviceList';
import Expertises from './component/expertises/expertises';
import Carousel from './component/carousel/carousel';

import './assets/style/animation.scss';
import './assets/style/app.scss';

class App extends React.Component<any, any> {
    render() {
        // const { lang } = this.props.match.params;
        // const locale = lang || CalConfig.defaultLocale;

        return (
            // <I18nProvider locale={locale}>
            <div className="site-expo-container">
                <Header />
                <Carousel/>
                {/* <div className="accueil">
                    <div className="carousel-bg"></div>
                    <div className="carousel-overlay"></div>
                    <div className="carousel-content">
                        <div className="text-wrapper">
                            <div className="carousel-title-main">
                                最前沿的网站解决方案
                            </div>
                            <div className="carousel-title-sub">
                                静态网站 - 电商解决方案 - 小程序 - 网站维护
                            </div>
                            <div className="carousel-btn" role="button">
                                联系我们
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="about-us2">
                    <div className="about-us2-content">
                        <div className="main">
                            <div className="title">- About us -</div>
                            <div className="description">
                                稳重科技背后的技术团队是一批在法国大型软件公司里供职超过5年的一群志同道合的资深软件工程师。
                                他们具有非常资深的网络工程从业经验，工作严肃认真且高效，致力于为预算捉急的小伙伴们提供性价
                                比极高的网站解决方案。
                            </div>
                        </div>
                        <div className="image">
                            <img
                                src="static/image/about-us.png"
                            />
                        </div>
                    </div>
                </div>
                <div className="services">
                    <ServiceList />
                </div>
                <Expertises/>
                {/* <div className="aboutus-container">
                    <AboutUs />
                </div> */}
                <div className="contacts">
                    <div className="text-wrapper">
                        <div className="contact-info">
                            <span>稳重科技</span>
                            <span>06 50 60 89 12</span>
                            <span>xb.webdev@gmail.com</span>
                        </div>
                        <div className="contact-icons">
                            <img src="static/image/github-mark.png" />
                            <img src="static/image/wechat.svg" />
                        </div>
                        <div className="contact-law">
                            <span className="normal-text">Copy right by </span>
                            <span className="brand-text">稳重科技 </span>
                            <img
                                className="brand-icon"
                                src="static/image/logo2.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
            // </I18nProvider>
        );
    }
}

export default App;
