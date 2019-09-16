import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { DayConverter } from '../../../utils/i18nProvider';
import './dayEvtPresenter.scss';
import { CalendarNS } from '../../../utils/types';

class DayEvtPresenterContent extends React.Component<
    CalendarNS.ICalEventPresenterProps,
    any
> {
    static defaultProps = {
        showClose: true,
    };

    onClose = () => {};

    render() {
        const { showClose, date } = this.props;

        return (
            <div className="dayEvent-presenter-content">
                {showClose && (
                    <div
                        className="dayEvent-presenter-content__close"
                        onClick={this.onClose}
                    >
                        <div className="dayEvent-presenter-content__close--wrapper">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-close"></use>
                            </svg>
                        </div>
                    </div>
                )}
                <div className="dayEvent-presenter-content__main">
                    <div className="dayEvent-presenter-content__dateDisplay">
                        <span className="dayEvent-presenter-content__dateDisplay--showDay">
                            <FormattedMessage
                                id={DayConverter[date.getDay()]}
                            />
                        </span>
                        <div className="dayEvent-presenter-content__dateDisplay--showDate is-lighter-gey">
                            <span>{date.getDate()}</span>
                        </div>
                    </div>
                    <div className="dayEvent-presenter-content__events">
                        {/* todo */}
                    </div>
                </div>
            </div>
        );
    }
}

export default DayEvtPresenterContent;
