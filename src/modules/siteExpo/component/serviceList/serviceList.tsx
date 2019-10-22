import * as React from 'react';
import './serviceList.scss';

// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const ServiceList = (props) => {
  return (
    <div className="expo-services">
      <div className="service-title">
        <span className="main-title">服务内容</span>
        <span className="sub-title">
          专业团队，为您量身打造一流的服务，从网站设计,开发,部署到推广,我们满足您的一切需要
        </span>
      </div>
      <div className="service-list">
        <ServiceCard>

        </ServiceCard>
      </div>
    </div>
  );
}

export default ServiceList;