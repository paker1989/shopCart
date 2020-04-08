import * as React from 'react';

import './CourseMetaContainer.scss';

const dataProps = [
    {
        title: 'What is the Industry renaissance',
        content: `This is a transformation in which virtual worlds on virtual experience platforms map,
             extend and improve the real world, enabling humanity for the first time to simultaneously
             imagine, model, engineer and control entirely new environments.`,
        thumbnail: './static/img/demo_course1.jpg',
    },
    {
        title: 'Discover the Digital Factory',
        content: `The digital factory provides a set of tools and methods to cope 
        with the challenges the industrial companies are facing today due to growing
         complexity in their productions and supply chains. 
            `,
        thumbnail: './static/img/demo_course2.jpg',
    },
    {
        title: 'Discover Additive Manufacturing',
        content: `Discover the basics of additive manufacturing and new world of
         Design possibilities emerging in the industries.
            `,
        thumbnail: './static/img/demo_course3.png',
    },
];

export default class CourseMetaContainer extends React.Component {
    render() {
        const { setCourseMetaRef, voucherLink } = this.props;

        return (
            <div
                className="course-meta-container"
                ref={(ref) => setCourseMetaRef(ref)}
            >
                {dataProps.map((item, index) => {
                    return (
                        <div
                            className="meta-item-container"
                            key={`course-meta-item-${index}`}
                        >
                            <div className="item-title">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="item-body">
                                <div className="content">
                                    <p>{item.content}</p>
                                </div>
                                <div className="thumbnail">
                                    <img
                                        onClick={() => {
                                            window.open(voucherLink, '_blank');
                                        }}
                                        alt={item.title}
                                        src={item.thumbnail}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
