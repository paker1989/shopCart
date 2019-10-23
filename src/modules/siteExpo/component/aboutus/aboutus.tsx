import * as React from 'react';
import SkillCard from './skillCard/skillCard';
import './aboutus.scss';

const _test_skills_ = [
    { nm: 'UI设计', level: 0.8, color: '#f4511e' },
    { nm: 'React, VueJs, Angular', level: 1, color: '#33b679' },
    { nm: '服务器调优', level: 1, color: '#7986cb' },
    { nm: '网站部署', level: 0.9, color: '#8e24aa' },
];

const AboutUs = props => {
    return (
        <div className="about-us">
            <div className="skill-card-container">
                <div className="skill-cards-wrapper">
                    {_test_skills_.map((props, index) => (
                        <SkillCard {...props} key={`skillcard-${index}`} />
                    ))}
                </div>
            </div>
            <div className="self-intro">
                <div className="content-wrapper">
                    <div className="title-main">ABOUT US</div>
                    <section className="self-intro-content">
                        稳重科技背后的技术团队是一批在法国大型软件公司里供职超过5年的一群志同道合的资深软件工程师。
                        他们具有非常资深的网络工程从业经验，工作严肃认真且高效，致力于为预算捉急的小伙伴们提供性价
                        比极高的网站解决方案。
                    </section>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
