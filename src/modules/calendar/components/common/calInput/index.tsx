import * as React from 'react';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import './calInput.scss';

const _test_default_placeholder = '无标题';

export interface ICalInputProps {
    className?: string;
    placeholder?: string;
    value?: string;
    delay?: number;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
class CalInput extends React.Component<ICalInputProps, any> {
    static defaultProps = {
        placeholder: _test_default_placeholder,
        value: '',
        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {},
    };

    inputRef: React.RefObject<HTMLInputElement>;
    debouncedOnChange

    constructor(props) {
        super(props);
        const { onChange, delay } = this.props;
        if (onChange !== undefined && delay !== undefined) {
            console.log('debounce');
            this.handleChange = debounce(this.handleChange.bind(this), delay); 
        }
        this.state = { isFocus: false };
        this.inputRef = React.createRef();
    }
    
    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
       const { onChange } = this.props;
       onChange && onChange(evt);
    }

    // handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    //     //  todo
    // };

    render() {
        const { placeholder, value, className, onChange } = this.props;
        const { isFocus } = this.state;
        const wrapperClass = cx(
            {
                ['calInput-container']: true,
                ['is-focus']: isFocus,
            },
            className
        );

        // console.log(throttle);
        return (
            <div className={wrapperClass}>
                <input
                    ref={this.inputRef}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleChange}
                    onFocus={() => {
                        this.setState({ isFocus: true });
                    }}
                    onBlur={() => {
                        this.setState({ isFocus: false });
                    }}
                />
                <div className="expand-border"></div>
                <div className="grey-border"></div>
            </div>
        );
    }
}

export default CalInput;
