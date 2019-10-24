import * as React from 'react';

import './expertiseCircle.scss';

export interface IExpertiseCircleProps {
    percentage: string;
    color: string;
    name?: string; 
}

const ExpertiseCircle = (props: IExpertiseCircleProps) => {
    const { percentage, color, name } = props;
    return (
        <div className="expertise-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                    className="circle-bg"
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="circle"
                    style={{ stroke: color }}
                    strokeDasharray={`${percentage} 100`}
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                    {`${percentage}%`}
                </text>
            </svg>
            <span className="expertise-title">{name}</span>
        </div>
    );
};

export default ExpertiseCircle;
