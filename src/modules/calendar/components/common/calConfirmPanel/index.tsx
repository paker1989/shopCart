import * as React from 'react';

import './calConfirmPanel.scss';

const _test_content_ = '要舍弃未保存的更改吗？';
const _test_cancel_text = '取消';
const _test_abandon_text = '舍弃';

class CalConfirmPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cal-confirm-panel">
                <div className="cal-confirm-panel--content">
                    <p>{_test_content_}</p>
                </div>
                <div className="cal-confirm-panel--actions">
                    <div role="button" className="cal-confirm-panel--action">
                        <span className="cal-confirm-panel--item">{_test_cancel_text}</span>
                    </div>
                    <div role="button" className="cal-confirm-panel--action">
                        <span className="cal-confirm-panel--item is-blue">{_test_abandon_text}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default CalConfirmPanel;
