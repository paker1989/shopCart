import * as React from 'react';

import DateDisplayer from './dateDisplayer';
import LayoutPicker from './layoutPicker';
import './header.scss';

import * as calendarLogo from '../../assets/images/calendar_logo.png';

export default class CalendarHeader extends React.Component {
    render() {
        return (
            <div className="header-container">
                <div className="header-container-logo">
                    <a aria-label="日历">
                        <img src={calendarLogo}/>
                        <span className="header-container-logo__title is-grey">日历</span>
                    </a>
                </div>
                <div className="header-container-dateDisplayer">
                    <DateDisplayer />
                </div>
                <div className="header-container-layoutPicker">
                    <LayoutPicker />
                </div>
            </div>
        );
    }
}
