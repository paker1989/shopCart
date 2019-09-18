import { IntlProvider } from 'react-intl';

import * as React from 'react';

import zh_CN from '../../../lib/i18n/zh-CN';
import en_US from '../../../lib/i18n/en-US';
import fr_FR from '../../../lib/i18n/fr_FR';

// let localProps = navigator.language || 'en';
// console.log('react version = ' + React.version);
// console.log(React.useContext);

const messages = {};
messages['zh'] = zh_CN;
messages['en'] = en_US;
messages['fr'] = fr_FR;

export const localProps = 'fr'; // test

export const DayConverter = [
    'cal.day.sun',
    'cal.day.mon',
    'cal.day.tues',
    'cal.day.wes',
    'cal.day.thu',
    'cal.day.fri',
    'cal.day.sat',
];

export const locales = [
    { label: '中文', code: 'zh' },
    { label: 'FR', code: 'fr' },
    { label: 'EN', code: 'en' },
];

export default ({ children }) => {
    return (
        <IntlProvider
            locale={localProps}
            key={localProps}
            messages={messages[localProps]}
        >
            {children}
        </IntlProvider>
    );
};
