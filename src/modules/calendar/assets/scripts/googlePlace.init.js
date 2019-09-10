/**
 * link:
 *  https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
    https://codeday.me/bug/20180622/183551.html
    https://www.youtube.com/watch?v=lSdM3yZkj1w&t=13s
 */
export function initGoogleService() {
    var service = new google.maps.places.AutocompleteService();

    // var displaySuggestions = function(predictions, status) {
    //     if (status != google.maps.places.PlacesServiceStatus.OK) {
    //         alert(status);
    //         return;
    //     }

    //     predictions.forEach(function(prediction) {
    //         console.log(prediction);
    //     });
    // };
    // service.getQueryPredictions(
    //     { input: '164 avenue victor hugo' },
    //     displaySuggestions
    // );
    window.GoogleAutocompleteService = service;
}
