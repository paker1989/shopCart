import * as React from 'react';
import './header.scss';

// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const Header = (props) => {
  return (
    <div className="expo-header">
      <div className="expo-header-logo"></div>
      <div className="expo-header-menu">
        <span className="menu-item">欢迎</span>
        <span className="menu-item">关于我们</span>
        <span className="menu-item">业务流程</span>
        <span className="menu-item">业务介绍</span>
        <span className="menu-item">联系我们</span>
      </div>
    </div>
  );
}

export default Header;