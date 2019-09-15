import React from 'react';
import ReactDOM from 'react-dom';
// import { IntlProvider } from 'react-intl';
import I18nProvider from './utils/i18nProvider';
import App from './App';

import { initGoogleService } from './assets/scripts/googlePlace.init';
import '../../lib/style/iconfont.scss';
import '../../lib/scripts/iconfont';

window.initGoogleService = initGoogleService; // as callback

ReactDOM.render(
    <I18nProvider>
        <App />
    </I18nProvider>,
    document.getElementById('root')
);

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
