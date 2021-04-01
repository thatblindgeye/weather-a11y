import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

// auto scroll the page to the top of forecast container
// when clicking a new forecast tab
function scrollToTop() {
  const offset = document.querySelector('header').scrollHeight;
  if (document.documentElement.scrollTop > offset) {
    document.documentElement.scrollTop = `${offset}`;
  }
}

function setActiveForecast(target) {
  Array.from(document.querySelectorAll('.tab')).forEach((tab) => {
    tab.classList.remove('active-tab');
    tab.setAttribute('aria-expanded', false);
  });

  target.classList.add('active-tab');
  target.setAttribute('aria-expanded', true);

  Array.from(document.querySelectorAll('.forecast')).forEach((display) => {
    display.classList.remove('active-forecast');
  });

  const activeForecastId = target.getAttribute('aria-controls');
  const activeForecastDisplay = document.getElementById(`${activeForecastId}`);
  activeForecastDisplay.classList.add('active-forecast');

  scrollToTop();
}

// convert times from API request to milliseconds and adjust based on time zone
function convertDate(data, zoneOption) {
  const options = {
    timeZone: `${zoneOption}`,
  };

  const formattedDate = format(new Date(fromUnixTime(data)), 'MMM d');
  const formattedTime = format(
    new Date(fromUnixTime(data).toLocaleString('en-US', options)),
    'h:mm aaaa'
  );

  return { formattedDate, formattedTime };
}

function createTempString(number) {
  if (localStorage.getItem('units') === 'metric') {
    return `${number.toFixed()}° C`;
  }
  return `${number.toFixed()}° F`;
}

function createUviString(uvi) {
  let uviString = uvi.toFixed();

  switch (uviString) {
    case '0':
    case '1':
    case '2':
      uviString += ' (low)';
      break;
    case '3':
    case '4':
    case '5':
      uviString += ' (moderate)';
      break;
    case '6':
    case '7':
      uviString += ' (high)';
      break;
    case '8':
    case '9':
    case '10':
      uviString += ' (very high)';
      break;
    default:
      uviString += ' (extreme)';
      break;
  }

  return uviString;
}

function convertWindSpeed(number) {
  if (localStorage.getItem('units') === 'metric') {
    // convert API's wind of meter/sec to km/h
    return `${(number * 3.6).toFixed()} km/h`;
  }
  return `${number.toFixed()} mph`;
}

export {
  setActiveForecast,
  convertDate,
  convertWindSpeed,
  createTempString,
  createUviString,
};
