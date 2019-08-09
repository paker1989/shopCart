import { DatePickers } from './types';

export function isSameDay(selectedDay: DatePickers.IMonthDataFormat, targetDay: Date): boolean {
    if (targetDay === null || targetDay === undefined) {
        return false;
    }

    const targetMonth = targetDay.getMonth() + 1;
    const targetYear = targetDay.getFullYear();
    const targetShowDate = targetDay.getDate();

    const { monthD, yearD, showDate } = selectedDay;

    return (
        monthD === targetMonth &&
        yearD === targetYear &&
        showDate === targetShowDate
    );
}
export function getMonthData(year: number, month: number): DatePickers.IMonthDataFormat[] {
    // 本月第一天
    var firstDayOfCurrentMonth = new Date(year, month - 1, 1);
    var firstDayC = firstDayOfCurrentMonth.getDay();
    //本月最后一天
    var lastDayOfCurrentMonth = new Date(year, month, 0);
    var lastDateC = lastDayOfCurrentMonth.getDate();
    var lastDayOfPrevMonth = new Date(year, month - 1, 0);
    var lastDateP = lastDayOfPrevMonth.getDate();
    console.log('firstDayC = ' + firstDayC);
    console.log('lastDateP = ' + lastDateP);
    var currentMonthData: DatePickers.IMonthDataFormat[] = [];
    var yearD: number;
    var monthD: number;
    var showDate: number;
    for (var i = 0; i < 6 * 7; i++) {
        monthD = month;
        if (i < firstDayC) {
            monthD = month - 1;
            showDate = lastDateP - firstDayC + (i + 1); 
        }
        else if (i < firstDayC + lastDateC) {
            monthD = month;
            showDate = (i + 1) - firstDayC;
        }
        else {
            monthD = month + 1;
            showDate = (i + 1) - (firstDayC + lastDateC);
        }
        if (monthD < 1) {
            yearD = year - 1;
            monthD += 12;
        }
        else if (monthD > 12) {
            yearD = year + 1;
            monthD -= 12;
        }
        else {
            yearD = year;
        }
        currentMonthData.push({ yearD: yearD, monthD: monthD, showDate: showDate });
    }

    return currentMonthData;
}

export function populateDisplay(date: Date): DatePickers.IDatePickerPanelStates {
    const displayYear: number = date.getFullYear();
    const displayMonth: number = date.getMonth() + 1;
    const monthData: DatePickers.IMonthDataFormat[] = getMonthData(displayYear, displayMonth);

    return { displayYear, displayMonth, monthData };
}

export function getSiblingMonthData(displayYear: number,
    displayMonth: number,
    actionType: DatePickers.monthChangeType): DatePickers.IDatePickerPanelStates {

    let newDisplayMonth;
    let newDisplayYear;
    let monthData: DatePickers.IMonthDataFormat[];

    switch (actionType) {
        case DatePickers.monthChangeType._next_:
            const isNewYear = displayMonth + 1 > 12;
            newDisplayMonth = isNewYear ? 1 : displayMonth + 1;
            newDisplayYear = isNewYear ? displayYear + 1 : displayYear;

            monthData = getMonthData(newDisplayYear, newDisplayMonth);
            break;
        case DatePickers.monthChangeType._prev_:
            const isPrevYear = displayMonth - 1 <= 0;
            newDisplayMonth = isPrevYear ? 12 : displayMonth - 1;
            newDisplayYear = isPrevYear ? displayYear - 1 : displayYear;

            monthData = getMonthData(newDisplayYear, newDisplayMonth);
            break;
    }
    return {
        displayYear: newDisplayYear,
        displayMonth: newDisplayMonth,
        monthData
    };
}