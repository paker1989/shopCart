import * as React from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import './content.scss';

const _test_layout_options = [
    { title: '日', abbr: 'D', link: '#' },
    { title: '周', abbr: 'W', link: '#' },
    { title: '月', abbr: 'M', link: '#' },
    { title: '年', abbr: 'Y', link: '#' },
    { title: '4天', abbr: 'X', link: '#' },
];

const _test_extra_options = [
    {
        title: '显示周末',
        status: 'enabled',
    },
]; // possible status: disabled, selected, enabled

export default class LayoutPickerContent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layoutPicker-content-container">
                <div className="layoutPicker-content-container-options__main">
                    {_test_layout_options.map((option, index) => (
                        <NavLink
                            to={option.link}
                            key={`layout-option-${index}`}
                        >
                            <div className="item-wrapper">
                                <span className="item-title font-layout-option">
                                    {option.title}
                                </span>
                                <span className="item-title font-layout-option">
                                    {option.abbr}
                                </span>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div className="layoutPicker-content-container-options__extra">
                    {_test_extra_options.map((option, index) => {
                        let optionClass = cx({
                            ['item-wrapper']: true,
                            [`is-${option.status}`]: true,
                        });

                        return (
                            <div
                                className={optionClass}
                                key={`extra-option-${index}`}
                            >
                                <svg className="ali-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-done"></use>
                                </svg>
                                <span className="item-title font-layout-option">
                                    {option.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
