import React from 'react';
import CardDemo from './CardDemo';
import InfiniteScrollerDemo from './InfiniteScrollerDemo';
import PreviewImageDemo from './PreviewImageDemo';

import './scroller.scss';

export default () => {
  return (
    <div className="infiniteScroller-container">
      <CardDemo />
      <InfiniteScrollerDemo />
      <PreviewImageDemo />
    </div>
  );
}
