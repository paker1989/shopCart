export const getPath = (targetDate: Date, params: any): string => {
    const { layout, lang } = params;
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth() + 1;
    const targetDay = targetDate.getDate();
    return `/${lang}/${layout}/${targetYear}/${targetMonth}/${targetDay}`;
};

export const getDateToNav = (
    currentDate: Date,
    layout: string,
    action: string
): Date => {
    let newDate;
    let tempDate: Date = new Date(currentDate);
    switch (layout) {
        case 'day':
            newDate =
                action === 'next'
                    ? new Date(tempDate.setDate(tempDate.getDate() + 1))
                    : new Date(tempDate.setDate(tempDate.getDate() - 1));
            break;
        case 'week':
            newDate =
                action === 'next'
                    ? new Date(tempDate.setDate(tempDate.getDate() + 7))
                    : new Date(tempDate.setDate(tempDate.getDate() - 7));
            break;
        case 'month':
            newDate =
                action === 'next'
                    ? new Date(
                          tempDate.getFullYear(),
                          tempDate.getMonth() + 1,
                          1
                      )
                    : new Date(
                          tempDate.getFullYear(),
                          tempDate.getMonth() - 1,
                          1
                      );
            break;
        case 'year':
            newDate =
                action === 'next'
                    ? new Date(tempDate.setFullYear(tempDate.getFullYear() + 1))
                    : new Date(
                          tempDate.setFullYear(tempDate.getFullYear() - 1)
                      );
            break;

        default:
            break;
    }

    return newDate;
};
