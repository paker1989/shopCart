import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Popover from '../../../../../_packages_/components/popover';
import LayoutPickerContent from './content';

import './layoutPicker.scss';

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
                    verCushion={5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn header-layoutPicker-container__trigger"
                        >
                            <span>
                                <FormattedMessage id="cal.month" />
                            </span>
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
