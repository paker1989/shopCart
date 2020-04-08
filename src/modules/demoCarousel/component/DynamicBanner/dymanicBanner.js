import React from 'react';

import './dynamicBanner.scss';

export default ({ sourceLink, pageLink }) => {
    return (
      <div className="dynamic-banner">
          <div className="wrapper">
          <img alt="3DS Learning space" src={pageLink}/>
        <div role="button" className="start-button" onClick={() => {
            window.open(sourceLink, "_blank");
        }}>Start</div>
          </div>

      </div>
    );
}