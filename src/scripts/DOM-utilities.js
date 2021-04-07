import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

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

function capitalize(string) {
  const firstLetter = string.charAt(0);
  return string.replace(firstLetter, firstLetter.toUpperCase());
}

export {
  capitalize,
  convertDate,
  convertWindSpeed,
  createTemperatureString,
  createUviString,
};
