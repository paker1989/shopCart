import * as React from 'react';

import Shelf from './shelf';
import CalendarContent from './calContent';
import LinkSideBar from './linkSideBar';

import './calBody.scss';

export default class CalendarBody extends React.Component {
    render() {
        return (
            <div className="calbody-container">
                <Shelf />
                <CalendarContent />
                <LinkSideBar />
            </div>
        );
    }
}
