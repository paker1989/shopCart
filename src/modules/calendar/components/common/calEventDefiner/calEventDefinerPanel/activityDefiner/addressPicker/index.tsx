import * as React from 'react';
import {  injectIntl } from 'react-intl';

import CalInput from '../../../../../common/calInput';
import Popover from '../../../../../../../../_packages_/components/popover';

import './addressPicker.scss';

const _test_predictions = [
    { description: '164 Avenue Victor Hugo, Valence, France' },
    { description: '164 Avenue Victor Hugo, Dijon, France' },
    { description: '164 Avenue Victor Hugo, Clamart, France' },
    { description: '164 Avenue Victor Hugo, Aubervilliers, France' },
    { description: '164 Avenue Victor Hugo, Seyssinet-Pariset, France' },
];

export interface IAddressPickerState {
    isVisible: boolean;
    value: string;
    predictions: any[];
}
class AddressPicker extends React.Component<any, IAddressPickerState> {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            value: '',
            predictions: _test_predictions,
        };
    }

    handlePrediction = (newVal: string) => {
        // test
    };

    // handlePrediction = debounce((newVal: string) => {
    //     console.log('handlePrediction' + newVal);
    //     if (newVal.trim().length === 0) {
    //         this.setState({ predictions: [], isVisible: false });
    //     } else {
    //         const googleService = (window as any).GoogleAutocompleteService;
    //         if (googleService) {
    //             googleService.getQueryPredictions(
    //                 { input: newVal },
    //                 (predictions, status) => {
    //                     if (
    //                         status != google.maps.places.PlacesServiceStatus.OK
    //                     ) {
    //                         console.log(status);
    //                         if (status === 'ZERO_RESULTS') {
    //                             this.setState({
    //                                 value: newVal,
    //                                 predictions: [],
    //                                 isVisible: false,
    //                             });
    //                         }
    //                         return;
    //                     }
    //                     this.setState({ predictions, isVisible: true });
    //                 }
    //             );
    //         }
    //     }
    // }, 300);

    onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = evt.target.value;

        this.setState({ value: newVal });
        this.handlePrediction(newVal);
    };

    onVisibleChange = (isVisible: boolean): void => {
        const { predictions } = this.state;
        this.setState({ isVisible: predictions.length > 0 });
    };

    render() {
        const { isVisible, value, predictions } = this.state;
        const { intl} = this.props;
        return (
            <Popover
                wrapperClassName="address-picker-container"
                position={Popover.Placement.bottomLeft}
                verCushion={-5}
                isVisible={isVisible}
                onVisibleChange={this.onVisibleChange}
                disableEvents={["resize", "scroll"]}
            >
                <Popover.Trigger.ClickTrigger>
                    <div className="address-picker-container__inputWrapper">
                        <CalInput
                            value={value}
                            className="calActivity-definer-container__input"
                            placeholder={intl.formatMessage({id: 'cal.addLocation'})}
                            onChange={this.onChange}
                        />
                    </div>
                </Popover.Trigger.ClickTrigger>
                <Popover.Content>
                    <div className="address-picker-container-predictions">
                        <div className="address-picker-container-predictions__options">
                            {predictions.map((item, index) => (
                                <div
                                    className="item-wrapper"
                                    key={`prediction-${index}`}
                                >
                                    <div className="item-icon">
                                        <span>
                                            <svg
                                                className="ali-icon"
                                                aria-hidden="true"
                                            >
                                                <use xlinkHref="#icon-location-fill"></use>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="item-title font-layout-option">
                                        {item.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Popover.Content>
            </Popover>
        );
    }
}

export default injectIntl(AddressPicker);
