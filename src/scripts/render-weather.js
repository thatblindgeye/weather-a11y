import expandIcon from '../assets/images/icons/expand_24dp.svg';
import {
  capitalize,
  convertDate,
  createTemperatureString,
  convertWindSpeed,
  createUviString,
} from './DOM-utilities';

const iconURL = 'https://openweathermap.org/img/wn/';
const range = document.createRange();
const timeAttribute = (forecastItem, timezoneData) => {
  return `${convertDate(forecastItem, timezoneData, 'yyyy-MM-dd kk:mm:ss')}`;
};

function clearForecastDisplays() {
  Array.from(document.querySelectorAll('.forecast')).forEach((forecast) => {
    while (forecast.lastChild) {
      forecast.removeChild(forecast.lastChild);
    }
  });
}

const renderCurrentForecast = (forecastData) => {
  const { current, timezone } = forecastData;
  const currentForecastContainer = document.createElement('div');

  const alerts = [
    {
      event: 'Heat Advisory',
      description: `...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.`,
    },
  ];

  if (alerts) {
    const alert = `
    <div id='alert-container'>
      <div 
        class='alert-header' 
        role='button' 
        aria-label='weather alert'
        aria-describedby='alert-event'
        aria-expanded='false' 
        aria-controls='alert-description'
        tabindex='0'>
          <span id='alert-event'>${alerts[0].event}</span>
          <img class='expand-icon' src='${expandIcon}' aria-hidden='true'/>
      </div>
      <div id='alert-description'>
      ${alerts[0].description.replace(/\n/g, '<br>')}
      </div>
    </div>
    `;

    const alertFragment = range.createContextualFragment(alert);
    currentForecastContainer.appendChild(alertFragment);
  }

  const forecast = `
  <div class='current-main'>
    <div class='current-temps-container'>
      <div 
        id='current-primary-temp' 
        aria-label='current temperature'
        aria-describedby='current-primary-temp'>
          ${createTemperatureString(current.temp)}
      </div>
      <div 
        id='current-secondary-temp' 
        aria-label='current temperature'
        aria-describedby='current-secondary-temp'>
          Feels like: ${createTemperatureString(current.feels_like)}
      </div>
    </div>
    <div class='current-weather-container'>
      <img
        class='current-icon'
        src='${iconURL}${current.weather[0].icon}@4x.png' 
        alt='' 
        aria-hidden='true'
      />
      <div 
        id='current-description' 
        aria-label='current weather'
        aria-describedby='current-description'>
          ${capitalize(current.weather[0].description)}
      </div>
    </div>
  </div>
  <table>
    <caption>Additioanl Details</caption>
    <tr>
      <th scope='row'>Sunrise</th>
      <td>
        <time datetime='${timeAttribute(current.sunrise, timezone)}'>
          ${convertDate(current.sunrise, timezone, 'h:mm aa')}
        </time>
      </td>
    </tr>
    <tr>
      <th scope='row'>Sunset</th>
      <td>
        <time datetime='${timeAttribute(current.sunset, timezone)}'>
          ${convertDate(current.sunset, timezone, 'h:mm aa')}
        </time>
      </td>
    </tr>
    <tr>
      <th scope='row'>Wind</th>
      <td>${convertWindSpeed(current.wind_speed)}</td>
    </tr>
    <tr>
      <th scope='row'>Humidity</th>
      <td>${current.humidity}%</td>
    </tr>
    <tr>
      <th scope='row'>UV Index</th>
      <td>${createUviString(current.uvi)}</td>
    </tr>
  </table>
  `;

  const fragment = range.createContextualFragment(forecast);
  currentForecastContainer.appendChild(fragment);
  document
    .getElementById('current-forecast')
    .appendChild(currentForecastContainer);
};

const renderHourlyForecast = (forecastData) => {
  const { hourly, timezone } = forecastData;
  const hourlyForecastContainer = document.createElement('div');

  for (let i = 0; i < 25; i++) {
    const forecast = `
      <table>
        <caption>
          <time datetime='${timeAttribute(hourly[i].dt, timezone)}'>
            ${convertDate(hourly[i].dt, timezone, 'h aa')}
          </time>
        </caption>
          <tr>
            <th scope='row'>Temperature</th>
            <td>${createTemperatureString(hourly[i].temp)}</td>
          </tr>
          <tr>
            <th scope='row'>Will Feel Like</th>
            <td>${createTemperatureString(hourly[i].feels_like)}</td>
          </tr>
          <tr>
            <th scope='row'>Expected Condition</th>
            <td>${capitalize(hourly[i].weather[0].description)}</td>
          </tr>
          <tr>
          <th scope='row'>Chance of Precipitation</th>
          <td>${(hourly[i].pop * 100).toFixed()}%</td>
        </tr>
      </table>
    `;

    const fragment = range.createContextualFragment(forecast);
    hourlyForecastContainer.appendChild(fragment);
  }

  document
    .getElementById('hourly-forecast')
    .appendChild(hourlyForecastContainer);
};

const renderDailyForecast = (forecastData) => {
  const { daily, timezone } = forecastData;
  const dailyForecastContainer = document.createElement('div');

  for (let i = 0; i < 8; i++) {
    const forecast = `
    <table>
      <caption>
        <time datetime='${timeAttribute(daily[i].dt, timezone)}'>
          ${convertDate(daily[i].dt, timezone, 'M/d')}
        </time>
      </caption>
        <tr>
          <th scope='row'>Sunrise</th>
          <td>
            <time datetime='${timeAttribute(daily[i].sunrise, timezone)}'>
              ${convertDate(daily[i].sunrise, timezone, 'h:mm aa')}
            </time>
          </td>
        </tr>
        <tr>
          <th scope='row'>Sunset</th>
          <td>
            <time datetime='${timeAttribute(daily[i].sunset, timezone)}'>
              ${convertDate(daily[i].sunset, timezone, 'h:mm aa')}
            </time>
          </td>
        </tr>
        <tr>
          <th scope='row'>High</th>
          <td>${createTemperatureString(daily[i].temp.max)}</td>
        </tr>
        <tr>
          <th scope='row'>Low</th>
          <td>${createTemperatureString(daily[i].temp.min)}</td>
        </tr>
        <tr>
          <th scope='row'>Expected Condition</th>
          <td>${capitalize(daily[i].weather[0].description)}</td>
        </tr>
        <tr>
        <th scope='row'>Chance of Precipitation</th>
        <td>${(daily[i].pop * 100).toFixed()}%</td>
      </tr>
    </table>
    `;

    const fragment = range.createContextualFragment(forecast);
    dailyForecastContainer.appendChild(fragment);
  }

  document.getElementById('daily-forecast').appendChild(dailyForecastContainer);
};

function renderForecastDisplays(locationData, fetchedData) {
  document.getElementById('forecast-header').textContent = locationData;

  clearForecastDisplays();
  renderCurrentForecast(fetchedData);
  renderHourlyForecast(fetchedData);
  renderDailyForecast(fetchedData);
}

export default renderForecastDisplays;
