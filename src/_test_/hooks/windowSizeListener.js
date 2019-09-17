import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';

// 传统写法
class App extends React.Component {
    constructor(props) {
        super(props);
        const windowWidth = window.innerWidth;

        this.state = { windowWidth };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        const windowWidth = window.innerWidth;
        this.setState({ windowWidth });
    }

    render() {
        const { windowWidth } = this.state;
        return (<div>{windowWidth}</div>);
    }
}

function getSize() {
    return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    };
}

//hook 写法
const useWindowResize = () => {
    let [windowSize, setWindowSize] = useState(getSize());

    useEffect(() => {
        window.addEventListener('resize', this.handleResize);
        return () => { window.removeEventListener('resize', this.handleResize) };
    }, []);

    handleResize = () => {
        setWindowSize(getSize());
    }
    return windowSize;
}