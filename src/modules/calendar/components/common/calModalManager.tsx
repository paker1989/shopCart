import * as React from 'react';
import ReactDOM from 'react-dom';

import I18nProvider from '../../utils/i18nProvider';
import Modal from '../../../../_packages_/components/modal';
import CalConfig from '../../assets/scripts/calendar.config';
import { CalendarNS } from '../../utils/types';

let _CAL_EVENT_CURRENT_ID = 0;

const calEventDefineManager = {};

function initModal(
    locale: CalendarNS.TLocales,
    RawComponent: React.ComponentType,
    initModalOptions: CalendarNS.IModalOptions
): string {
    const container = document.createElement('div');
    const id = `${
        CalConfig.calEventDefinerIdPrefix
    }-${++_CAL_EVENT_CURRENT_ID}`;

    let { onClose, ...otherProps } = initModalOptions;
    if (!onClose) {
        onClose = (modalId: string) => {
            destroyModal(modalId);
        };
    }
    ReactDOM.render(
        <Modal {...otherProps} onClose={onClose} id={id}>
            <I18nProvider locale={locale}>
                <RawComponent />
            </I18nProvider>
        </Modal>,
        container
    );

    calEventDefineManager[id] = {
        container,
    };
    return id;
}

function destroyModal(popId: string): void {
    const { container } = calEventDefineManager[popId];
    if (container) {
        ReactDOM.unmountComponentAtNode(container);
        delete calEventDefineManager[popId];
    }
}

export default { initModal };
