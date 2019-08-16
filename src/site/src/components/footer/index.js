import React from 'react';
import './footer.scss';
import githubMark from '../data/github-mark.png';

export default () => {
  return (
    <div className="foot-container">
      <img src={githubMark}/>
      <a className="demo-description" href="https://github.com/paker1989?tab=repositories">
        <span className="demo-description">Bin bin's Github</span>
      </a>
    </div>
  );
}