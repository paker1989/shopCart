import { IntlShape } from 'react-intl';
import { CalEvtDataNS } from '../../../utils/evtTypes';
import { CalendarNS } from '../../../utils/types';
import {
    convertTimeFormatToDate,
    convertMinAddToDate,
} from '../../../utils/timeRangeHelper';
import CalConfig from '../../../assets/scripts/calendar.config';

export const getInitActivityModel = (
    // alldayEvt: boolean,
    timeRange: CalendarNS.ITimeRangeFormat
): CalEvtDataNS.ICalEvtActivityOptionDataModel => {
    const time: Date = convertTimeFormatToDate(timeRange.from);
    const to: Date = convertTimeFormatToDate(timeRange.to);
    return {
        time: {
            from: {
                year: time.getFullYear(),
                month: time.getMonth() + 1,
                dayAt: time.getDate(),
                hourAt: time.getHours(),
                minAt: time.getMinutes(),
            },
            to: {
                year: to.getFullYear(),
                month: to.getMonth() + 1,
                dayAt: to.getDate(),
                hourAt: to.getHours(),
                minAt: to.getMinutes(),
            },
        },
        description: '',
        address: '',
        color: CalConfig.colors.alldayActivityColor,
    };
};

export const getInitReminderModel = (
    timeRange: CalendarNS.ITimeRangeFormat
): CalEvtDataNS.ICalEvtReminderOptionDataModel => {
    const time: Date = convertTimeFormatToDate(timeRange.from);
    return {
        time: {
            year: time.getFullYear(),
            month: time.getMonth() + 1,
            dayAt: time.getDate(),
            hourAt: time.getHours(),
            minAt: time.getMinutes(),
        },
        repeatOption: 'everySameDate',
        color: CalConfig.colors.reminderColor,
    };
};

export const getTimePickerItems = (
    initTiming: CalendarNS.ITimingFormat
): CalendarNS.ITimingOptionProps[] => {
    console.log('calculating getTimePickerItems');
    const { hourSplitter, nbTimingPickerOptions } = CalConfig;
    const minAddUnit = Math.round(60 / hourSplitter);
    const datesForTiming = [];
    const initDate = convertTimeFormatToDate(initTiming);
    for (let i = 0; i < nbTimingPickerOptions; i++) {
        datesForTiming.push({
            date: convertMinAddToDate(initDate, minAddUnit * i),
            offset: minAddUnit * i,
        });
    }
    return datesForTiming;
};
