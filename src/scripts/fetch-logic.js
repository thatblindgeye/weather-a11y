import { renderError, renderMainDisplay, renderLoading } from './render-DOM';
import {
  saveLocation,
  loadLocation,
  createLocationString,
} from './location-utilities';

const API_KEY = '13aa14e68e00ac80cb7c634dc1194d83';

async function convertInputToCoordinates() {
  const searchInput = document.getElementById('location-search');
  if (!searchInput.value) {
    throw new Error('Search field cannot be blank.');
  }

  const searchResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=10&appid=${API_KEY}`,
    { mode: 'cors' }
  );

  const coordinateData = await searchResponse.json();
  if (coordinateData.length === 0 || coordinateData.cod === '404') {
    throw new Error(`Location "${searchInput.value}" not found.`);
  } else if (coordinateData.length > 1) {
    console.log(coordinateData);
    const selectedLocation = prompt('choose');
    return coordinateData[selectedLocation];
  }

  searchInput.value = '';
  return coordinateData[0];
}

const geolocationOptions = {
  timeout: 15000,
  enableHighAccuracy: true,
};

const getUserGeolocation = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      geolocationOptions
    );
  });
};

async function getWeatherData(e) {
  const units = localStorage.getItem('units');
  let coordinateResponse;
  let locationName;
  let latitude;
  let longitude;

  try {
    if (e.type === 'load') {
      [locationName, latitude, longitude] = loadLocation();
    } else if (e.type === 'submit') {
      coordinateResponse = await convertInputToCoordinates();
      locationName = createLocationString(coordinateResponse);
      latitude = coordinateResponse.lat;
      longitude = coordinateResponse.lon;
    } else {
      coordinateResponse = await getUserGeolocation();
      locationName = 'Current Location';
      latitude = coordinateResponse.coords.latitude;
      longitude = coordinateResponse.coords.longitude;
    }
    saveLocation(locationName, latitude, longitude);
    renderLoading();

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=${units}&appid=${API_KEY}`
    );

    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    renderMainDisplay(locationName, weatherData);
  } catch (error) {
    renderError(error.message);
  }
}

export default getWeatherData;
