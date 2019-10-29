import { CalEvtDataNS } from '../../../utils/evtTypes';
import { CalendarNS } from '../../../utils/types';
import { convertTimeFormatToDate } from '../../../utils/timeRangeHelper';
import CalConfig from '../../../assets/scripts/calendar.config';

export const getInitActivityModel = (
    alldayEvt: boolean,
    timeRange: CalendarNS.ITimeRangeFormat
): CalEvtDataNS.ICalEvtActivityOptionDataModel => {
    const time: Date = convertTimeFormatToDate(timeRange.from);
    const to: Date = convertTimeFormatToDate(timeRange.to);
    return {
        time: alldayEvt
            ? {
                  year: time.getFullYear(),
                  month: time.getMonth() + 1,
                  dayAt: time.getDate(),
                  hourAt: time.getHours(),
                  minAt: time.getMinutes(),
              }
            : {
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
