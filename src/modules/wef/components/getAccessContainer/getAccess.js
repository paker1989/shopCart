import * as React from 'react';

import './getAccess.scss';

export default class GetAccess extends React.Component {
    render() {
        const { voucherLink, setGetAccessRef } = this.props;
        return (
            <div className="get-access">
                <div className="main" ref={(ref) => setGetAccessRef(ref)}>
                    <h3 className="title">
                        How to get access to the trainings?
                    </h3>
                    <div className="content">
                        <p className="content-item">
                            Dassault Systèmes is happy to offer you a free
                            access to a Learning Path till June 30th, 2020 on 3DS
                            Learning Space, our elearning platform.
                        </p>
                        <p className="content-item">
                            To proceed, click the <b>Get Access</b> button below
                            and use the voucher code that is provided on the
                            page. Then, use your existing 3DEXPERIENCE ID if you
                            have one already, or create one to log into the
                            platform, and follow the instructions.
                        </p>
                        <p className="content-item">Happy trainings!</p>
                    </div>
                    <div className="action">
                        <div
                            role="button"
                            className="btn-get-access"
                            onClick={() => {
                                window.open(voucherLink, '_blank');
                            }}
                        >
                            Get Access
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
