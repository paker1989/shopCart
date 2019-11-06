import * as React from 'react';
import { useEffect } from 'react';

export interface IClickOutSiderProps {
    getContainer: () => Node;
    cb: () => void;
}

const ClickOutSider = (props: IClickOutSiderProps) => {
    const isMouseEvtOutSide = (evt: Event) => {
        const { getContainer, cb } = props;
        const { target } = evt;

        const container = getContainer();
        if (!container.contains(target as Node)) {
            cb();
        }
    };

    useEffect(() => {
        document.addEventListener('click', isMouseEvtOutSide, false);

        return () => {
            document.removeEventListener('click', isMouseEvtOutSide, false);
        };
    }, []);

    return null;
};

export default ClickOutSider;
