import * as React from 'react';

import Popover from '../../../../../_packages_/components/popover';
import LayoutPickerContent from './content';

import './layoutPicker.scss';

const _test_selected_value = '月';

export default class LayoutPicker extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }

    onVisibleChange = (isVisible: boolean): void => {
        this.setState({ isVisible });
    };

    render() {
        const { isVisible } = this.state;

        return (
            <div className="header-layoutPicker-container">
                <Popover
                    position={Popover.Placement.autoBottomMiddle}
                    // horCushion={5}
                    verCushion={5}
                    // cushion={5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn header-layoutPicker-container__trigger"
                        >
                            <span>{_test_selected_value}</span>
                            <svg
                                className="ali-icon is-grey"
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon-dropdown" />
                            </svg>
                        </div>
                    </Popover.Trigger.ClickTrigger>
                    <Popover.Content>
                        <LayoutPickerContent />
                    </Popover.Content>
                </Popover>
            </div>
        );
    }
}
