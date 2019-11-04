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
        document.addEventListener('click', isMouseEvtOutSide);

        return () => {
            document.removeEventListener('click', isMouseEvtOutSide);
        };
    }, []);

    return null;
};

export default ClickOutSider;
