import * as React from 'react';
import ReactDOM from 'react-dom';

import Position from './position';

import CalConfig from '../../assets/scripts/calendar.config.js';
import { CalendarNS } from '../../utils/types';

let _CAL_POPOVER_ID = 0;
let _CAL_EVENT_Z_INDEX = 999;

const calEventPresenterManager = {};

function getContainerNode() {
    let containerNode = document.querySelector('.calevent-presenter-container');
    if (!containerNode) {
        containerNode = document.createElement('div');
        containerNode.className = 'calevent-presenter-container';
        document.body.appendChild(containerNode);
    }
    return containerNode;
}

/**
 * @description create caleventpop
 * @param initOptions
 * @returns popId
 */
function initPresenter(
    RawComponent: React.ComponentType<CalendarNS.ICalEventPresenterProps>,
    popInitOptions?: CalendarNS.ICalEventPresenterProps
): string {
    const container = document.createElement('div');
    const containerNode = getContainerNode();
    const id = `${CalConfig.calEventPresenterIdPrefix}-${++_CAL_POPOVER_ID}`;

    ReactDOM.render(
        <RawComponent
            id={id}
            zIndex={++_CAL_EVENT_Z_INDEX}
            containerNode={containerNode}
            {...popInitOptions}
        />,
        container
    );

    calEventPresenterManager[id] = { container };
    return id;
}

function destroyPresenter(popId: string): void {
    const { container } = calEventPresenterManager[popId];
    if (container) {
        ReactDOM.unmountComponentAtNode(container);
        delete calEventPresenterManager[popId];
    }
}

function destroyAll(): void {
    if (!calEventPresenterManager) {
        return;
    }
    Object.keys(calEventPresenterManager).forEach(key => {
        if (key.startsWith(CalConfig.calEventPresenterIdPrefix)) {
            destroyPresenter(key);
        }
    });
}

export default { initPresenter, Position, destroyPresenter, destroyAll };
