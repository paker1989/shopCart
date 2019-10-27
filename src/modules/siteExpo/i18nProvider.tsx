import * as React from 'react';
import { IntlProvider } from 'react-intl';

import zh_CN from './assets/i18n/zh-CN';
import fr_FR from './assets/i18n/fr_FR';

export interface II18nProviderProps {
    locale: 'fr' | 'zh';
}

const messages = { zh: zh_CN, fr: fr_FR };

export const locales = [
    { label: '中文', code: 'zh' },
    { label: 'FR', code: 'fr' },
];

class I18nProvider extends React.Component<II18nProviderProps, any> {
    render() {
        const { children, locale } = this.props;
        const localeProp = locale;

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
