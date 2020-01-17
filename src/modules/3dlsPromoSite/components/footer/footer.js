import React from 'react';


import './footer.scss';

export default class CLSFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer-container">
                <div className="power-by">
                    Powered by Dassault Systemes Learning Experience
               </div>
                <div className="footer-options">
                    <span>Privacy Policy</span>
                    <span>Terms of use</span>
                    <span>Piracy</span>
                    <span>2007-2020 Dassault Systemes - All rights reserved</span>
                </div>
            </div>
        )
    }
}