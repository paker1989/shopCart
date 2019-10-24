import * as React from 'react';
import ExpertiseCircle from './expertiseCircle/expertiseCircle';

import './expertises.scss';

const __test_data_ = [
    { percentage: '90', color: '#379683', name: 'UI设计' },
    { percentage: '95', color: '#7395AE', name: 'React, VueJs, Angular' },
    { percentage: '95', color: '#b1a296', name: '服务器调优' },
    { percentage: '90', color: '#99738e', name: '网站部署' },
];

const Expertises = () => {
    return (
        <div className="expertises">
            <div className="bg"></div>
            <div className="overlay"></div>
            <div className="content">
                <div className="main-title">
                    <span>关于业务能力</span>
                </div>
                <div className="main-body">
                    {__test_data_.map((data, index) => (
                        <ExpertiseCircle
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
