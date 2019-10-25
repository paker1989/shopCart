import * as React from 'react';
import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

export default (offset, ref: React.RefObject<HTMLDivElement>) => {
    let [slideIn, setSlideIn] = useState(false);
    
    useEffect(() => {
        window.addEventListener('scroll', detectSlideIn);
        detectSlideIn();
        return () => {
            window.removeEventListener('scroll', detectSlideIn);
        };
    }, []);

    const detectSlideIn = throttle(() => {
        if (!ref || !ref.current) {
            return;
        }
        // const body = document.body || document.documentElement;
        // const { scrollTop, clientHeight } = body;
        const { top, bottom } = ref.current.getBoundingClientRect();

        if (top < window.innerHeight - offset && bottom >= 0) {
            // console.log('top = ' + top);
            // console.log(window.innerHeight);
            // console.log('prepare to slide in');
            setSlideIn(true);
            window.removeEventListener('scroll', detectSlideIn);
        }
    });

    return slideIn;
};
