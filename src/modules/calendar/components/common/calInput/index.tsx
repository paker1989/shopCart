import * as React from 'react';
import cx from 'classnames';

import './calInput.scss';

const _test_default_placeholder = '无标题';

export interface ICalInputProps {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
class CalInput extends React.Component<ICalInputProps, any> {
    static defaultProps = {
        placeholder: _test_default_placeholder,
        value: '',
        onChange: (evt: React.ChangeEvent<HTMLInputElement>) => {},
    };

    inputRef: React.RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);
        this.state = { isFocus: false };
        this.inputRef = React.createRef();
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

        return (
            <div className={wrapperClass}>
                <input
                    ref={this.inputRef}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
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
