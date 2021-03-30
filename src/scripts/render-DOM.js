const errorContainer = document.querySelector('.search-error');

function renderError(message) {
  errorContainer.textContent = message;
  errorContainer.classList.add('display-error');
}

function clearError() {
  errorContainer.textContent = '';
  errorContainer.classList.remove('display-error');
}

function setActiveForecast(target) {
  const forecastTabs = document.querySelectorAll('.tab');
  Array.from(forecastTabs).forEach((tab) => {
    tab.classList.remove('active-tab');
    tab.setAttribute('aria-expanded', false);
  });
  target.classList.add('active-tab');
  target.setAttribute('aria-expanded', true);

  const forecastDisplays = document.querySelectorAll('.forecast');
  Array.from(forecastDisplays).forEach((forecast) => {
    forecast.classList.remove('active-forecast');
  });

  const activeForecastId = target.getAttribute('aria-controls');
  const activeForecastDisplay = document.getElementById(`${activeForecastId}`);
  activeForecastDisplay.classList.add('active-forecast');
}

const renderForecasts = (data) => {
  const iconURL = 'https://openweathermap.org/img/wn/';
  const range = document.createRange();

  function renderCurrent() {
    const { current } = data.current;
    const forecast = `
    <article id="current-forecast" class="forecast active-forecast">
    <div>
    <div>
    ${current.temp.toFixed()}
    ${current.feels_like.toFixed()}
    </div>
    <div>
    <img src=${iconURL}${current.weather[0].icon}@4x.png>
    <div>${current.weather[0].description}</div>
    </div>
    </div>
    <div>${new Date(current.sunrise * 1000)}
    ${new Date(current.sunset * 1000)}</div>

    </article>
    `;

    const fragment = range.createContextualFragment(forecast);
    return fragment;
  }

  document.querySelector('.forecast-container').append(renderCurrent());
};

export { setActiveForecast, renderError, clearError };
