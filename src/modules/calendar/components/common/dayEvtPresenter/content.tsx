import * as React from 'react';

import './dayEvtPresenter.scss';
import { CalendarNS } from '../../../utils/types';

const _test_day_translate = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

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
        const _test_display_day = _test_day_translate[date.getDay()];
        
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
                            {_test_display_day}
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
