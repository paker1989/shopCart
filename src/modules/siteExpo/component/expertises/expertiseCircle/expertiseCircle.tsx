import * as React from 'react';
import cx from 'classnames';
import { useRaf } from 'react-use';

import './expertiseCircle.scss';

export interface IExpertiseCircleProps {
    percentage: number;
    color: string;
    name?: any;
    animate?: boolean;
}

const DisplayPercentage = ({ percentage }) => {
    const displayPctg = (percentage * useRaf(1400)).toFixed(0);
    return <React.Fragment>{`${displayPctg}%`}</React.Fragment>;
};

const ExpertiseCircle = (props: IExpertiseCircleProps) => {
    const { percentage, color, name, animate } = props;

    const circleClass = cx({
        ['circle']: true,
        ['onEnter']: animate,
    });

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
                    className={circleClass}
                    style={{ stroke: color }}
                    strokeDasharray={animate ? `${percentage} 100` : '0 100'}
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">
                    {animate ? (
                        <DisplayPercentage percentage={percentage} />
                    ) : (
                        '0%'
                    )}
                </text>
            </svg>
            <span className="expertise-title">{name}</span>
        </div>
    );
};

export default ExpertiseCircle;
