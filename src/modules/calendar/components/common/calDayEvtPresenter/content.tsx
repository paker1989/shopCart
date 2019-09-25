import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as ActionCreator from '../../../store/action/dateAction';
import CalDaySimpleEvtList from './calDaySimpleEvtList';
import { DayConverter } from '../../../utils/i18nProvider';
import { CalendarNS } from '../../../utils/types';

import './dayEvtPresenter.scss';

const mapDispatchToProps = dispatch => ({
    loadEvts: (date: Date) => dispatch(ActionCreator.loadSimpleEvtData(date)),
});

class DayEvtPresenterContent extends React.Component<
    CalendarNS.ICalEventPresenterProps,
    any
> {
    static defaultProps = {
        showClose: true,
    };

    constructor(props) {
        super(props);
        this.state = { evts: [] };
    }

    componentDidMount() {
        const { loadEvts, date } = this.props;
        loadEvts(date);
    }

    onClose = () => {};

    render() {
        const { showClose, date } = this.props;
        const { evts } = this.state;

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
                        <CalDaySimpleEvtList evts={evts} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    () => ({}),
    mapDispatchToProps
)(DayEvtPresenterContent);
