import {
  convertDate,
  createTemperatureString,
  convertWindSpeed,
  createUviString,
} from './DOM-utilities';

function clearMainDisplay() {
  Array.from(document.querySelectorAll('.forecast')).forEach((forecast) => {
    while (forecast.lastChild) {
      forecast.removeChild(forecast.lastChild);
    }
  });
}

function renderMainDisplay(location, weather) {
  document.getElementById('forecast-header').textContent = location;

  const { current, daily, hourly, timezone } = weather;
  const timeAttribute = (data) => {
    return `${convertDate(data, timezone, 'yyyy-MM-dd kk:mm:ss')}`;
  };

  const iconURL = 'https://openweathermap.org/img/wn/';
  const range = document.createRange();

  const alerts = [
    {
      event: 'Heat Advisory',
      description: `...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.`,
    },
  ];

  const renderCurrentForecast = () => {
    const currentForecastContainer = document.createElement('div');

    if (alerts) {
      const alert = `
      <div class='alert-container' 
        role='button' 
        aria-expanded='false' 
        tabindex='0'>
          <span class='alert-name'>${alerts[0].event}</span>
        <div class='alert-description'>
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
            ${current.weather[0].description}
        </div>
      </div>
    </div>
    <table>
      <caption>Additioanl Details</caption>
      <tr>
        <th scope='row'>Sunrise</th>
        <td>
          <time datetime='${timeAttribute(current.sunrise)}'>
            ${convertDate(current.sunrise, timezone, 'h:mm aa')}
          </time>
        </td>
      </tr>
      <tr>
        <th scope='row'>Sunset</th>
        <td>
          <time datetime='${timeAttribute(current.sunset)}'>
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

  const renderHourlyForecast = () => {
    const hourlyForecastContainer = document.createElement('div');

    for (let i = 0; i < 25; i++) {
      const forecast = `
        <table>
          <caption>
            <time datetime='${timeAttribute(hourly[i].dt)}'>
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
              <td>${hourly[i].weather[0].description}</td>
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

  const renderDailyForecast = () => {
    const dailyForecastContainer = document.createElement('div');

    for (let i = 0; i < 8; i++) {
      const forecast = `
      <table>
        <caption>
          <time datetime='${timeAttribute(daily[i].dt)}'>
            ${convertDate(daily[i].dt, timezone, 'M/d')}
          </time>
        </caption>
          <tr>
            <th scope='row'>Sunrise</th>
            <td>
              <time datetime='${timeAttribute(daily[i].sunrise)}'>
                ${convertDate(daily[i].sunrise, timezone, 'h:mm aa')}
              </time>
            </td>
          </tr>
          <tr>
            <th scope='row'>Sunset</th>
            <td>
              <time datetime='${timeAttribute(daily[i].sunset)}'>
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
            <td>${daily[i].weather[0].description}</td>
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

    document
      .getElementById('daily-forecast')
      .appendChild(dailyForecastContainer);
  };

  clearMainDisplay();
  renderCurrentForecast();
  renderHourlyForecast();
  renderDailyForecast();
}

export default renderMainDisplay;
