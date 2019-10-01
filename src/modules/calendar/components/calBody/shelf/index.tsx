import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

import * as PopActionCreator from '../../../store/action/popAction';
import { getPath, getDateToNav } from '../../../utils/routeHelper';
import { DatePicker } from '../../../../../_packages_/components/datePicker';
import { DatePickers } from '../../../../../_packages_/components/datePicker/common/types';
import { getGlobalTimeRange } from '../../../utils/timeRangeHelper';

import './shelf.scss';
import { CalendarRedux } from '../../../utils/reduxTypes';

export const mapStateToProps = state => ({
    selectedDate: state.dateReducers.currentDate,
    showDefPop: state.popReducers.defShowPop,
});

export const mapDispatchToProps = dispatcher => ({
    updateDefinerPop: (opts: CalendarRedux.IDefinerPopStats) =>
        dispatcher(PopActionCreator.updateDefinerPop(opts)),
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
        const { match, updateDefinerPop, showDefPop } = this.props;
        if (showDefPop) {
            updateDefinerPop({
                defShowPop: false,
                defTimeRange: null,
                globalInitStatus: 'stop',
            });
        } else {
            const layout = match.params.layout;
            const defTimeRange = getGlobalTimeRange(layout);

            updateDefinerPop({
                globalInitStatus: 'init',
                defTimeRange,
            });
        }
    };

    render() {
        const { selectedDate, showDefPop } = this.props;
        const createBtnClass = cx({
            ['btn is-ellipse calbody-shelf-container__createBtn']: true,
            ['is-disabled']: showDefPop,
        });

        return (
            <div className="calbody-shelf-container">
                <div className="calbody-shelf-container__createWrapper">
                    <div
                        role="button"
                        className={createBtnClass}
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
                    <div className="calbody-shelf-container__datepicker">
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
