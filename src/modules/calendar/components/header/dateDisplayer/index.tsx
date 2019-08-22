import * as React from 'react'
import './dateDisplayer.scss'

const _test_month_Display = '2019年8月'
const _test_chinese_month_Display = '农历七月 ~ 八月'

export default class DateDisplayer extends React.Component<any, any> {
    render() {
        return (
            <div className="header-dateDisplayer-container">
                <div className="header-dateDisplayer-container__left">
                    <div
                        role="button"
                        arial-label="today"
                        className="btn header-dateDisplayer-container__today"
                    >
                        <span>今天</span>
                    </div>
                    <div className="header-dateDisplayer-container__dateSwitch">
                        <div className="header-dateDisplayer-container__monthArrow">
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-left" />
                            </svg>
                            <svg className="ali-icon" aria-hidden="true">
                                <use xlinkHref="#icon-right" />
                            </svg>
                        </div>
                        <div className="header-dateDisplayer-container__monthDisplay">
                            <div className="header-dateDisplayer-container__monthDisplay-text">
                                {_test_month_Display}
                            </div>
                            <div className="font-subtitle">{_test_chinese_month_Display}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
