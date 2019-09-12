import * as React from 'react';

class googlePlaceAPIManager extends React.PureComponent {
    componentDidMount() {
        if (window.GoogleAutocompleteService) {
            return;
        }
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5ICkjtw0AptNFUp2Cps7x1nRuKBDsaSc&libraries=places&callback=initGoogleService';
        document.body.appendChild(script);
    }

    render() {
        return null;
    }
}

export default googlePlaceAPIManager;
