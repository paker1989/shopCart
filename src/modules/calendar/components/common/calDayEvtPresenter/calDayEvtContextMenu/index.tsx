import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as EvtActionCreator from '../../../../store/action/evtsAction';
import ClickOutSider from '../../clickOutSider';
import WindowFrozener from '../../windowFrozener';
import { getPosition } from './util';
// import ColorPicker from '../../../../../../_packages_/components/colorPicker';

import './calEvtCxtMenu.scss';
import { FormattedMessage } from 'react-intl';
import SimpleColorPicker from './simpleColorPicker';

export interface ICalDayEvtContextMenuProps {
    ctxMenuX?: number | string;
    ctxMenuY?: number | string;
    ctxMenuType?: 'activity' | 'reminder';
    ctxMenuEvtId?: any;
    ctxColor?: string;
    onVisibleChange?: (visible: boolean) => void;
}

const CalDayEvtContextMenu = (props: ICalDayEvtContextMenuProps) => {
    const {
        ctxMenuX,
        ctxMenuY,
        ctxMenuType,
        ctxMenuEvtId,
        onVisibleChange,
        ctxColor,
    } = props;
    const self = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (!self || !self.current) {
            return;
        }
        setPosition(getPosition(ctxMenuX, ctxMenuY, self.current));
    }, [ctxMenuX, ctxMenuY, ctxMenuType]);

    const getContainer = () => {
        return self === null ? null : self.current;
    };

    const selectColor = newColor => {
        if (ctxColor === newColor) {
            return;
        }
        dispatch(
            EvtActionCreator.updateEvt(
                ctxMenuEvtId,
                { color: newColor },
                ctxMenuType
            )
        );
        onVisibleChange && onVisibleChange(false);
    };

    let content;

    switch (ctxMenuType) {
        case 'activity':
            content = (
                <div
                    className="ctx-content is-activity"
                    style={{ ...position }}
                    ref={self}
                >
                    <div className="delete-container">
                        <div className="item-icon">
                            <span>
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shanchu"></use>
                                </svg>
                            </span>
                        </div>
                        <span>
                            <FormattedMessage id="cal.delete" />
                        </span>
                    </div>
                    <div className="color-picker">
                        <SimpleColorPicker
                            selectedColor={ctxColor}
                            onChange={selectColor}
                        />
                    </div>
                </div>
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
