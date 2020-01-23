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
                    <a href="https://www.3ds.com/" target="_blank">Powered by Dassault Systemes Learning Experience</a>
               </div>
                <div className="footer-options">
                    <span><a href="https://www.3ds.com/privacy-policy/" target="_blank">Privacy Policy</a></span>
                    <span><a href="https://www.3ds.com/terms-of-use/" target="_blank">Terms of use</a></span>
                    <span><a href="https://www.3ds.com/piracy/" target="_blank">Piracy</a></span>
                    <span>2007-2020 Dassault Systemes - All rights reserved</span>
                </div>
            </div>
        )
    }
}