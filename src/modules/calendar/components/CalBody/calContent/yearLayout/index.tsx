import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { DatePicker } from '../../../../../../_packages_/components/datePicker';
import { getMonthDataOfYear } from '../../../../utils/timeUtils';
import CalDayEvtPresenter from '../../../common/calDayEvtPresenter';
import { isSameDay } from '../../../../../../_packages_/components/datePicker/common/util';
import CalEventPresenterManager from '../../../common/calEventPresenterManager';
import { CalendarNS } from '../../../../utils/types';

import './yearLayout.scss';
import { getPath } from '../../../../utils/routeHelper';

export interface IYearLayoutProps {
    displayYear?: number;
    locale?: CalendarNS.TLocales;
    definerCalEvtSignal?: boolean;
    history?: any;
    currentDate?: Date;
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
    definerCalEvtSignal: state.dateReducers.definerCalEvtSignal,
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

        if (showDayEvtPstrPop && isSameDay(date, selectedDate)) {
            this.handleDateDoubleClick(date, null);
            return;
        }
        this.setState({
            showDayEvtPstrPop: true,
            dragPopNode: evt.target,
            selectedDate: date,
            id: CalEventPresenterManager.getId(),
        });
    };

    handleDateDoubleClick = (
        selectedDate: Date,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        // todo
        const { history, locale } = this.props;
        // console.log(this.props);
        console.log('on db click');
        // console.log(evt);
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

export default connect(mapStateToProps)(withRouter(YearLayout));
