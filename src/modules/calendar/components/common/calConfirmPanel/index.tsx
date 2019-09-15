import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import './calConfirmPanel.scss';

class CalConfirmPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cal-confirm-panel">
                <div className="cal-confirm-panel--content">
                    <p>
                        <FormattedMessage id="cal.confirmDiscard" />
                    </p>
                </div>
                <div className="cal-confirm-panel--actions">
                    <div role="button" className="cal-confirm-panel--action">
                        <span className="cal-confirm-panel--item">
                            <p>
                                <FormattedMessage id="cal.cancel" />
                            </p>
                        </span>
                    </div>
                    <div role="button" className="cal-confirm-panel--action">
                        <span className="cal-confirm-panel--item is-blue">
                            <p>
                                <FormattedMessage id="cal.discard" />
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalConfirmPanel;
