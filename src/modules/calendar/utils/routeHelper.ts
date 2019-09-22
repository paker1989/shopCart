import { locales } from '../utils/i18nProvider';
import Calconfig from '../assets/scripts/calendar.config';

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

export function validRouteParams(routeProps: any): boolean {
    // console.log('======validRouteParams');
    const { lang, layout, year, month, date } = routeProps;
    if (!lang || !layout || !year || !month || !date) {
        return false;
    }
    if (locales.findIndex(local => local.code === lang) === -1) {
        return false;
    }
    if (!Calconfig.layouts.includes(layout)) {
        return false;
    }

    const tryDate = new Date(year, month - 1, date);
    if (!((tryDate as any) instanceof Date) || isNaN(tryDate as any)) {
        return false;
    }

    return true;
}
