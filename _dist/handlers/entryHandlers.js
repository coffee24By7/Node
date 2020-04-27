/*
 Entry Handler
 Bypass the issue with Wes' code for autocomplete and others
*/
exports.autocomplete = function (input, latInput, lngInput) {
    // log the input parms as a checker only
    console.log("Called Autocomplete", input, lngInput, latInput);
    if (!input)
        return; // skip this fn from running if there is not input on the page
    // `https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=${address}&lat=${lat}&lng=${lng}&key=${process.env.MAP_KEY}`
    var dropdown = new google.maps.places.Autocomplete(input);
    dropdown.addListener('place_changed', function () {
        var place = dropdown.getPlace();
        if (place.length == 0) {
            return;
        }
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
        console.log(place);
    });
    // if someone hits enter on the address field, don't submit the form
    input.on('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            console.log("Prevented enter key from advancing");
        }
    });
};
var entryHandler = require('../handlers/entryHandlers');
entryHandler.autocomplete(res.address, res.location.lat, res.location.lng);
