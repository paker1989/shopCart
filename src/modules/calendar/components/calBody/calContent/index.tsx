import * as React from 'react';

import ColumnLayout from './columnLayout';
import './calContent.scss';

export default class CalendarBodyContent extends React.Component {
    render() {
        return (
            <div className="calbody-content-container">
                <ColumnLayout />
                {/* <DayLayout/> */}
            </div>
        );
    }
}
