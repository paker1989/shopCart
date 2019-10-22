import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import './calConfirmPanel.scss';
import { cps } from 'redux-saga/effects';

export interface ICalConfirmPanel {
    onDiscardChange: (...args) => void;
    onClose: (...args) => void;
}

class CalConfirmPanel extends React.Component<ICalConfirmPanel, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { onDiscardChange, onClose } = this.props;

        return (
            <div className="cal-confirm-panel">
                <div className="cal-confirm-panel--content">
                    <p>
                        <FormattedMessage id="cal.confirmDiscard" />
                    </p>
                </div>
                <div className="cal-confirm-panel--actions">
                    <div role="button" className="cal-confirm-panel--action">
                        <span
                            className="cal-confirm-panel--item"
                            onClick={onClose}
                        >
                            <FormattedMessage id="cal.cancel" />
                        </span>
                    </div>
                    <div role="button" className="cal-confirm-panel--action">
                        <span
                            className="cal-confirm-panel--item is-blue"
                            onClick={onDiscardChange}
                        >
                            <FormattedMessage id="cal.discard" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalConfirmPanel;
