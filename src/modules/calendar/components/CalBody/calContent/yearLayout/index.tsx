import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import CalDayEvtPresenter from '../../../common/calDayEvtPresenter';
import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';
import CalEventPresenterManager from '../../../common/calEventPresenterManager';
import CalEventDefinerManager from '../../../common/calEventDefiner';
import * as PopActionCreator from '../../../../store/action/popAction';
import { getPath } from '../../../../utils/routeHelper';
import { CalendarNS } from '../../../../utils/types';
import { CalendarRedux } from '../../../../utils/reduxTypes';

import './yearLayout.scss';

export interface IYearLayoutProps {
    displayYear?: number;
    locale?: CalendarNS.TLocales;
    history?: any;
    currentDate?: Date;
    globalInitStatus?: 'stop' | 'init' | 'ready';
    defTimeRange?: CalendarNS.ITimeRangeFormat;
    updateDefinerPop?: (options: CalendarRedux.IDefinerPopStats) => void;
}

export interface IYearLayoutState {
    showDayEvtPstrPop: boolean;
    id: string;
    dragPopNode: any;
    selectedDate: Date;
}

const mapStateToProps = state => ({
    locale: state.layoutReducers.locale,
    currentDate: state.dateReducers.currentDate,
    displayYear: state.dateReducers.currentYear,
    defTimeRange: state.popReducers.defTimeRange,
    globalInitStatus: state.popReducers.globalInitStatus,
});

export const mapDispatchToProps = dispatcher => ({
    updateDefinerPop: (opts: CalendarRedux.IDefinerPopStats) =>
        dispatcher(PopActionCreator.updateDefinerPop(opts)),
});

const CustomizeHeader: React.FunctionComponent = props => {
    const { children } = props;
    return (
        <div className="calbody-content-yearLayout-container__monthHeader is-lighter-gey">
            {children}
        </div>
    );
};

class YearLayout extends React.Component<IYearLayoutProps, IYearLayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            showDayEvtPstrPop: false,
            id: null,
            dragPopNode: null,
            selectedDate: null,
        };
    }

    componentDidUpdate(prevProps: IYearLayoutProps) {
        const { globalInitStatus, defTimeRange, updateDefinerPop } = this.props;
        const { showDayEvtPstrPop } = this.state;
        if (
            prevProps.globalInitStatus !== 'init' &&
            globalInitStatus === 'init'
        ) {
            if (showDayEvtPstrPop) {
                // destory other props before init evtDefiner
                this.setState({ showDayEvtPstrPop: false });
            }

            CalEventDefinerManager.setCurrentDragNode(null);
            updateDefinerPop({
                defShowPop: true,
                defTimeRange,
                defPopId: CalEventDefinerManager.getId(),
                defPositionner: 'autoCentral',
                defTopCurshion: 30,
                defBottomCurshion: 30,
                globalInitStatus: 'ready',
            });
        }

        // if (prevProps.displayYear !== this.props.displayYear) {
        //     this.props.updatePresenter(false, {});
        // }
        // comment it temporailly for calEvtDefinerPop case
        // if (
        //     prevProps.definerCalEvtSignal === true &&
        //     this.props.definerCalEvtSignal === false
        // ) {
        //     this.props.updatePresenter(false, {});
        //     CalEventDefiner.destroyDefiner(this.currentPopId);
        // } else if (
        //     prevProps.definerCalEvtSignal === false &&
        //     this.props.definerCalEvtSignal === true
        // ) {
        //     CalEventDefiner.destroyDefiner(this.currentPopId);
        //     const dateToUse =
        //         new Date().getFullYear() === this.props.displayYear
        //             ? new Date()
        //             : getFirstDayOfMonth(this.props.displayYear, 1);
        //     const timeRange: CalendarNS.ITimeRangeFormat = getDateRange(
        //         dateToUse,
        //         dateToUse
        //     );
        //     this.props.updatePresenter(true, {
        //         timeRange,
        //         positionner: Position.autoCentral,
        //         dragPopNode: null,
        //         bottomCurshion: 50,
        //     });
        // }
    }

    handleDateClick = (
        date: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { showDayEvtPstrPop, selectedDate } = this.state;
        const { updateDefinerPop } = this.props;

        if (showDayEvtPstrPop && isSameDay(date, selectedDate)) {
            this.handleDateDoubleClick(date, null);
            return;
        }
        this.setState({
            showDayEvtPstrPop: true,
            dragPopNode: evt.target,
            selectedDate: date,
            id: CalEventPresenterManager.getId(),
        }, () => {
            updateDefinerPop({ defShowPop: false }); // close other pops
        });
    };

    handleDateDoubleClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        const { history, locale } = this.props;
        // console.log('on db click');
        const path = getPath(selectedDate, { layout: 'day', lang: locale });
        history.push(path);
    };

    render() {
        const { displayYear, currentDate } = this.props;
        const { dragPopNode, id, showDayEvtPstrPop, selectedDate } = this.state;
        const months = getMonthDataOfYear(displayYear);
        return (
            <div className="calbody-content-yearLayout-container">
                <div className="calbody-content-yearLayout-container__months">
                    {months.map((monthData, index) => {
                        const header = (
                            <CustomizeHeader>{`${index + 1}`}</CustomizeHeader>
                        );
                        return (
                            <div
                                className="calbody-content-yearLayout-container__datepickerWrapper"
                                key={`yearLayout-month-${displayYear}-${index}`}
                            >
                                <DatePicker
                                    isPopover={false}
                                    format="YYYY/MM/DD"
                                    presentOnly={true}
                                    customizedHeader={header}
                                    displayYear={displayYear}
                                    displayMonth={index + 1}
                                    monthData={monthData}
                                    onClick={this.handleDateClick}
                                    onDbClick={this.handleDateDoubleClick}
                                    displayWeeks={true}
                                    value={currentDate}
                                />
                            </div>
                        );
                    })}
                </div>
                {showDayEvtPstrPop && (
                    <CalDayEvtPresenter
                        dragPopNode={dragPopNode}
                        asideCurshion={10}
                        bottomCurshion={10}
                        topCurshion={10}
                        date={selectedDate}
                        id={id}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(YearLayout));
