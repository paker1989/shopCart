import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

import * as DateActionCreator from '../../../store/action/dateAction';
import { getPath, getDateToNav } from '../../../utils/routeHelper';
import { DatePicker } from '../../../../../_packages_/components/datePicker';
import { DatePickers } from '../../../../../_packages_/components/datePicker/common/types';

import './shelf.scss';

export const mapStateToProps = state => ({
    selectedDate: state.dateReducers.currentDate,
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal
});

export const mapDispatchToProps = dispatcher => ({
    setEvtDefinerSignal: evtDefinerSignal =>
        dispatcher(DateActionCreator.switchCalEvtDefinerSignal(evtDefinerSignal)),
});

class Shelf extends React.Component<any, any> {
    toSiblingMonth = (actiontype: DatePickers.EMonthChangeType) => {
        const { selectedDate, history, match } = this.props;
        let targetDate;
        switch (actiontype) {
            case DatePickers.EMonthChangeType._prev_:
                targetDate = getDateToNav(selectedDate, 'month', 'prev');
                break;
            case DatePickers.EMonthChangeType._next_:
                targetDate = getDateToNav(selectedDate, 'month', 'next');
                break;
        }
        history.push(getPath(targetDate, match.params));
    };

    toTargetDate = (selectedDate: Date) => {
        const { match, history } = this.props;
        history.push(getPath(selectedDate, match.params));
    };

    initCalEventDefiner = () => {
        this.props.setEvtDefinerSignal(!this.props.definerCalEvtSignal);
    };

    render() {
        const { selectedDate } = this.props;

        return (
            <div className="calbody-shelf-container">
                <div className="calbody-shelf-container__createWrapper">
                    <div
                        role="button"
                        className="btn is-ellipse calbody-shelf-container__createBtn"
                        onClick={this.initCalEventDefiner}
                    >
                        <svg
                            className="ali-icon calbody-shelf-container__createIcon"
                            aria-hidden="true"
                        >
                            <use xlinkHref="#icon-create" />
                        </svg>
                        <span className="calbody-shelf-container__createText">
                            <FormattedMessage id="cal.create" />
                        </span>
                    </div>
                </div>
                <div className="calbody-shelf-container__main">
                    <div className="calbody-container-shelf__datepicker">
                        <DatePicker
                            value={selectedDate}
                            isPopover={false}
                            onClick={this.toTargetDate}
                            format="YYYY/MM/DD"
                            toSiblingMonth={this.toSiblingMonth}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Shelf));
