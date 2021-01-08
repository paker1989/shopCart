import * as React from 'react';
// const config = require('../../../../../local.config');

class googlePlaceAPIManager extends React.PureComponent {
    componentDidMount() {
        if (window.GoogleAutocompleteService) {
            return;
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        // script.src = `https://maps.googleapis.com/maps/api/js?key=${config.placeAPIKey}&libraries=places&callback=initGoogleService`;
        document.body.appendChild(script);
    }

    render() {
        return null;
    }
}

export default googlePlaceAPIManager;
