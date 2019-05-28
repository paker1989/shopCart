import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import { getFullPath } from '../../addRoute';
import './component_selectable.scss';

class ComponentSelectable extends React.Component {

  render() {
    const { matches, activeIndex } = this.props;
    let content;

    // console.log(Array.isArray(matches));

    if (!matches || matches.length === 0) {
      content = (
        <div className="no_matches">没有符合的组件</div>
      );
    } else {
      content = (
        <ul>
          {matches.map((item, index) => {
            let itemClass = cx({
              ['list_item']: true,
              ['is-active']: index == activeIndex
            })
            return (
              <li key={`match_item-${index}`} className={itemClass}>
                <NavLink to={getFullPath(item.path)}>
                  <span className="item_title">{item.title}</span>
                  <span className="item_sub_title">{item.subtitle}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className="component_selectable-wrapper">
        {content}
      </div>
    );
  }
}

export default ComponentSelectable;