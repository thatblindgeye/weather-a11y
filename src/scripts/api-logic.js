const API = '13aa14e68e00ac80cb7c634dc1194d83';

async function convertInputToCoordinates() {
  const searchInput = document.getElementById('location-search');
  if (!searchInput.value) {
    throw new Error('Search field cannot be blank.');
  }

  const inputResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=10&appid=${API}`,
    { mode: 'cors' }
  );

  const coordData = await inputResponse.json();
  if (coordData.length === 0 || coordData.cod === '404') {
    throw new Error(`Location "${searchInput.value}" not found.`);
  } else if (coordData.length > 1) {
    console.log(coordData);
    const selectedLocation = prompt('choose');
    return coordData[selectedLocation];
  }
  return coordData[0];
}

const geolocationOptions = {
  timeout: 15000,
  enableHighAccuracy: true,
};

const getUserGeolocation = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      geolocationOptions
    );
  });
};

async function getWeatherData(e) {
  const units = localStorage.getItem('units');
  let coordinateResponse;
  let latitude;
  let longitude;

  try {
    if (e.type === 'submit') {
      coordinateResponse = await convertInputToCoordinates();
      latitude = coordinateResponse.lat;
      longitude = coordinateResponse.lon;
    } else {
      coordinateResponse = await getUserGeolocation();
      latitude = coordinateResponse.coords.latitude;
      longitude = coordinateResponse.coords.longitude;
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=${units}&appid=${API}`
    );

    const weatherData = await weatherResponse.json();
    console.log(weatherData);
  } catch (error) {
    console.log(error.message);
  }
}

export default getWeatherData;
