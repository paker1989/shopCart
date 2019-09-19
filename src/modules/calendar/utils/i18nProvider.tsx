import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { CalendarNS } from './types';

import zh_CN from '../../../lib/i18n/zh-CN';
import en_US from '../../../lib/i18n/en-US';
import fr_FR from '../../../lib/i18n/fr_FR';

export interface II18nProviderProps {
    locale: CalendarNS.TLocales;
}

const messages = { zh: zh_CN, en: en_US, fr: fr_FR };

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

class I18nProvider extends React.Component<II18nProviderProps, any> {
    render() {
        const { children, locale } = this.props;
        const localeProp = locale || 'zh';

        return (
            <IntlProvider
                locale={localeProp}
                key={localeProp}
                messages={messages[localeProp]}
            >
                {children}
            </IntlProvider>
        );
    }
}

export default I18nProvider;
