function saveLocation(name, lat, lon) {
  const recentLocation = {
    name,
    latitude: lat,
    longitude: lon,
  };

  localStorage.setItem('recent location', JSON.stringify(recentLocation));
}

function loadLocation() {
  const recentLocation = JSON.parse(localStorage.getItem('recent location'));

  return [
    recentLocation.name,
    recentLocation.latitude,
    recentLocation.longitude,
  ];
}

function setLocationName(data) {
  const locationArray = [data.name, data.state, data.country];
  const filteredArray = locationArray.filter((item) => item !== undefined);
  return filteredArray.join(', ');
}

export { saveLocation, loadLocation, setLocationName };
