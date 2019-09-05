import * as React from 'react';
import ReactDOM from 'react-dom';

import CalEventDefinerPop from './calEventDefinerPop';
import Position from './position';

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
function initDefine(initOptions: CalendarNS.ICalEventInitOptions): number {
    const container = document.createElement('div');
    const containerNode = getContainerNode();
    ReactDOM.render(
        <CalEventDefinerPop
            containerNode={containerNode}
            id={`${
                CalConfig.calEventDefinerIdPrefix
            }-${++_CAL_EVENT_CURRENT_ID}`}
            zIndex={++_CAL_EVENT_Z_INDEX}
            {...initOptions}
        />,
        container
    );

    calEventDefineManager[_CAL_EVENT_CURRENT_ID] = {
        container,
    };
    return _CAL_EVENT_CURRENT_ID;
}

function destroyDefiner(popId: number) {
    const { container } = calEventDefineManager[popId];
    if (container) {
        ReactDOM.unmountComponentAtNode(container);
    }
}

export default { initDefine, Position, destroyDefiner };
