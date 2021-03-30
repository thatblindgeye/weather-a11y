const convertToMetric = () => {
  function convertToCelsius() {}

  function convertToKPH() {}

  convertToCelsius();
  convertToKPH();
};

const convertToImperial = () => {
  function convertToFahrenheit() {}

  function convertToMPH() {}

  convertToFahrenheit();
  convertToMPH();
};

function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

const unitButton = document.getElementById('unit-btn');

function loadUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Metric';
  } else {
    unitButton.textContent = 'Imperial';
  }
}

function changeUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Imperial';
    saveUnitType('imperial');
  } else {
    unitButton.textContent = 'Metric';
    saveUnitType('metric');
  }
}

export { saveUnitType, changeUnitType, loadUnitType };
