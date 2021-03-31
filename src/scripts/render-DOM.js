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

const forecastDisplays = document.querySelectorAll('.forecast');
function setActiveForecast(target) {
  Array.from(document.querySelectorAll('.tab')).forEach((tab) => {
    tab.classList.remove('active-tab');
    tab.setAttribute('aria-expanded', false);
  });

  target.classList.add('active-tab');
  target.setAttribute('aria-expanded', true);

  Array.from(forecastDisplays).forEach((display) => {
    display.classList.remove('active-forecast');
  });

  const activeForecastId = target.getAttribute('aria-controls');
  const activeForecastDisplay = document.getElementById(`${activeForecastId}`);
  activeForecastDisplay.classList.add('active-forecast');
}

function renderMainDisplay(location, weather) {
  document.getElementById('forecast-header').textContent = location;

  Array.from(forecastDisplays).forEach((display) => {
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
  });

  const { current, daily, hourly, timezone_offset: offset } = weather;
  const iconURL = 'https://openweathermap.org/img/wn/';
  const range = document.createRange();

  const renderCurrentForecast = () => {
    const forecast = `
    <div class='current-main'>
      <div class='current-temps'>
        <div class='temp current-primary-temp'>
          ${current.temp.toFixed()}
        </div>
        <div class='temp current-secondary-temp'>
          ${current.feels_like.toFixed()}
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
      ${new Date(current.sunrise * 1000)}<br>
      ${new Date(current.sunset * 1000)}
      ${current.wind_speed.toFixed()}
      ${current.humidity}
      ${current.uvi}
    </div>
    `;

    const fragment = range.createContextualFragment(forecast);
    document.getElementById('current-forecast').appendChild(fragment);
  };

  renderCurrentForecast();
}

export { setActiveForecast, renderError, clearError, renderMainDisplay };
