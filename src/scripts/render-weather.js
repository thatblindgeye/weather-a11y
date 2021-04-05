import {
  convertDate,
  createTempString,
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
      for (let i = 0; i < alerts.length; i++) {
        const alert = `
        <div class='alert-container'>
          <div role='button' class='alert-name' aria-expanded='false'>
          ${alerts[i].event}
          </div>
          <div class='alert-description'>
          ${alerts[i].description.replace(/\n/g, '<br>')}
          </div>
        </div>
        `;

        const alertFragment = range.createContextualFragment(alert);
        currentForecastContainer.appendChild(alertFragment);
      }
    }

    const forecast = `
    <div class='current-main'>
      <div class='current-temps-container'>
        <div 
          id='current-primary-temp' 
          aria-label='current temperature'
          aria-describedby='current-primary-temp'>
            ${createTempString(current.temp)}
        </div>
        <div 
          id='current-secondary-temp' 
          aria-label='current temperature'
          aria-describedby='current-secondary-temp'>
            Feels like: ${createTempString(current.feels_like)}
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
        <td>${convertDate(current.sunrise, timezone).formattedTime}</td>
      </tr>
      <tr>
        <th scope='row'>Sunset</th>
        <td>${convertDate(current.sunset, timezone).formattedTime}</td>
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
    //   <div class='current-additional-weather'>
    //   <div class='current-sunrise-container'>
    //     <span class='data-label'>Sunrise</span>
    //     <span class='current-sunrise-'>
    //       ${convertDate(current.sunrise, timezone).formattedTime}
    //     </span>
    //   </div>
    //   <div class='current-sunset-container'>
    //     <span>Sunset</span>
    //     <span class='current-sunset'>
    //       ${convertDate(current.sunset, timezone).formattedTime}
    //     </span>
    //   </div>
    //   <div class='current-wind-container'>
    //     <span>Wind</span>
    //     <span class='current-wind'>
    //       ${convertWindSpeed(current.wind_speed)}
    //     </span>
    //   </div>
    //   <div class='current-humidity-container'>
    //     <span>Humidity</span>
    //     <span class='current-humidity'>
    //       ${current.humidity}%
    //     </span>
    //   </div>
    //   <div class='current-uvi-container'>
    //     <span>UV Index</span>
    //     <span class='current-uvi'>
    //       ${createUviString(current.uvi)}
    //     </span>
    //   </div>
    // </div>

    const fragment = range.createContextualFragment(forecast);
    currentForecastContainer.appendChild(fragment);
    document
      .getElementById('current-forecast')
      .appendChild(currentForecastContainer);
  };

  const renderHourlyForecast = () => {
    const hourlyForecastContainer = document.createElement('div');

    for (let i = 0; i < 24; i++) {
      const forecast = `
        <table>
          <caption>
            ${convertDate(hourly[i].dt, timezone).formattedTime}
          </caption>
            <tr>
              <th scope='row'>Temperature</th>
              <td>${createTempString(hourly[i].temp)}</td>
            </tr>
            <tr>
              <th scope='row'>Will Feel Like</th>
              <td>${createTempString(hourly[i].feels_like)}</td>
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

      // const forecast = `
      // <div class='hourly-${i}-container'>
      //   <div id='hourly-${i}-time' class='hourly-time-label'>
      //     ${convertDate(hourly[i].dt, timezone).formattedTime}
      //   </div>
      //   <div class='hourly-temperature-container'>
      //     <span
      //       id='hourly-${i}-primary-temp'
      //       aria-labelledby='hourly-${i}-time hourly-${i}-primary-temp'>
      //         ${createTempString(hourly[i].temp)}
      //     </span>
      //     <span
      //       id='hourly-${i}-secondary-temp'
      //       aria-labelledby='hourly-${i}-time hourly-${i}-secondary-temp'>
      //         Feels like: ${createTempString(hourly[i].feels_like)}
      //     </span>
      //   </div>
      //   <div class='hourly-weather-container'>
      //     <img
      //       class='hourly-icon'
      //       src='${iconURL}${hourly[i].weather[0].icon}.png'
      //       alt=''
      //       aria-hidden='true'
      //     />
      //     <span
      //       id='hourly-${i}-description'
      //       aria-describedby='current-description'>
      //         ${hourly[i].weather[0].description}
      //     </span>
      //     <span
      //       id='hourly-${i}-precipitation'
      //       aria-labelledby='hourly-${i}-time hourly-${i}-precipitation'>
      //         ${(hourly[i].pop * 100).toFixed()}%
      //     </span>
      //   </div>
      // </div>
      // `;

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
          ${convertDate(daily[i].dt, timezone).formattedDate}
        </caption>
          <tr>
            <th scope='row'>Sunrise</th>
            <td>${convertDate(daily[i].sunrise, timezone).formattedTime}</td>
          </tr>
          <tr>
            <th scope='row'>Sunset</th>
            <td>${convertDate(daily[i].sunset, timezone).formattedTime}</td>
          </tr>
          <tr>
            <th scope='row'>High</th>
            <td>${createTempString(daily[i].temp.max)}</td>
          </tr>
          <tr>
            <th scope='row'>Low</th>
            <td>${createTempString(daily[i].temp.min)}</td>
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

      // const forecast = `
      // <div>
      // ${convertDate(daily[i].dt, timezone).formattedDate}<br>

      // ${createTempString(daily[i].temp.max)} <br>
      // ${createTempString(daily[i].temp.min)} <br>
      // <img
      // class='current-icon'
      // src='${iconURL}${daily[i].weather[0].icon}.png'
      // alt=''
      // aria-hidden='true'
      // />
      // ${daily[i].weather[0].description} <br>
      // ${(daily[i].pop * 100).toFixed()}% <br>
      // ${convertDate(daily[i].sunrise, timezone).formattedTime}<br>
      // ${convertDate(daily[i].sunset, timezone).formattedTime} <br>
      // </div>
      // `;

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
