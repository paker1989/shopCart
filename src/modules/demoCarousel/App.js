import cx from 'classnames';
import React from "react";
import './main.scss';


const data = [
    { source: './static/img/cls_banner.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
    { source: './static/img/cls_banner2.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
    { source: './static/img/demo2.png', },
    { source: './static/img/demo3.jpg' },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
        this.timer = null;
    }

    componentDidMount() {
        this.setTimer();
    }

    setTimer = () => {
        if (!this.timer) {
            console.log('set timer');
            this.timer = setInterval(() => {
                this.navCompo(1)
            }, 3000);
        }
    }

    clearTimer = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    navCompo = (next) => {
        const maxIndex = data.length - 1;
        const { selectedIndex } = this.state;

        this.clearTimer();

        switch (next) {
            case -1:
                this.setState({
                    selectedIndex: selectedIndex === 0 ? maxIndex : selectedIndex - 1
                }, this.setTimer);
                return;
            case 1:
                this.setState({
                    selectedIndex: selectedIndex === maxIndex ? 0 : selectedIndex + 1
                }, this.setTimer);
                return;
        }
    }

    render() {
        const { selectedIndex } = this.state;
        return (
            <div className="app-container">
                <img className="arrow is-left" src="./static/svg/arrow.png"
                    onClick={() => {
                        this.navCompo(-1);
                    }}>
                </img>
                <img className="arrow is-right" src="./static/svg/arrow.png"
                    onClick={() => {
                        this.navCompo(1);
                    }}></img>
                <ol className="indicator-container">
                    {data.map((item, index) => {
                        let indicatorClass = cx({
                            ['indicator']: true,
                            ['active']: index === selectedIndex
                        });
                        return (<li className={indicatorClass} key={`indicator-${index}`}
                            onClick={() => {
                                this.setState({ selectedIndex: index })
                            }}
                        ></li>);
                    })}
                </ol>
                <div className="image-swiper">
                    {data.map((item, index) => {
                        let style = {
                            transform: `translate(-${100 * selectedIndex}%)`
                        }
                        return (
                            <div className="component-container" key={`component-${index}`} style={style}>
                                <img src={item.source} onClick={() => {
                                    if (item.link) {
                                        window.open(item.link, '_blank');
                                    } else {
                                        return;
                                    }
                                }}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default App;
