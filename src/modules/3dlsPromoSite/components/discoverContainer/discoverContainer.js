import * as React from 'react';

import './discoverContainer.scss';

export default class DiscoverContainer extends React.Component {
    render() {
        const { setDiscoverRef, scrollTo } = this.props;

        return (
            <div className="discover-container">
                <div className="discover-btn">
                    <img src="./static/svg/arrow.svg" />
                    <span className="discover-btn--text" onClick={() => {
                        scrollTo('discover');
                    }}>Discover</span>
                </div>
                <div className="discover-main">
                    <h3 className="title--main align-center" ref={(ref) => setDiscoverRef(ref)}>
                        Discover 3DS Learning Space
                    </h3>
                    <section className="title--sub">
                        <p>
                            Our learning portal{' '}
                            {/* <a href="https://companion.3ds.com" target="_blank"> */}
                            3DS Learning Space
                            {/* </a>{' '} */}
                            provides an extensive online catalog made of
                            thousands
                        </p>
                        <p>
                            of courses jointly developed by technical and
                            digital learning experts to empower you on
                        </p>
                        <p>
                            Dassault Systèmes solutions anytime & anywhere
                            through multiple devices.
                        </p>
                    </section>
                    <div className="discover-step">
                        {/* <div className="discover-step--timeline"></div> */}
                        <div className="discover-step-body">
                            <div className="discover-step-main">
                                <img src="./static/svg/brain.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Learning-by-doing
                                    </div>
                                    <div className="discover-step-content--des">
                                        Playing an active part in the learning
                                        process by directly applying acquired
                                        notions using the 3DEXPERIENCE platform
                                        through exercises and quizzes.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/idea.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Knowledge and Software know-how
                                    </div>
                                    <div className="discover-step-content--des">
                                        To be proficient in a role, it is
                                        essential to first acquire domain
                                        knowledge and then build on know-how to
                                        perform effectively using the
                                        3DEXPERIENCE Platform.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/partner.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Partnerships
                                    </div>
                                    <div className="discover-step-content--des">
                                        To ensure our Learning Experiences
                                        provide state-of-the-art methodologies,
                                        they are jointly developed by experts in
                                        domain knowledge, software products and
                                        digital learning.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/medal.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Get Certified
                                    </div>
                                    <div className="discover-step-content--des">
                                        Self-proctored certificates are
                                        available within each Learning
                                        Experience so that you can measure your
                                        competences on Dassault Systèmes
                                        solutions and promote your new skills
                                        through professional channels.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
