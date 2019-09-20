import * as React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import DayLayout from './dayLayout';
import WeekLayout from './weekLayout';
import MonthLayout from './monthLayout';
import YearLayout from './yearLayout';

import './calContent.scss';

 class CalendarBodyContent extends React.Component<any, any> {
    render() {
        const { match } = this.props;
        return (
            <div className="calbody-content-container">
                <Switch>
                    <Route path={`/${match.params.lang}/day`} component={DayLayout} />
                    <Route path={`/${match.params.lang}/week`} component={WeekLayout} />
                    <Route path={`/${match.params.lang}/month`} component={MonthLayout} />
                    <Route path={`/${match.params.lang}/year`} component={YearLayout} />
                    <Redirect from="*" to={`/${match.params.lang}/month`} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(CalendarBodyContent);
