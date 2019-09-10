import * as React from 'react';
import { func } from 'prop-types';

class googlePlaceAPIManager extends React.PureComponent {
    componentDidMount() {
        if (window.GoogleAutocompleteService) {
            return;
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyAoiamadv0o9BtUB2TT_sB_K1diM_VozFE&libraries=places&callback=initGoogleService';
        document.body.appendChild(script);
    }

    render() {
        return null;
    }
}

export default googlePlaceAPIManager;
