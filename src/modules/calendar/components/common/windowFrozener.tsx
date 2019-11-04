import * as React from 'react';
import { useEffect } from 'react';

const WindowFrozener = () => {
    const stopWheelZoom = event => {
        if (event.ctrlKey == true) {
            event.preventDefault();
        }
    };

    const stopKeyZoom = event => {
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
