import * as React from 'react';
// import { withRouter } from 'react-router-dom';
// import * as dateActionCreator from './store/action/dateAction';
// import * as layoutActionCreator from './store/action/layoutAction';
// import { connect } from 'react-redux';

// import CalConfig from './assets/scripts/calendar.config';
// import I18nProvider from './utils/i18nProvider';
// import Header from './components/header';
// import CalBody from './components/calBody';
// import PopHandler from './components/popHandler';

import './assets/style/app.scss';

// const mapDispatchToProps = dispatch => ({
//     toTargetDate: (currentDate: Date) =>
//         dispatch(dateActionCreator.toTargetDate(currentDate)),
//     changeLang: (locale: string) =>
//         dispatch(layoutActionCreator.changeLang(locale)),
// });

class App extends React.Component<any, any> {
    render() {
        // const { lang } = this.props.match.params;
        // const locale = lang || CalConfig.defaultLocale;

        return (
            // <I18nProvider locale={locale}>
            <div className="site-expo-container">
                <h1>Site expo</h1>
            </div>
            // </I18nProvider>
        );
    }
}

export default App;