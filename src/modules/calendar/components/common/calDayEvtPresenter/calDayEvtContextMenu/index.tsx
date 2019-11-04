import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import ClickOutSider from '../../clickOutSider';
import WindowFrozener from '../../windowFrozener';
import { getPosition } from './util';

import './calEvtCxtMenu.scss';

export interface ICalDayEvtContextMenuProps {
    ctxMenuX?: number | string;
    ctxMenuY?: number | string;
    ctxMenuType?: 'activity' | 'reminder';
    ctxMenuEvtId?: any;
    onVisibleChange?: (visible: boolean) => void;
}

const CalDayEvtContextMenu = (props: ICalDayEvtContextMenuProps) => {
    const {
        ctxMenuX,
        ctxMenuY,
        ctxMenuType,
        ctxMenuEvtId,
        onVisibleChange,
    } = props;
    const self = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({});

    useEffect(() => {
        if (!self || !self.current) {
            return;
        }
        setPosition(getPosition(ctxMenuX, ctxMenuY, self.current));
    }, [ctxMenuX, ctxMenuY, ctxMenuType]);

    const getContainer = () => {
        return self === null ? null : self.current;
    };

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
            <WindowFrozener />
            <ClickOutSider
                cb={() => {
                    onVisibleChange && onVisibleChange(false);
                }}
                getContainer={getContainer}
            />
        </div>
    );
};

export default CalDayEvtContextMenu;
