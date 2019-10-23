import * as React from 'react';
import isArray from 'lodash/isArray';

import './serviceCard.scss';

export interface IServiceCardProps {
    img?: string;
    logo?: string;
    title: string;
    description?: string | string[];
}
// accueil， skills｜自我介绍, process(流程), 业务介绍，contact us
const ServiceCard = (props: IServiceCardProps) => {
    const { img, logo, title, description } = props;

    const dsptn = isArray(description) ? (
        <ul>
          {description.map((item, index) => (
            <li key={`dsptn-${index}`}>
              <span className="dsptn-item">{item}</span>
            </li>
          ))}
        </ul>
    ) : (
        <section className="dsptn-item">{description}</section>
    );

    return (
        <div className="expo-service-card">
            {img !== '' && (
                <div className="card-img">
                    <img src={img} />
                </div>
            )}
            <div className="card-title">
                <span>{title}</span>
            </div>
            <div className="card-dsptn">{dsptn}</div>
        </div>
    );
};

export default ServiceCard;
