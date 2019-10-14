import * as React from 'react';
import { useState, useEffect } from 'react';
import cx from 'classnames';

import useSortedEvtList from '../../../../../utils/hooks/useSortedEvtList';
import './singleDayHeaderPlder.scss';
import { CalEvtDataNS } from '../../../../../utils/evtTypes';

export interface SingleDayHeaderPlderProps {
    evts: CalEvtDataNS.ICalEvtCompleteDataModelType[];
    maxNbEvts: number;
    isCollapse: boolean;
    onExpOrClps: () => void;
}

const SingleDayHeaderPlder = (props: SingleDayHeaderPlderProps) => {
    const { evts, maxNbEvts, isCollapse } = props;
    const [displayClps, setDisplayClps] = useState(false);

    const sortedList = useSortedEvtList(
        evts ? evts.filter(evt => evt.allDayEvt) : []
    );

    useEffect(() => {
        setDisplayClps(sortedList.length > maxNbEvts);
    }, [sortedList.length, maxNbEvts]);

    const expandIconClass = cx({
        ['ali-icon']: true,
        ['is-collapse']: isCollapse,
    });

    return (
        <div className="placeholder">
            <span className="gmt font-subtitle">GMT+2</span>
            {displayClps && (
                <div className="icon-circle-wrapper">
                    <svg
                        className={expandIconClass}
                        aria-hidden="true"
                        onClick={() => {
                            props.onExpOrClps();
                        }}
                    >
                        <use
                            className="font-subtitle"
                            xlinkHref="#icon-arrowdown"
                        ></use>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default SingleDayHeaderPlder;
