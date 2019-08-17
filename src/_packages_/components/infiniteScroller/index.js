
import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import isFunction from 'lodash/isFunction';
import './infiniteScroller.scss';

class InfiniteScroller extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        prefix: PropTypes.string,
        hasMore: PropTypes.bool,
        loadMore: PropTypes.func,
        initialLoad: PropTypes.bool,
        useWindow: PropTypes.bool,
        useCapture: PropTypes.bool,
        loader: PropTypes.node,
        offset: PropTypes.number,
    }

    static defaultProps = {
        prefix: 'bxu',
        hasMore: true,
        initialLoad: true,
        useWindow: true,
        useCapture: false,
        offset: 20,
    }

    constructor(props) {
        super(props);
        this.state = ({ loading: false });
    }

    componentDidMount() {
        const {
            initialLoad,
            useWindow,
            useCapture,
            hasMore,
        } = this.props;

        this.el = useWindow ? window : this.scroller;

        ['scroll', 'resize'].forEach(event => {
            this.el.addEventListener(event, this.handleScroll, useCapture);
        })

        if (initialLoad && hasMore) {
            this.handleScroll();
        }
    }

    componentWillUnmount() {
        const { useCapture } = this.props;

        ['scroll', 'resize'].forEach(event => {
            this.el.removeEventListener(event, this.handleScroll, !!useCapture);
        })
    }

    getAbsoluteOffsetTop = (el) => {
        let offsetParent = el.offsetParent,
            result = el.offsetTop;
        while (offsetParent) {
            result += offsetParent.scrollTop;
            offsetParent = offsetParent.offsetParent;
        }
        return result;
    }

    isOffsetBottom() {
        const { useWindow, offset } = this.props;
        const { scrollHeight, clientHeight, scrollTop } = this.scroller;

        if (useWindow) {
            const scrollerAbsoluteTop = this.getAbsoluteOffsetTop(this.scroller);
            const windowScrollTop = window.pageYOffset !== undefined
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body)
                    .scrollTop;

            return scrollerAbsoluteTop + this.scroller.offsetHeight
                - windowScrollTop - window.innerHeight <= offset;
        } else {
            return scrollHeight - clientHeight - scrollTop <= offset;
        }
    }

    closeLoading = () => {
        this.setState({ loading: false });
    }

    handleScroll = throttle(() => {
        const { hasMore, loadMore } = this.props,
            { loading } = this.state;

        if (!hasMore || !this.isOffsetBottom() || !loadMore
            || !isFunction(loadMore) || loading)
            return;
        this.setState({ loading: true });

        const maybePromise = loadMore(this.closeLoading);
        if (maybePromise && isFunction(maybePromise.then)) {
            maybePromise
                .then(this.closeLoading)
                .catch(this.closeLoading);
        }
    })

    render() {
        const {
            className,
            prefix,
            children,
            hasMore,
            loader,
            useWindow,
        } = this.props,
            { loading } = this.state;

        const wrapperClass = cx({
            [`${prefix}-infinite-scroller-container`]: true,
            [`${prefix}-infinite-scroller-y`]: !useWindow,
        }, className);

        return (
            <div ref={scroller => this.scroller = scroller} className={wrapperClass}>
                {children}
                {hasMore && loading && loader}
            </div>
        );
    }
}


export default InfiniteScroller;