import React from 'react';
import cx from "classnames";
import { NavLink } from 'react-router-dom';

import { getFullPath } from '../util/addRoute';
import './sideNav.scss';

class SideNav extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  parseNavData = (navData) => {
    return (
     <ul className="nav-data-wrapper">
       {navData.map((category, index) => {
         return (
           <li key={index}>
             {this.parseCat(category)}
           </li> 
         )
       })}
     </ul>
    );
  }

  parseCat = (category) => {
    return (
      <div className="nav-cat-wrapper">
        <div className="nav-cat-title">{category.title}</div>
        <ul className="nav-group-list">
          {category.groups.map((group, index) => {
            return (
              <li key={index}>
                {this.parseGroup(group)}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

  parseGroup = (group) => {
    const { match } = this.props;
    return (
      <div className="nav-group-wrapper">
        <div className="nav-group-title">{group.title}</div>
        <ul className="nav-item-list">
          {group.items.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={getFullPath(match, item.path)}>{`${item.title} ${item.subtitle}`}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { navData, className } = this.props;
    const wrapperClass = cx({
      ['sidenav-wrapper']: true,
    }, className);
    
    return (
      <div className={wrapperClass}>
        {this.parseNavData(navData)}
      </div>
    );
  }
}

export default SideNav;