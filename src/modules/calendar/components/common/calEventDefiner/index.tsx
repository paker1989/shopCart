import * as React from 'react';
import ReactDOM from 'react-dom';
import I18nProvider from '../../../utils/i18nProvider';

import CalEventDefinerPop from './calEventDefinerPop';
import Position from '../position';

import CalConfig from '../../../assets/scripts/calendar.config';
import { CalendarNS } from '../../../utils/types';

let _CAL_EVENT_CURRENT_ID = 0;
let _CAL_EVENT_Z_INDEX = 999;
let _CAL_CURRENT_TARGET;

const calEventDefineManager = {};

function getId(): string {
    return `${CalConfig.calEventDefinerIdPrefix}-${++_CAL_EVENT_CURRENT_ID}`;
}

function getCurrentDragNode() {
    return _CAL_CURRENT_TARGET;
}

function setCurrentDragNode(dragNode) {
    _CAL_CURRENT_TARGET = dragNode;
}

function getContainerNode() {
    let containerNode = document.querySelector('.calevent-definer-container');
    if (!containerNode) {
        containerNode = document.createElement('div');
        containerNode.className = 'calevent-definer-container';
        document.body.appendChild(containerNode);
    }
    return containerNode;
}

/**
 * @description create caleventpop
 * @param initOptions
 * @returns popId
 */
function initEventDefiner(
    locale: CalendarNS.TLocales,
    initOptions: CalendarNS.ICalEventDefinerPopProps
): string {
    const container = document.createElement('div');
    const containerNode = getContainerNode();
    const id = `${
        CalConfig.calEventDefinerIdPrefix
    }-${++_CAL_EVENT_CURRENT_ID}`;

    ReactDOM.render(
        <I18nProvider locale={locale}>
            <CalEventDefinerPop
                containerNode={containerNode}
                id={id}
                zIndex={++_CAL_EVENT_Z_INDEX}
                onDestroy={destroyDefiner}
                locale={locale}
                {...initOptions}
            />
        </I18nProvider>,
        container
    );

    calEventDefineManager[id] = {
        container,
    };
    return id;
}

function destroyDefiner(popId: string): void {
    if (calEventDefineManager[popId]) {
        const { container } = calEventDefineManager[popId];
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            delete calEventDefineManager[popId];
        }
    }
}

function destroyAll(): void {
    if (!calEventDefineManager) {
        return;
    }
    Object.keys(calEventDefineManager).forEach(key => {
        if (key.startsWith(CalConfig.calEventDefinerIdPrefix)) {
            destroyDefiner(key);
        }
    });
}

export default {
    Position,
    getId,
    getCurrentDragNode,
    setCurrentDragNode,
};
