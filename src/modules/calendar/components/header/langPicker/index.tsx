import * as React from 'react';
import { locales, localProps } from '../../../utils/i18nProvider';

import Popover from '../../../../../_packages_/components/popover';

import './langPicker.scss';

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
            <div className="header-langPicker-container">
                <Popover
                    position={Popover.Placement.autoBottomMiddle}
                    verCushion={5}
                    isVisible={isVisible}
                    onVisibleChange={this.onVisibleChange}
                >
                    <Popover.Trigger.ClickTrigger>
                        <div
                            role="button"
                            className="btn header-langPicker-container__trigger"
                        >
                            <span>
                                {
                                    locales.find(
                                        local => local.code === localProps
                                    ).label
                                }
                            </span>
                            {/* <svg
                                className="ali-icon is-grey"
                                aria-hidden="true"
                            >
                                <use xlinkHref="#icon-dropdown" />
                            </svg> */}
                        </div>
                    </Popover.Trigger.ClickTrigger>
                    <Popover.Content></Popover.Content>
                </Popover>
            </div>
        );
    }
}
