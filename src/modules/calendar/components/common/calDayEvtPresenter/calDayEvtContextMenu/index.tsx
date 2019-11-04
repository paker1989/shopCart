import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { getPosition } from './util';

import './calEvtCxtMenu.scss';

export interface ICalDayEvtContextMenuProps {
    ctxMenuX?: number | string;
    ctxMenuY?: number | string;
    ctxMenuType?: 'activity' | 'reminder';
    ctxMenuEvtId?: any;
}

const CalDayEvtContextMenu = (props: ICalDayEvtContextMenuProps) => {
    const { ctxMenuX, ctxMenuY, ctxMenuType, ctxMenuEvtId } = props;
    const self = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({});

    useEffect(() => {
        if (!self || !self.current) {
            return;
        }
        setPosition(getPosition(ctxMenuX, ctxMenuY, self.current));
    }, [ctxMenuX, ctxMenuY, ctxMenuType]);

    let content;

    switch (ctxMenuType) {
        case 'activity':
            content = (
                <div
                    className="ctx-content is-activity"
                    style={{ ...position }}
                    ref={self}
                ></div>
            );
            break;
        case 'reminder':
            content = (
                <div
                    className="ctx-content is-reminder"
                    style={{ ...position }}
                    ref={self}
                ></div>
            );
            break;
    }
    return (
        <div className="calevt-ctxmenu">
            <div className="overlay"></div>
            {content}
        </div>
    );
};

export default CalDayEvtContextMenu;
