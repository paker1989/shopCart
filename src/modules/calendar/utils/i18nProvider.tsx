import { IntlProvider } from 'react-intl';

import * as React  from 'react';

import zh_CN from '../../../lib/i18n/zh-CN';
import en_US from '../../../lib/i18n/en-US';
import fr_FR from '../../../lib/i18n/fr_FR';

let localProps = navigator.language || 'en';

const messages = {};
messages['zh'] = zh_CN;
messages['en'] = en_US;
messages['fr'] = fr_FR;

localProps = 'fr';
console.log('localProps = ' + localProps);

export const DayConverter = [
  'cal.day.sun',
  'cal.day.mon',
  'cal.day.tues',
  'cal.day.wes',
  'cal.day.thu',
  'cal.day.fri',
  'cal.day.sat',
];

export default ({ children }) => {
  return (
    <IntlProvider locale={localProps} key={localProps} messages={messages[localProps]}>
        {children}
    </IntlProvider>
  );
}
