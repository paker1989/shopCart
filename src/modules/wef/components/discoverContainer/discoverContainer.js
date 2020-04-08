import * as React from 'react';

import './discoverContainer.scss';

export default class DiscoverContainer extends React.Component {
    render() {
        const { setDiscoverRef, scrollTo } = this.props;

        return (
            <div className="discover-container">
                <div className="discover-main">
                    <h3 className="title--main align-center" ref={(ref) => setDiscoverRef(ref)}>
                        Discover 3DEXPERIENCE Edu Learning Space
                    </h3>
                    <section className="discover-main--body title--sub">
                        {/* <p> */}
                            Our learning portal{' '}
                            {/* <a href="https://companion.3ds.com" target="_blank"> */}
                            3DEXPERIENCE Edu Learning Space provides an extensive online catalog made of thousands{' '}
                            of courses jointly developed by technical and digital learning experts to{' '}
                             empower you on Dassault Systèmes solutions anytime anywhere through multiple devices.
                        {/* </p> */}
                    </section>
                    <div className="discover-step">
                        <div className="discover-step-body">
                            <div className="discover-step-main">
                                <img src="./static/svg/idea.svg" className="bigger" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Best in class
                                    </div>
                                    <div className="discover-step-content--des">
                                        Gain <strong>domain knowledge</strong> and <strong>software know-how</strong> through
                                        learning experiences based on <strong>real scenarios</strong>, co-designed
                                         by <strong>Industry leaders</strong> and <strong>Dassault Systèmes
                                         experts</strong> in software products and digital learning.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/brain.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Learn by doing
                                    </div>
                                    <div className="discover-step-content--des">
                                        Play an <strong>active role</strong> in the learning process by directly
                                         applying acquired notions using the <strong>3D</strong>EXPERIENCE platform
                                          through <strong>hands-on exercises</strong> and <strong>quizzes</strong>.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/responsive.svg" />
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Mobility and Responsiveness
                                    </div>
                                    <div className="discover-step-content--des">
                                        Learn <strong>anywhere & anytime</strong> through multiple devices in a self-paced mode.
                                    </div>
                                </div>
                            </div>
                            <div className="discover-step-main">
                                <img src="./static/svg/medal.svg" class="smaller"/>
                                <div className="discover-step-content">
                                    <div className="discover-step-content--title">
                                        Get Certified
                                    </div>
                                    <div className="discover-step-content--des">
                                        Measure your competences on Dassault Systèmes
                                         solutions and <strong>promote your new skills</strong> through
                                         professional channels thanks to the <strong>self-proctored
                                          certificates</strong> available within our Learning Experiences.
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
