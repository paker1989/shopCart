import * as React from 'react';
import { withRouter } from 'react-router-dom';
import * as dateActionCreator from './store/action/dateAction';
import { connect } from 'react-redux';

import I18nProvider from './utils/i18nProvider';
import Header from './components/header';
import CalBody from './components/calBody';

import './assets/style/app.scss';

const mapDispatchToProps = dispatch => ({
    toTargetDate: (currentDate: Date) =>
        dispatch(dateActionCreator.toTargetDate(currentDate)),
});

class App extends React.Component<any, any> {
    componentDidMount() {
        this.onLocationChange();
    }

    componentDidUpdate() {
        this.onLocationChange();
    }

    onLocationChange = () => {
        const { toTargetDate, match } = this.props;
        const { year, month, date } = match.params;

        toTargetDate(new Date(year, month - 1, date));
    };

    render() {
        // console.log('render App');
        const { lang } = this.props.match.params;
        const locale = lang || 'zh';

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
                </div>
            </I18nProvider>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(withRouter(App));
