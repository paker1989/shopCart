import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import WeekLayout from './weekLayout';
import MonthLayout from './monthLayout';
import YearLayout from './yearLayout';

import './calContent.scss';

export default class CalendarBodyContent extends React.Component {
    render() {
        return (
            <div className="calbody-content-container">
                <Switch>
                    <Route path="/week" component={WeekLayout} />
                    <Route path="/month" component={MonthLayout} />
                    <Route path="/year" component={YearLayout} />
                    <Redirect from="*" to="/month" />
                </Switch>
            </div>
        );
    }
}
