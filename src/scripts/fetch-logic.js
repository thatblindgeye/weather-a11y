import renderForecastDisplays from './render-weather';
import {
  saveLocation,
  loadLocation,
  createLocationString,
} from './location-utilities';

const errorContainer = document.querySelector('.search-error-container');
function renderError(message) {
  errorContainer.textContent = message;
  errorContainer.classList.add('visible');
}

function clearError() {
  errorContainer.textContent = '';
  errorContainer.classList.remove('visible');
}

const resultsContainer = document.querySelector('.search-results-container');
const searchInput = document.getElementById('location-search');

// if search returns more than one location from the API
function renderSearchResults(results) {
  const range = document.createRange();

  const resultsAmount = `
    <div class='results-amount' aria-role='status'>
      ${results.length} results for "${searchInput.value}":
    </div>
  `;
  const resultsFragment = range.createContextualFragment(resultsAmount);

  const list = document.createElement('ul');
  list.className = 'results-list';

  for (let i = 0; i < results.length; i++) {
    const item = `
    <li>
      <a href='#' class='result-item animated' data-index='${i}'>
        ${createLocationString(results[i])}
      </a>
    </li>
    `;

    const itemFragment = range.createContextualFragment(item);
    list.appendChild(itemFragment);
  }
  resultsContainer.append(resultsFragment, list);
  resultsContainer.classList.add('visible');
}

function clearSearchResults() {
  while (resultsContainer.lastChild) {
    resultsContainer.removeChild(resultsContainer.lastChild);
  }
  resultsContainer.classList.remove('visible');
}

function getResultData() {
  return new Promise((resolve) => {
    const promiseFunction = (e) => {
      if (e.target.className === 'result-item') {
        resultsContainer.removeEventListener('click', promiseFunction);
        resolve(e.target.dataset.index);
        clearSearchResults();
      }
    };
    resultsContainer.addEventListener('click', promiseFunction);
  });
}

const API_KEY = '13aa14e68e00ac80cb7c634dc1194d83';

async function convertInputToCoordinates() {
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
    renderSearchResults(coordinateData);
    const selectedItem = await getResultData();
    return coordinateData[selectedItem];
  }
  return coordinateData[0];
}

const geolocationOptions = {
  timeout: 15000,
  enableHighAccuracy: true,
};

function getUserGeolocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      geolocationOptions
    );
  });
}

async function getWeatherData(e) {
  clearError();
  clearSearchResults();

  const units = localStorage.getItem('units');
  let coordinateResponse;
  let locationName;
  let latitude;
  let longitude;

  try {
    if (e.type === 'load' || e.target === document.getElementById('unit-btn')) {
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
    searchInput.value = '';
    saveLocation(locationName, latitude, longitude);
    document.getElementById('forecast-header').textContent = 'Loading...';

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=${units}&appid=${API_KEY}`
    );
    const weatherData = await weatherResponse.json();
    renderForecastDisplays(locationName, weatherData);
  } catch (error) {
    renderError(error.message);
  }
}

export default getWeatherData;
