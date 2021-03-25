const getUserLocation = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.longitude, position.coords.latitude);
  });
};

const API = '';
const searchInput = document.getElementById('location-search');

const convertToCoordinates = () => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=10&appid=${API}`,
    { mode: 'cors' }
  )
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Search field cannot be blank.');
      }
      console.log(response);
      return response.json();
    })
    .then((locations) => {
      if (locations.length === 0) {
        throw new Error('Unable to find location.');
      }
      console.log(locations);
      return locations[0];
    })
    .catch((reason) => {
      console.error(reason);
    });
};

const getWeatherData = (latCoord, lonCoord) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely&units=imperial&appid=${API}`
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
    });
};

export { convertToCoordinates, getWeatherData };
