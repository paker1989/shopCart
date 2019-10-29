import * as React from 'react';
import { useRef } from 'react';
import cx from 'classnames';

import ExpertiseCircle from './expertiseCircle/expertiseCircle';
import useScrollPosition from '../common/useScrollPosition';

import './expertises.scss';
import { FormattedMessage } from 'react-intl';

const __test_data_ = [
    {
        percentage: 90,
        color: '#379683',
        name: <FormattedMessage id="se.uidesign" />,
    },
    { percentage: 95, color: '#7395AE', name: 'React, VueJs, Angular' },
    {
        percentage: 95,
        color: '#b1a296',
        name: <FormattedMessage id="se.maintenance" />,
    },
    {
        percentage: 90,
        color: '#99738e',
        name: <FormattedMessage id="se.config" />,
    },
];

const Expertises = props => {
    const { setExpertiseRef } = props;
    const self = useRef<HTMLDivElement>(null);

    const animate = useScrollPosition(40, self);
    if (animate) {
        console.log('expertises slide in');
    }

    const titleClass = cx({
        ['main-title']: true,
        ['slideIn']: animate,
    });

    return (
        <div
            className="expertises"
            ref={ref => {
                setExpertiseRef(ref);
            }}
        >
            <div className="bg">
              {/* <img src="static/image/carousel2.png" /> */}
            </div>
            <div className="overlay"></div>
            <div className="content">
                <div className={titleClass}>
                    <span>
                        <FormattedMessage id="se.expertise" />
                    </span>
                </div>
                <div className="main-body" ref={self}>
                    {__test_data_.map((data, index) => (
                        <ExpertiseCircle
                            animate={animate}
                            {...data}
                            key={`expertise-circle-${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Expertises;
