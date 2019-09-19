import * as React from 'react';
// import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import I18nProvider from './utils/i18nProvider';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import CalBody from './components/calBody';

import './assets/style/app.scss';

const mapStateToProps = state => ({ locale: state.layoutReducers.locale });

class App extends React.Component<any, any> {
    render() {
        const { locale } = this.props;
        return (
            <I18nProvider locale={locale}>
                <Router basename="/">
                    <div className="calendar">
                        <div className="calendar-header">
                            <Header />
                        </div>
                        <div className="calendar-body">
                            <CalBody />
                        </div>
                        <div className="calendar-footer" />
                    </div>
                </Router>
            </I18nProvider>
        );
    }
}

export default connect(mapStateToProps)(App);
