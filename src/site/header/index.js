import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchInput from '../../components/searchInput';
import Popover from '../../components/popover';
import ComponentSelectable from './componentSelectable';
import './header.scss';
import logo from '../data/logo1.png';
import githubMark from '../data/github-mark.png';

/**
 * @param {navData} 
 * @returns one level flat item list
 */
function getFlatNavData(navData) {
  let flatNavData = [];
  navData.forEach(cat => {
    cat.groups.forEach(group => {
      group.items.forEach(item => {
        flatNavData.push(item);
      })
    })
  });
  return flatNavData;
}


class DemoHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { searchContent, handleSearch, navData, location } = this.props;
    const currentDemoPath = location.pathname.split('/')[2];

    let flatNavData = getFlatNavData(navData);
    let matches = searchContent.trim() === ''? flatNavData
      : flatNavData.filter((item) =>
          item.title.includes(searchContent.trim()));
    let activeIndex = currentDemoPath === undefined? -1
      : matches.findIndex(data => data.path === currentDemoPath);

    return (
      <div className="header_container">
        <div className="logo_container">
          <img src={logo}/>
        </div>          
        <div className="search_input_container">
          <Popover
            position={Popover.Placement.autoBottomLeft}
            cushion={5}>
            <Popover.Trigger.ClickTrigger>
              <SearchInput 
                placeholder="搜索组件..."
                onChange={handleSearch}
                value={searchContent}
                width={250}/>
            </Popover.Trigger.ClickTrigger>
            <Popover.Content>
              <ComponentSelectable 
                matches={matches} 
                activeIndex={activeIndex}/>
            </Popover.Content>
          </Popover>
        </div>
        <div className="link_dispatcher">
          <a className="demologo" href="https://github.com/paker1989?tab=repositories">
            <img src={githubMark}/>
          </a>
          <NavLink className="shop_cart" to="/shopCart">Demo project</NavLink>
        </div>
      </div>
    );
  }
}

export default DemoHeader;