function saveLocation(name, lat, lon) {
  const recentLocation = {
    name,
    latitude: lat,
    longitude: lon,
  };

  // prevent saving when searched location matches location in local storage
  if (
    localStorage.getItem('recent location') !== JSON.stringify(recentLocation)
  ) {
    localStorage.setItem('recent location', JSON.stringify(recentLocation));
  }
}

function loadLocation() {
  const recentLocation = JSON.parse(localStorage.getItem('recent location'));

  return [
    recentLocation.name,
    recentLocation.latitude,
    recentLocation.longitude,
  ];
}

function createLocationString(source) {
  const locationArray = [source.name, source.state, source.country];
  const filteredArray = locationArray.filter((item) => item !== undefined);
  return filteredArray.join(', ');
}

export { saveLocation, loadLocation, createLocationString };
