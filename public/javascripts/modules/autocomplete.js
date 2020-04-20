function autocomplete(input, latInput, lngInput) {
  console.log("Called Autocomplete");
  if(!input) return; // skip this fn from running if there is not input on the page
  const dropdown = new google.maps.places.Autocomplete(input);
  
  dropdown.addListener('place_changed', () => {
    var place = dropdown.getPlace();
    if (place.length == 0) {
      return;
    }
    latInput.value = place.geometry.location.lat();
    console.log("Lattitude ");
    console.log(place.geometry.location.lat());
    lngInput.value = place.geometry.location.lng();
    console.log("Longitute ");
    console.log(place.geometry.location.lng());
    console.log(place);
  });
  // if someone hits enter on the address field, don't submit the form
  input.on('keydown', (e) => {
    if (e.keyCode === 13) e.preventDefault();
  });
}

export default autocomplete;
