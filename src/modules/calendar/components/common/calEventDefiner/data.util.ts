import { IntlShape } from 'react-intl';
import { CalEvtDataNS } from '../../../utils/evtTypes';
import { CalendarNS } from '../../../utils/types';
import {
    convertTimeFormatToDate,
    convertMinAddToDate,
} from '../../../utils/timeRangeHelper';
import CalConfig from '../../../assets/scripts/calendar.config';

export const getInitActivityModel = (): CalEvtDataNS.ICalEvtActivityOptionDataModel => {
    return {
        description: '',
        address: '',
        color: CalConfig.colors.alldayActivityColor,
    };
};

export const getInitReminderModel = (): CalEvtDataNS.ICalEvtReminderOptionDataModel => {
    return {
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
