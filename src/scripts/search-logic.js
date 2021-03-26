const API = '13aa14e68e00ac80cb7c634dc1194d83';
const searchInput = document.getElementById('location-search');
let weatherData = null;

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${API}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      console.log(weather);
      weatherData = weather;
      console.log(weatherData);
    });
}

const convertToCoordinates = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=10&appid=${API}`,
    { mode: 'cors' }
  )
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Search field cannot be blank.');
      }
      return response.json();
    })
    .then((locations) => {
      if (locations.length === 0) {
        throw new Error('Unable to find location.');
      }
      console.log(locations);
      return locations[0];
    })
    .then((chosenLocation) => {
      getWeather(chosenLocation.lat, chosenLocation.lon);
    })
    .catch((reason) => {
      console.error(reason);
    });
};

function geolocationSuccess(position) {
  const { latitude, longitude } = position.coords;
  getWeather(latitude, longitude);
}

function geolocationError(error) {
  throw new Error('Unable to find your location.');
}

const geolocationOptions = {
  timeout: 10000,
  enableHighAccuracy: true,
};

const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess,
    geolocationError,
    geolocationOptions
  );
};

export { convertToCoordinates, getUserLocation };
