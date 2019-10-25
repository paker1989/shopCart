import * as React from 'react';
import { useRaf } from 'react-use';

const DisplayPercentage = ({ percentage }) => {
    const displayPctg = (percentage * useRaf(1400)).toFixed(0);
    return <span>{`${displayPctg}%`}</span>;
};

export default DisplayPercentage;
