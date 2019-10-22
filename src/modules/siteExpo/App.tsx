import * as React from 'react';
// import { withRouter } from 'react-router-dom';
// import * as dateActionCreator from './store/action/dateAction';
// import * as layoutActionCreator from './store/action/layoutAction';
// import { connect } from 'react-redux';
import Header from './component/header/header';
import ServiceList from './component/serviceList/serviceList';

import './assets/style/app.scss';

class App extends React.Component<any, any> {
    render() {
        // const { lang } = this.props.match.params;
        // const locale = lang || CalConfig.defaultLocale;

        return (
            // <I18nProvider locale={locale}>
            <div className="site-expo-container">
                <Header/>
                <div className="accueil">
                  <div className="carousel-bg"></div>
                  <div className=""></div>
                </div>
                <div className="services">
                  <ServiceList/>
                </div>
            </div>
            // </I18nProvider>
        );
    }
}

export default App;