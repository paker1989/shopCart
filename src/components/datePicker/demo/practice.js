
function getMonthData(year, month) {
    // 本月第一天
    var firstDayOfCurrentMonth = new Date(year, month - 1, 1);
    var firstDayC = firstDayOfCurrentMonth.getDay();
    //本月最后一天
    var lastDayOfCurrentMonth = new Date(year, month, 0);
    var lastDateC = lastDayOfCurrentMonth.getDate();
    var lastDayOfPrevMonth = new Date(year, month - 1, 0);
    var lastDateP = lastDayOfPrevMonth.getDate();
    var currentMonthData = [];
    var yearD;
    var monthD;
    var showDate;
    for (var i = 0; i < 6 * 7; i++) {
        monthD = month;
        // firstDayC = 4; lastDateC = 31; lastDateP = 31
        // i = 0;
        //expectedData: {yearD: 2019, monthD: 7, showDate: 28}
        // i = 1;
        //expectedData: {yearD: 2019, monthD: 7, showDate: 29}
        // i = 2;
        //expectedData: {yearD: 2019, monthD: 7, showDate: 30}
        // i = 3;
        //expectedData: {yearD: 2019, monthD: 7, showDate: 31}
        // i = 4;
        //expectedData: {yearD: 2019, monthD: 8, showDate: 1}
        // i = 35;
        //expectedData: {yearD: 2019, monthD: 9, showDate: 1}
        // i = 36;
        //expectedData: {yearD: 2019, monthD: 9, showDate: 2}
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
console.log(getMonthData(2019, 12));
