import {
  convertDate,
  createTempString,
  convertWindSpeed,
  createUviString,
} from './DOM-utilities';

const errorContainer = document.querySelector('.search-error');
function renderError(message) {
  errorContainer.textContent = message;
  if (!errorContainer.classList.contains('display-error')) {
    errorContainer.classList.add('display-error');
  }
}

function clearError() {
  if (errorContainer.classList.contains('display-error')) {
    errorContainer.textContent = '';
    errorContainer.classList.remove('display-error');
  }
}

function clearMainDisplay() {
  Array.from(document.querySelectorAll('.forecast')).forEach((display) => {
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
  });
}

function renderMainDisplay(location, weather) {
  document.getElementById('forecast-header').textContent = location;

  const { current, daily, hourly, timezone } = weather;
  const iconURL = 'https://openweathermap.org/img/wn/';
  const range = document.createRange();

  const renderCurrentForecast = () => {
    const forecast = `
    <div class='current-main'>
      <div class='current-temps'>
        <div class='temp current-primary-temp'>
          ${createTempString(current.temp)}
        </div>
        <div class='temp current-secondary-temp'>
          ${createTempString(current.feels_like)}
        </div>
      </div>
      <div class='current-weather'>
        <img
          class='current-icon'
          src='${iconURL}${current.weather[0].icon}@4x.png' 
          alt='' 
          aria-hidden='true'
        />
        <div class='current-description'>
          ${current.weather[0].description}
        </div>
      </div>
    </div>
    <div class='current-additional'>
      ${convertDate(current.sunrise, timezone).formattedTime}<br>
      ${convertDate(current.sunset, timezone).formattedTime} <br>
      ${convertWindSpeed(current.wind_speed)}
      ${current.humidity}%
      ${createUviString(current.uvi)}
    </div>
    `;

    const fragment = range.createContextualFragment(forecast);
    document.getElementById('current-forecast').appendChild(fragment);
  };

  const renderHourlyForecast = () => {
    for (let i = 0; i < 24; i++) {
      const forecast = `
      <div>
      
      ${convertDate(hourly[i].dt, timezone).formattedDate} <br>
      ${convertDate(hourly[i].dt, timezone).formattedTime}<br>
      ${createTempString(hourly[i].temp)} <br>
      ${createTempString(hourly[i].feels_like)} <br>
      <img
      class='current-icon'
      src='${iconURL}${hourly[i].weather[0].icon}.png' 
      alt='' 
      aria-hidden='true'
      />
      ${hourly[i].weather[0].description} <br>
      ${(hourly[i].pop * 100).toFixed()}% <br>
      </div>
      `;

      const fragment = range.createContextualFragment(forecast);
      document.getElementById('hourly-forecast').appendChild(fragment);
    }
  };

  const renderDailyForecast = () => {
    for (let i = 0; i < 8; i++) {
      const forecast = `
      <div>
      ${convertDate(daily[i].dt, timezone).formattedDate}<br>
      
      ${createTempString(daily[i].temp.max)} <br>
      ${createTempString(daily[i].temp.min)} <br>
      <img
      class='current-icon'
      src='${iconURL}${daily[i].weather[0].icon}.png' 
      alt='' 
      aria-hidden='true'
      />
      ${daily[i].weather[0].description} <br>
      ${(daily[i].pop * 100).toFixed()}% <br>
      ${convertDate(daily[i].sunrise, timezone).formattedTime}<br>
      ${convertDate(daily[i].sunset, timezone).formattedTime} <br>
      </div>
      `;

      const fragment = range.createContextualFragment(forecast);
      document.getElementById('daily-forecast').appendChild(fragment);
    }
  };

  clearMainDisplay();
  renderCurrentForecast();
  renderHourlyForecast();
  renderDailyForecast();
}

export { renderError, clearError, renderMainDisplay };
