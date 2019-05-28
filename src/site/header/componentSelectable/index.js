import React from 'react';
import cx from 'classnames';

class ComponentSelectable extends React.Component {

  render() {
    const { matches, activeIndex } = this.props;
    let content;

    if (!matches || matches.length === 0) {
      content = (
        <div className="no_matches">没有符合的组件</div>
      );
    } else {
      content = (
        <ul>
          {matches.maps((item, index) => {
            let itemClass = cx({
              ['list_item']: true,
              ['is-active']: index == activeIndex
            })
            return (
              <li key={`${match_item}-index`} className={itemClass}>
               <span className="item_title">{item.title}</span>
               <span className="item_sub_title">{item.subTitle}</span>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div>{searchStr}</div>
    );
  }
}

export default ComponentSelectable;