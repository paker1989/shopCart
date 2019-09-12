import * as React from 'react';
import ReactDOM from 'react-dom';

import CalEventDefinerPop from './calEventDefinerPop';
import Position from '../position';

import CalConfig from '../../../assets/scripts/calendar.config.js';
import { CalendarNS } from '../../../utils/types';

let _CAL_EVENT_CURRENT_ID = 0;
let _CAL_EVENT_Z_INDEX = 999;

const calEventDefineManager = {};

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
    initOptions: CalendarNS.ICalEventDefinerPopProps
): string {
    const container = document.createElement('div');
    const containerNode = getContainerNode();
    const id = `${
        CalConfig.calEventDefinerIdPrefix
    }-${++_CAL_EVENT_CURRENT_ID}`;

    ReactDOM.render(
        <CalEventDefinerPop
            containerNode={containerNode}
            id={id}
            zIndex={++_CAL_EVENT_Z_INDEX}
            onDestroy={destroyDefiner}
            {...initOptions}
        />,
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

export default { initEventDefiner, Position, destroyDefiner, destroyAll };
