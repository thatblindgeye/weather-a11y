// auto scroll the page to the top of forecast container
// when clicking a new forecast tab
const offset = document.getElementById('upper-nav').offsetTop;
function scrollToTop() {
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

function convertToLocalDate(time, zoneOption) {
  // convert time from API to milliseconds
  const milliseconds = time * 1000;
  const localDate = new Date(milliseconds).toLocaleString('en-US', {
    timeZone: `${zoneOption}`,
  });

  return localDate;
}

function createTempString(number) {
  if (localStorage.getItem('units') === 'metric') {
    return `${number.toFixed()}° C`;
  }
  return `${number.toFixed()}° F`;
}

function createUviString(uvi) {
  const uviNumber = Number(uvi.toFixed());
  console.log(typeof uviNumber);
  let uviString = uviNumber;

  switch (uviNumber) {
    case 1:
    case 2:
      uviString += ' (low)';
      break;
    case 3:
    case 4:
    case 5:
      uviString += ' (medium)';
      break;
    case 6:
    case 7:
      uviString += ' (high)';
      break;
    case 8:
    case 9:
    case 10:
      uviString += ' (very high)';
      break;
    case 11:
      uviString += ' (extreme)';
      break;
    default:
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

function convertRainChance(number) {
  if (localStorage.getItem('units') === 'metric') {
    // convert API's wind of meter/sec to km/h
    return `${(number * 3.6).toFixed()} km/h`;
  }
  return `${number.toFixed()} mph`;
}

export {
  setActiveForecast,
  convertToLocalDate,
  createTempString,
  convertWindSpeed,
  createUviString,
};
