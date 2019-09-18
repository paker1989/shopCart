import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import DateDisplayer from './dateDisplayer';
import LayoutPicker from './layoutPicker';
import LangPicker from './langPicker';
import './header.scss';

import * as calendarLogo from '../../assets/images/calendar_logo.png';

class CalendarHeader extends React.Component<any, any> {
    render() {
        const { intl } = this.props;
        return (
            <div className="header-container">
                <div className="header-container-logo">
                    <a aria-label={intl.formatMessage({ id: 'cal.calendar' })}>
                        <img src={calendarLogo} />
                        <span className="header-container-logo__title is-grey">
                            <FormattedMessage id="cal.calendar" />
                        </span>
                    </a>
                </div>
                <div className="header-container-dateDisplayer">
                    <DateDisplayer />
                </div>
                <div className="header-container-optionPicker">
                    <div className="header-container-optionPicker__item">
                        <LangPicker />
                    </div>
                    <div className="header-container-optionPicker__item">
                        <LayoutPicker />
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(CalendarHeader);
