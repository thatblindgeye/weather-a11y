import renderForecastDisplays from './render-weather';
import {
  saveLocation,
  loadLocation,
  createLocationString,
} from './location-utilities';

// remove errors and results only when they are in the DOM
function clearDynamicContainers() {
  const errorContainer = document.querySelector('.search-error-container');
  const resultsContainer = document.querySelector('.search-results-container');

  if (errorContainer) {
    errorContainer.remove();
  }

  if (resultsContainer) {
    resultsContainer.remove();
  }
}

function renderError(message) {
  const range = document.createRange();

  const errorContainer = `<div class="search-error-container">${message}</div>`;

  const errorFragment = range.createContextualFragment(errorContainer);
  document
    .querySelector('.search-container')
    .insertBefore(
      errorFragment,
      document.querySelector('label[for="location-search"]')
    );
}

const searchInput = document.getElementById('location-search');
// if search returns >1 location from the API, creates a list of results
function renderSearchResults(results) {
  const range = document.createRange();

  const resultsContainer = `<div class='search-results-container'></div>`;
  const containerFragment = range.createContextualFragment(resultsContainer);

  const resultsAmount = `
    <div class='results-amount' role='status'>
      ${results.length} results for "${searchInput.value}":
    </div>
  `;
  const resultsFragment = range.createContextualFragment(resultsAmount);

  const list = document.createElement('ul');
  list.className = 'results-list';
  list.setAttribute('aria-label', `results for ${searchInput.value}`);

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

  document
    .querySelector('.search-container')
    .insertBefore(
      containerFragment,
      document.querySelector('label[for="location-search"]')
    );

  document
    .querySelector('.search-results-container')
    .append(resultsFragment, list);
}

function getResultData() {
  const resultsContainer = document.querySelector('.search-results-container');

  return new Promise((resolve) => {
    const promiseFunction = (e) => {
      if (e.target.classList.contains('result-item')) {
        resultsContainer.removeEventListener('click', promiseFunction);
        resolve(e.target.dataset.index);
        clearDynamicContainers();
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
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=10&appid=${API_KEY}`,
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
  clearDynamicContainers();

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
