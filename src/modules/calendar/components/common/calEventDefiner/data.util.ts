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
    initTiming: CalendarNS.ITimingFormat,
    intl: IntlShape
): CalendarNS.ITimingOptionProps[] => {
    console.log('getTimePickerItems');
    const { hourSplitter, nbTimingPickerOptions } = CalConfig;
    const minAddUnit = Math.round(60 / hourSplitter);
    const datesForTiming = [];
    const initDate = convertTimeFormatToDate(initTiming);
    let offset;
    for (let i = 0; i < nbTimingPickerOptions; i++) {
        let offsetVal = minAddUnit * i;
        offset =
            offsetVal < 60
                ? intl.formatMessage(
                      { id: 'cal.minOffset' },
                      {
                          offset: offsetVal,
                      }
                  )
                : intl.formatMessage(
                      { id: 'cal.hourOffset' },
                      {
                          offset: offsetVal / 60,
                      }
                  );
        datesForTiming.push({
            date: convertMinAddToDate(initDate, minAddUnit * i),
            offset,
        });
    }
    return datesForTiming;
};

export const updateDateForDBTiming = (
    value: Date,
    origin?: CalendarNS.IDBTimingFormat
): CalendarNS.IDBTimingFormat => {
    return {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        dayAt: value.getDate(),
        hourAt: origin ? origin.hourAt : value.getHours(),
        minAt: origin ? origin.minAt : value.getMinutes(),
    };
};
