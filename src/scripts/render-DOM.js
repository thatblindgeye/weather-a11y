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

function renderMainDisplay(location, weather) {
  document.getElementById('forecast-header').textContent = location;

  Array.from(document.querySelectorAll('.forecast')).forEach((display) => {
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
      ${current.uvi.toFixed()}
    </div>
    `;

    const fragment = range.createContextualFragment(forecast);
    document.getElementById('current-forecast').appendChild(fragment);
  };

  const renderHourlyForecast = () => {
    for (let i = 0; i < 24; i++) {
      const forecast = `
      <div>
      ${new Date(hourly[i].dt * 1000)} <br>
      ${hourly[i].temp.toFixed()} <br>
      ${hourly[i].feels_like.toFixed()} <br>
      <img
      class='current-icon'
      src='${iconURL}${hourly[i].weather[0].icon}.png' 
      alt='' 
      aria-hidden='true'
      />
      ${hourly[i].weather[0].description} <br>
      ${hourly[i].pop.toFixed()} <br>
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
      ${new Date(daily[i].dt * 1000)} <br>
      ${daily[i].temp.max.toFixed()} <br>
      ${daily[i].temp.min.toFixed()} <br>
      <img
      class='current-icon'
      src='${iconURL}${daily[i].weather[0].icon}.png' 
      alt='' 
      aria-hidden='true'
      />
      ${daily[i].weather[0].description} <br>
      ${daily[i].pop.toFixed()}% <br>
      ${daily[i].sunrise} <br>
      ${daily[i].sunset} <br>
      </div>
      `;

      const fragment = range.createContextualFragment(forecast);
      document.getElementById('daily-forecast').appendChild(fragment);
    }
  };

  renderCurrentForecast();
  renderHourlyForecast();
  renderDailyForecast();
}

export { renderError, clearError, renderMainDisplay };
