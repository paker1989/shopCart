import React from 'react';

import CardDemo from './CardDemo';
import InfiniteScrollerDemo from './InfiniteScrollerDemo';
import PreviewImageDemo from './PreviewImageDemo';

import CopyButton from '../../components/copyButton';

import './scroller.scss';

export default () => {
  return (
    <div className="infiniteScroller-container">
      <CardDemo />
      <InfiniteScrollerDemo />
      <PreviewImageDemo />
      <div>
        <p>this is to focus</p>
      {/* 没有children */}
        <CopyButton className="bxu-btn bxu-action" text="狂乱贵公子"/>

        {/* 有单一child */}
        <CopyButton text="芳心纵火犯" className="bxu-btn-wrapper">
          <button className="bxu-btn bxu-action">点我复制</button>
        </CopyButton>

        {/* 有两个children, 报错 */}
        {/* <CopyButton>
          <button>点我复制</button>
          <button>点我也复制</button>
        </CopyButton> */}
      </div>
    </div>
  );
}
