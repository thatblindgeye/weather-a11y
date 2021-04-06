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

function convertDate(data, zoneOption, pattern) {
  const options = {
    timeZone: `${zoneOption}`,
  };

  // convert times from API request to milliseconds for date and
  // format time so that it is based on search locations' timezone
  const formattedDate = format(
    new Date(fromUnixTime(data).toLocaleString('en-US', options)),
    pattern
  );

  return formattedDate;
}

function createTemperatureString(number) {
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

function toggleAriaExpanded(target) {
  if (target.getAttribute('aria-expanded') === 'false') {
    target.setAttribute('aria-expanded', 'true');
  } else {
    target.setAttribute('aria-expanded', 'false');
  }
}

function toggleAlertExpand(e) {
  if (
    e.target.className === 'alert-container' ||
    e.target.parentElement.className === 'alert-container'
  ) {
    const alertContainer = document.querySelector('.alert-container');
    const alertDescription = alertContainer.children[1];

    toggleAriaExpanded(alertContainer);
    alertDescription.classList.toggle('expanded');
  }
}

export {
  setActiveForecast,
  convertDate,
  convertWindSpeed,
  createTemperatureString,
  createUviString,
  toggleAlertExpand,
};
