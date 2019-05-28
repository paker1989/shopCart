import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchInput from '../../components/searchInput';
import Popover from '../../components/popover';
import ComponentSelectable from './componentSelectable';
import './header.scss';
import logo from '../data/logo1.png';
import githubMark from '../data/github-mark.png';

class DemoHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { searchContent, handleSearch } = this.props;

    return (
      <div className="header_container">
        <div className="logo_container">
          <img src={logo}/>
        </div>          
        <div className="search_input_container">
          <Popover
            position={Popover.Placement.autoBottomLeft}
            cushion={5}>
            <Popover.Trigger.FocusTrigger>
              <SearchInput 
                placeholder="搜索组件..."
                onChange={handleSearch}
                value={searchContent}
                width={250}/>
            </Popover.Trigger.FocusTrigger>
            <Popover.Content>
              <ComponentSelectable searchStr={searchContent}/>
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