import cx from 'classnames';
import React from 'react';
import DynamicBanner from './component/DynamicBanner/dymanicBanner';
import './main.scss';

const data = [
    // { source: './static/img/cls_banner.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
    // { source: './static/img/cls_banner2.png', link: 'https://companion.3ds.com/CompanionManager/ui/#/' },
    // { source: './static/img/demo2.png', },
    // {
    //     source: './static/img/demo4.png',
    //     link: `
    //     https://learningspace.3ds.com/CompanionManager/up/?&lang=en&lpId=472&cls_aud=s&utm_source=4482_2_5&utm_medium=onl_lpt&utm_campaign=P472&rc_Type=5&authVersion=1&/index.html/#/lp-content
    //     `,
    // },
    // {
    //     source: './static/img/business-invo.png',
    //     link: `
    //     https://learningspace.3ds.com/CompanionManager/up/?&lang=en&lpId=471&cls_aud=s&utm_source=2_13_27&utm_medium=onl_lpt&utm_campaign=P471&rc_Type=5&authVersion=1&/index.html/#/lp-content
    //     `,
    // },
    {
        source: './static/img/business-invo.png',
        link: `
        https://learningspace.3ds.com/CompanionManager/up/?&lang=en&lpId=471&cls_aud=s&utm_source=2_13_27&utm_medium=onl_lpt&utm_campaign=P471&rc_Type=5&authVersion=1&/index.html/#/lp-content
        `,
        dynamic: true,
    },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
        this.timer = null;
    }

    componentDidMount() {
        this.setTimer();
    }

    setTimer = () => {
        if (!this.timer) {
            console.log('set timer');
            this.timer = setInterval(() => {
                this.navCompo(1);
            }, 3000);
        }
    };

    clearTimer = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };

    navCompo = next => {
        const maxIndex = data.length - 1;
        const { selectedIndex } = this.state;

        this.clearTimer();

        switch (next) {
            case -1:
                this.setState(
                    {
                        selectedIndex:
                            selectedIndex === 0 ? maxIndex : selectedIndex - 1,
                    },
                    this.setTimer
                );
                return;
            case 1:
                this.setState(
                    {
                        selectedIndex:
                            selectedIndex === maxIndex ? 0 : selectedIndex + 1,
                    },
                    this.setTimer
                );
                return;
        }
    };

    render() {
        const { selectedIndex } = this.state;
        return (
            <div className="app-container">
                {data.length > 1 && (
                    <img
                        className="arrow is-left"
                        src="./static/svg/arrow.png"
                        onClick={() => {
                            this.navCompo(-1);
                        }}
                    ></img>
                )}
                {data.length > 1 && (
                    <img
                        className="arrow is-right"
                        src="./static/svg/arrow.png"
                        onClick={() => {
                            this.navCompo(1);
                        }}
                    ></img>
                )}

                {data.length > 1 && (
                    <ol className="indicator-container">
                        {data.map((item, index) => {
                            let indicatorClass = cx({
                                ['indicator']: true,
                                ['active']: index === selectedIndex,
                            });
                            return (
                                <li
                                    className={indicatorClass}
                                    key={`indicator-${index}`}
                                    onClick={() => {
                                        this.setState({ selectedIndex: index });
                                    }}
                                ></li>
                            );
                        })}
                    </ol>
                )}
                <div className="image-swiper">
                    {data.map((item, index) => {
                        let style = {
                            transform: `translate(-${100 * selectedIndex}%)`,
                        };
                        if (item.dynamic) {
                            return (
                                <DynamicBanner
                                    pageLink={item.source}
                                    sourceLink={item.link}
                                    key={`component-${index}`}
                                />
                            );
                        } else {
                            return (
                                <div
                                    className="component-container"
                                    key={`component-${index}`}
                                    style={style}
                                >
                                    <img
                                        src={item.source}
                                        onClick={() => {
                                            if (item.link) {
                                                window.open(
                                                    item.link,
                                                    '_blank'
                                                );
                                            } else {
                                                return;
                                            }
                                        }}
                                    ></img>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

export default App;
