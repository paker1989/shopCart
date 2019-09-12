import * as React from 'react';

import CalInput from '../../../../../common/calInput';
import Popover from '../../../../../../../../_packages_/components/popover';

import './addressPicker.scss';

const _test_add_location_placeholder = '添加一个有意思的地点';

export interface IAddressPickerState {
    isVisible: boolean;
    value: string;
    predictions: any[];
}
class AddressPicker extends React.Component<any, IAddressPickerState> {
    constructor(props) {
        super(props);
        this.state = { isVisible: false, value: '', predictions: [] };
    }

    onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = this.state;
        const newVal = evt.target.value;
        if (newVal !== value) {
            if (newVal.trim().length === 0) {
                this.setState({ value: newVal, predictions: [] });
            } else {
                const googleService = (window as any).GoogleAutocompleteService;
                if (googleService) {
                    googleService.getQueryPredictions(
                        { input: newVal },
                        (predictions, status) => {
                            if (
                                status !=
                                google.maps.places.PlacesServiceStatus.OK
                            ) {
                                console.log(status);
                                if (status === 'ZERO_RESULTS') {
                                    this.setState({
                                        value: newVal,
                                        predictions: [],
                                    });
                                }
                                return;
                            }
                            this.setState({ value: newVal, predictions });
                        }
                    );
                }
            }
        }
    };

    onVisibleChange = (isVisible: boolean): void => {
        this.setState({ isVisible });
    };

    render() {
        const { isVisible, value, predictions } = this.state;
        return (
            <Popover
                wrapperClassName="address-picker-container"
                position={Popover.Placement.autoBottomLeft}
                verCushion={-5}
                isVisible={isVisible}
                onVisibleChange={this.onVisibleChange}
            >
                <Popover.Trigger.ClickTrigger>
                    <div className="address-picker-container__inputWrapper">
                        <CalInput
                            value={value}
                            className="calActivity-definer-container__input"
                            placeholder={_test_add_location_placeholder}
                            onChange={this.onChange}
                        />
                    </div>
                </Popover.Trigger.ClickTrigger>
                <Popover.Content>
                    <div>
                        {predictions.map((item, index) => (
                            <div key={`prediction-${index}`}>
                                {item.description}
                            </div>
                        ))}
                    </div>
                </Popover.Content>
            </Popover>
        );
    }
}

export default AddressPicker;
