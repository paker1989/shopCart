import * as React from 'react';

import githubMark from '../../../assets/images/github-mark.png';
import './linkSideBar.scss';

export default class LinkSideBar extends React.Component {
    render() {
        return (
            <div className="calbody-linksidebar-container">
                <div className="calbody-linksidebar-container-section">
                    <a
                        target="_blank"
                        className="demologo"
                        href="https://github.com/paker1989?tab=repositories"
                    >
                        <img className="img" src={githubMark} />
                    </a>
                </div>
            </div>
        );
    }
}
