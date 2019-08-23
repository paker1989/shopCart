import * as React from 'react';

import DayLayout from './dayLayout';
import './calContent.scss';

const _test_current_layout = '日';
const _test_props = {};

export default class CalendarBodyContent extends React.Component {
    render() {
        return (
            <div className="calbody-content-container">
                    <DayLayout />     
            </div>
        );
    }
}
