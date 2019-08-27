import * as React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import WeekLayout from './weekLayout';
import './calContent.scss';

export default class CalendarBodyContent extends React.Component {
    render() {
        return (
            <div className="calbody-content-container">
                <Switch>
                    <Route path="/week" component={WeekLayout} />
                    <Redirect from="*" to="/week" />
                </Switch>
            </div>
        );
    }
}
