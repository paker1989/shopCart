export default {
    hourSplitter: 2, // devide n times of 1 hour
    calEventDefinerIdPrefix: 'cal-event-definer',
    calEventPresenterIdPrefix: 'cal-event-presenter',
    defaultLocale: 'en',
    defaultLayout: 'month',
    layouts: ['year', 'month', 'day', 'week', 'customday'],
    repeats: ['everySameDay', 'everyWorkDay', 'everyDay', 'everySameDate'],
    defRepeat: 'everyWorkDay',
    maxEvtCache: 10,
    maxHeaderDisplayEvt: 2,
    colors: {
        alldayActivityColor: 'rgb(121, 134, 203)',
        reminderColor: '#3f51b5',
    },
    presetColors: [
        '#D50000', '#E67C73', '#F4511E', '#F6BF26', '#33B679', '#0B8043',
        '#039BE5', '#3F51B5', '#7986CB', '#8E24AA', '#616161'
    ]
};
