import * as React from 'react';
import { useSelector } from 'react-redux';
import DayEvtPresenter from '../common/calDayEvtPresenter';

export default () => {
    const dayEvtPresenterOptions = useSelector(
        (state: any) => state.layoutReducers.dayEvtPresenterOptions
    );

    return (
        <React.Fragment>
            {dayEvtPresenterOptions.show && (
                <DayEvtPresenter {...dayEvtPresenterOptions.options} />
            )}
        </React.Fragment>
    );
};
