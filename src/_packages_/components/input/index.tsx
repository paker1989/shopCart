import * as React from 'react';
// import PropTypes from 'prop-types';
import cx from 'classnames';

import './input.scss';
import Textarea from './textarea';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import getWidth from '../../utils/getWidth';

export interface IInputChangeEvent {
    target: IInputProps;
    preventDefault(): void;
    stopPropagation(): void;
    fromClearButton: boolean;
}

export interface IInputProps {
    className?: string;
    prefix?: string;
    type?: string;
    placeholder?: string,
    disabled?: boolean,
    readOnly?: boolean,
    value?: any,
    defaultValue?: any,
    addonBefore?: React.ReactNode,
    addonAfter?: React.ReactNode,
    onPressEnter?: (evt: any) => void,
    onKeyDown?: (evt: any) => void;
    showCount?: boolean,
    showClear?: boolean,
    autoSize?: boolean,
    onChange?: (e: IInputChangeEvent | React.ChangeEvent<HTMLInputElement>) => void,
    autoFocus?: boolean,
    initSelectionStart?: number,
    initSelectionEnd?: number,
    autoSelect?: boolean,
    width?: number | string,
}

class Input extends React.Component<IInputProps, any> {

    input: HTMLInputElement | HTMLTextAreaElement;

    static defaultProps = {
        disabled: false,
        readOnly: false,
        prefix: 'bxu',
        type: 'text',
        autoFocus: false,
        autoSelect: false,
        showClear: false,
    }

    componentDidMount() {
        const { autoFocus,
            autoSelect,
            initSelectionStart,
            initSelectionEnd
        } = this.props;
        if (autoFocus) {
            this.input.focus();
        }
        if (autoSelect) {
            this.input.setSelectionRange(initSelectionStart, initSelectionEnd);
        }
    }

    clearInput = (e) => {
        const { onChange } = this.props;

        isFunction(onChange) && (
            onChange({
                target: {
                    ...this.props,
                    value: '',
                },
                preventDefault: () => e.preventDefault(),
                stopPropagation: () => e.stopPropagation(),
                fromClearButton: true
            })
        );
    }

    retainInputFocus = evt => {
        evt.preventDefault();
    };

    handleKeyDown = evt => {
        const keyCode = evt.code || evt.keyCode,
            { onPressEnter, onKeyDown } = this.props;
        if (keyCode && keyCode === 13 && onPressEnter) {
            onPressEnter(evt);
        } else if (onKeyDown) {
            onKeyDown(evt);
        }
    }

    render() {
        const {
            type,
            className,
            readOnly,
            disabled,
            onChange,
            prefix,
            width,
            showClear,
            addonBefore,
            addonAfter,
            value,
        } = this.props;

        const isEditable = !(readOnly || disabled);
        const wrapperClass = cx({
            [`${prefix}-input-wrapper`]: true,
            [`${prefix}-input-wrapper_not-editable`]: !isEditable,
        },
            className
        );
        const wrapperStyle = getWidth(width);
        const inputProps = omit(this.props, [
            'className',
            'inputClass',
            'width',
            'addonBefore',
            'addonAfter',
            'onPressEnter',
            'showClear',
            'autoSelect',
            'initSelectionStart',
            'initSelectionEnd',
        ])

        if (type.toLowerCase() === 'textarea') {
            return (<Textarea className={wrapperClass}
                wrapperStyle={wrapperStyle}
                handleKeyDown={this.handleKeyDown}
                inputRef={this}
                {...inputProps} />);
        }

        return (
            <div className={wrapperClass} style={wrapperStyle}>
                {addonBefore && (
                    <span className={`${prefix}-input-addon-before`}>{addonBefore}</span>
                )}
                <input
                    ref={input => { this.input = input }}
                    className={`${prefix}-input`}
                    value={value}
                    onKeyDown={this.handleKeyDown}
                    {...inputProps} />
                {isFunction(onChange) && value && showClear && (
                    <span className="clear-icon"
                        onClick={this.clearInput}
                        onMouseDown={this.retainInputFocus}>
                        {/* <FontAwesomeIcon icon="times-circle" /> */}
                        <svg className="ali-icon grey" aria-hidden="true">
                            <use xlinkHref="#icon-49shurushanchu-2"></use>
                        </svg>
                    </span>
                )}
                {addonAfter && (
                    <span className={`${prefix}-input-addon-after`}>{addonAfter}</span>
                )}
            </div>
        );
    }
}

export default Input;