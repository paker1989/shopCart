import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import WeekLayout from './weekLayout';
import MonthLayout from './monthLayout';

import './calContent.scss';

export default class CalendarBodyContent extends React.Component {
    render() {
        return (
            <div className="calbody-content-container">
                <Switch>
                    <Route path="/week" component={WeekLayout} />
                    <Route path="/month" component={MonthLayout} />
                    <Redirect from="*" to="/month" />
                </Switch>
            </div>
        );
    }
}
