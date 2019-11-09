import * as React from 'react';
import { useEffect } from 'react';

export interface IWindowFrozenerProps {
    getContainer?: () => Node;
    allowScroll?: boolean;
}

const WindowFrozener = (props: IWindowFrozenerProps) => {
    const { getContainer, allowScroll } = props;

    const stopWheelZoom = event => {
        console.log('stopWheelZoom');
        if (typeof getContainer === 'function' && allowScroll) {
            const container = getContainer();
            if (!container.contains(event.target as Node)) {
                event.preventDefault();
            }
        } else {
            event.preventDefault();
        }
    };

    const stopKeyZoom = event => {
        console.log('stopKeyZoom' + event.keyCode);
        if (
            event.ctrlKey &&
            [48, 61, 96, 107, 109, 187, 189].indexOf(event.keyCode) > -1
        ) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', stopKeyZoom, { passive: false });
        ['mousewheel', 'DOMMouseScroll'].forEach(evtName => {
            document.addEventListener(evtName, stopWheelZoom, {
                passive: false,
            });
        });
        return () => {
            document.removeEventListener('keydown', stopKeyZoom);
            ['mousewheel', 'DOMMouseScroll'].forEach(evtName => {
                document.removeEventListener(evtName, stopWheelZoom);
            });
        };
    }, []);

    return null;
};

export default WindowFrozener;
