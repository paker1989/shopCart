import * as React from 'react';
import { useRef } from 'react';
import cx from 'classnames';

import useScrollPosition from '../common/useScrollPosition';
import ServiceCard from './serviceCard/serviceCard';

import './serviceList.scss';
import { FormattedMessage } from 'react-intl';


const _fake_services = [
    {
        logo: '',
        img: 'static/image/teamwork1.png',
        title: <FormattedMessage id="se.service.step1"/>,
        // description: [
        //     '根据您的网站设计需求详细沟通',
        //     '产品经历需求分析以及细化',
        //     '详细策划网站制作方案',
        // ],
        description: <FormattedMessage id="se.service.step1.content"/>
    },
    {
        logo: '',
        img: 'static/image/teamwork4.png',
        title: <FormattedMessage id="se.service.step2"/>,
        // description: [
        //     '根据您的网站设计需求详细沟通',
        //     '产品经历需求分析以及细化',
        //     '详细策划网站制作方案',
        // ],
        description: <FormattedMessage id="se.service.step2.content"/>
    },
    {
        logo: '',
        img: 'static/image/teamwork3.png',
        title: <FormattedMessage id="se.service.step3"/>,
        // description: [
        //     '根据您的网站设计需求详细沟通',
        //     '产品经历需求分析以及细化',
        //     '详细策划网站制作方案',
        // ],
        description: <FormattedMessage id="se.service.step3.content"/>
    },
];
// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const ServiceList = () => {
    const self = useRef<HTMLDivElement>(null);

    const slideIn = useScrollPosition(200, self);

    const titleClass = cx({
        ['service-title']: true,
        ['slideIn-left']: slideIn
    })

    const serviceListClass = cx({
        ['service-list']: true,
        ['slideIn-right']: slideIn
    })

    return (
        <div className="expo-services">
            <div className={titleClass} ref={self}>
                <span className="main-title">
                    <FormattedMessage id="se.service"/>
                </span>
                <span className="sub-title">
                    {/* 专业团队，为您量身打造一流的服务，从网站设计,开发,部署到推广,我们满足您的一切需要 */}
                    <FormattedMessage id="se.service.subtitle"/>
                </span>
            </div>
            <div className={serviceListClass}>
                {_fake_services.map((item, index) => (
                    <ServiceCard
                        description={item.description}
                        img={item.img}
                        logo={item.logo}
                        key={index}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceList;
