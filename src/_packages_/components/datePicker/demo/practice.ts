
export interface monthData {
    yearD: number;
    monthD: number;
    showDate: number;
    // index: number;
}

function getMonthData(year: number, month: number): any {

    // 本月第一天
    let firstDayOfCurrentMonth: Date = new Date(year, month - 1, 1);
    let firstDayC: number = firstDayOfCurrentMonth.getDay();

    //本月最后一天
    let lastDayOfCurrentMonth: Date = new Date(year, month, 0);
    let lastDateC: number = lastDayOfCurrentMonth.getDate();

    let lastDayOfPrevMonth: Date = new Date(year, month - 1, 0);
    let lastDateP: number = lastDayOfPrevMonth.getDate();

    let currentMonthData: monthData[] = [];
    let yearD: number;
    let monthD: number;
    let showDate: number;
    for (let i: number = 0; i < 6 * 7; i++) {
        if (i < firstDayC) {
            monthD = month - 1;
            showDate = lastDateP - firstDayC + (i - 1);
        } else if (i < firstDayC + lastDateC) {
            monthD = month;
            showDate = (i + 1) - firstDayC;
        } else {
            monthD = month + 1;
            showDate = (i + 1) - (firstDayC + lastDateC);
        }
        if (monthD < 1) {
            yearD = year - 1;
            monthD += 12;
        } else if (monthD > 12) {
            yearD = year + 1;
            monthD -= 12;
        } else {
            yearD = year;
        }
        currentMonthData.push({ yearD, monthD, showDate });
    }
    return currentMonthData;
}

console.log(getMonthData(2019, 8));

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


        