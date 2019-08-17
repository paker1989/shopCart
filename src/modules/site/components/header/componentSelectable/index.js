import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import { getFullPath } from '../../../utils/addRoute';
import './component_selectable.scss';

class ComponentSelectable extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isVisible && prevProps.isVisible !== this.props.isVisible) {
            this.adjustScrollPosition();
        }
    }

    /**
     * @description always show active index
     */
    adjustScrollPosition() {
        const { activeIndex, matches } = this.props;

        if (activeIndex === -1 || !this.ref || !matches.length) {
            return;
        }

        const refDOM = ReactDOM.findDOMNode(this.ref.current);

        let { scrollHeight, clientHeight, scrollTop } = refDOM,
            activeItemHeight = scrollHeight / matches.length,
            heightRequired = (activeItemHeight * (activeIndex + 1)),
            heightContainer = clientHeight + scrollTop,
            isActiveItemVisible = heightRequired <= heightContainer;

        if (!isActiveItemVisible) {
            // console.log('scroll to');
            refDOM.scrollTo(0, (heightRequired - clientHeight));
        }
    }

    render() {
        const { match, matches, activeIndex } = this.props;
        let content;

        if (!matches || matches.length === 0) {
            content = (
                <div className="no_matches">没有符合的组件</div>
            );
        } else {
            content = (
                <ul>
                    {matches.map((item, index) => {
                        let itemClass = cx({
                            ['list_item']: true,
                            ['is-active']: index == activeIndex
                        })
                        return (
                            <li key={`match_item-${index}`} className={itemClass}>
                                <NavLink to={getFullPath(match, item.path)}>
                                    <span className="item_title">{item.title}</span>
                                    <span className="item_sub_title">{item.subtitle}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            );
        }
        return (
            <div className="component_selectable-wrapper" ref={this.ref}>
                {content}
            </div>
        );
    }
}

export default ComponentSelectable;