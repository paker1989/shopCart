import * as React from 'react';

import I18nProvider from './i18nProvider';
import Header from './component/header/header';
import ServiceList from './component/serviceList/serviceList';
import Expertises from './component/expertises/expertises';
import Carousel from './component/carousel/carousel';
import ContactUs from './component/contacts/contacts';

import './assets/style/animation.scss';
import './assets/style/app.scss';
import { FormattedMessage } from 'react-intl';

class App extends React.Component<any, any> {
    private carouselRef: any;
    private aboutusRef: any;
    private serviceRef: any;
    private expertiseRef: any;
    private contactusRef: any;

    constructor(props) {
        super(props);
        this.state = { currentAnchor: 'carousel', locale: 'zh' };
    }

    setAboutusRef = (ref: any) => {
        this.aboutusRef = ref;
    };

    setCarouselRef = (ref: any) => {
        this.carouselRef = ref;
    };

    setServiceRef = (ref: any) => {
        this.serviceRef = ref;
    };

    setExpertiseRef = (ref: any) => {
        this.expertiseRef = ref;
    };

    setContactusRef = (ref: any) => {
        this.contactusRef = ref;
    };

    goTo = anchor => {
        let current;
        switch (anchor) {
            case 'carousel':
                current = this.carouselRef;
                break;
            case 'aboutus':
                current = this.aboutusRef;
                break;
            case 'service':
                current = this.serviceRef;
                break;
            case 'expertise':
                current = this.expertiseRef;
                break;
            case 'contactus':
                current = this.contactusRef;
                break;
        }
        this.setState({ currentAnchor: anchor }, () => {
            current.scrollIntoView({
                behavior: 'smooth',
            });
        });
    };
    render() {
        const { currentAnchor, locale } = this.state;

        return (
            <I18nProvider locale={locale}>
                <div className="site-expo-container">
                    <Header
                        goTo={this.goTo}
                        currentAnchor={currentAnchor}
                        locale={locale}
                        changeLocale={locale => {
                            this.setState({ locale });
                        }}
                    />
                    <Carousel setCarouselRef={this.setCarouselRef} goTo={this.goTo}/>
                    <div className="about-us2">
                        <b
                            className="aboutus-anchor"
                            ref={ref => {
                                this.setAboutusRef(ref);
                            }}
                        ></b>
                        <div className="about-us2-content">
                            <div className="main">
                                <div className="title">- About us -</div>
                                <div className="description">
                                    {/* 稳重科技背后的技术团队是一批在法国大型软件公司里供职超过5年的一群志同道合的资深软件工程师。
                                    他们具有非常资深的网络工程从业经验，工作严肃认真且高效，致力于为预算捉急的小伙伴们提供性价
                                    比极高的网站解决方案。 */}
                                    <FormattedMessage id="se.aboutus.content" />
                                </div>
                            </div>
                            <div className="image">
                                <img src="static/image/about-us.png" />
                            </div>
                        </div>
                    </div>
                    <Expertises setExpertiseRef={this.setExpertiseRef} />
                    <div
                        className="services"
                        ref={ref => {
                            this.setServiceRef(ref);
                        }}
                    >
                        <ServiceList />
                    </div>
                    <ContactUs
                        setContactusRef={this.setContactusRef}
                        getCarouselRef={() => {
                            return this.carouselRef;
                        }}
                        locale={locale}
                        changeLocale={locale => {
                            this.setState({ locale });
                        }}
                    />
                </div>
            </I18nProvider>
        );
    }
}

export default App;
