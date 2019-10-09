import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as dateActionCreator from './store/action/dateAction';
import * as layoutActionCreator from './store/action/layoutAction';
import { connect } from 'react-redux';

import CalConfig from './assets/scripts/calendar.config';
import I18nProvider from './utils/i18nProvider';
import Header from './components/header';
import CalBody from './components/calBody';
import PopHandler from './components/popHandler';

import './assets/style/app.scss';

const mapDispatchToProps = dispatch => ({
    toTargetDate: (currentDate: Date) =>
        dispatch(dateActionCreator.toTargetDate(currentDate)),
    changeLang: (locale: string) =>
        dispatch(layoutActionCreator.changeLang(locale)),
});

class App extends React.Component<any, any> {
    componentDidMount() {
        this.onLocationChange();
    }

    componentDidUpdate(prevProps) {
        // console.log('did update twice');
        // console.log(this.props);
        // const { year, month, date, lang } = this.props;
        // if (
        //     prevProps.year !== year ||
        //     prevProps.month !== month ||
        //     prevProps.date !== date ||
        //     prevProps.lang !== lang
        // ) {
        //     this.onLocationChange();
        // }
        this.onLocationChange();
    }

    onLocationChange = () => {
        const { toTargetDate, changeLang, match } = this.props;
        const { year, month, date, lang } = match.params;

        toTargetDate(new Date(year, month - 1, date));
        changeLang(lang);
    };

    render() {
        const { lang } = this.props.match.params;
        const locale = lang || CalConfig.defaultLocale;

        return (
            <I18nProvider locale={locale}>
                <div className="calendar">
                    <div className="calendar-header">
                        <Header />
                    </div>
                    <div className="calendar-body">
                        <CalBody />
                    </div>
                    <div className="calendar-footer" />
                    <PopHandler />
                </div>
            </I18nProvider>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(withRouter(App));
