import DatePickers from './types';

export function getMonthData(year: number, month: number): DatePickers.IMonthDataFormat[] {
    // 本月第一天
    var firstDayOfCurrentMonth = new Date(year, month - 1, 1);
    var firstDayC = firstDayOfCurrentMonth.getDay();
    //本月最后一天
    var lastDayOfCurrentMonth = new Date(year, month, 0);
    var lastDateC = lastDayOfCurrentMonth.getDate();
    var lastDayOfPrevMonth = new Date(year, month - 1, 0);
    var lastDateP = lastDayOfPrevMonth.getDate();
    var currentMonthData: DatePickers.IMonthDataFormat[] = [];
    var yearD: number;
    var monthD: number;
    var showDate: number;
    for (var i = 0; i < 6 * 7; i++) {
        monthD = month;
        if (i < firstDayC) {
            monthD = month - 1;
            showDate = lastDateP - firstDayC + (i - 1);
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