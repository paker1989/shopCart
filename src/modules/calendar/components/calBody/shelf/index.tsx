import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as dateActionCreator from '../../../store/action/dateAction';
import { DatePicker } from '../../../../../_packages_/components/datePicker';
import { DatePickers } from '../../../../../_packages_/components/datePicker/common/types';

import './shelf.scss';

export const mapStateToProps = state => ({
    selectedDate: state.dateReducers.currentDate,
});

export const mapDispatchToProps = dispatch => ({
    toTargetDate: (currentDate: Date) =>
        dispatch(dateActionCreator.toTargetDate(currentDate)),
    toNextMonth: (currentDate: Date) =>
        dispatch(dateActionCreator.toNextMonth(currentDate)),
    toPrevMonth: (currentDate: Date) =>
        dispatch(dateActionCreator.toPrevMonth(currentDate)),
});

class Shelf extends React.Component<any, any> {
    toSiblingMonth = (actiontype: DatePickers.EMonthChangeType) => {
        const { toNextMonth, toPrevMonth, selectedDate } = this.props;
        switch (actiontype) {
            case DatePickers.EMonthChangeType._prev_:
                toPrevMonth(selectedDate);
                return;
            case DatePickers.EMonthChangeType._next_:
                toNextMonth(selectedDate);
                return;
        }
    };

    render() {
        const { selectedDate, toTargetDate } = this.props;

        return (
            <div className="calbody-shelf-container">
                <div className="calbody-shelf-container__createWrapper">
                    <div
                        role="button"
                        className="btn is-ellipse calbody-shelf-container__createBtn"
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
                            onClick={toTargetDate}
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
)(Shelf);
