const convertToMetric = () => {
  function convertToCelsius() {}

  function convertToKMH() {}

  convertToCelsius();
  convertToKMH();
};

const convertToImperial = () => {
  function convertToFahrenheit() {}

  function convertToMPH() {}

  convertToFahrenheit();
  convertToMPH();
};

const unitButton = document.getElementById('unit-btn');

function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

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

const checkForSavedUnits = () => {
  if (!localStorage.getItem('units')) {
    saveUnitType('imperial');
  } else {
    loadUnitType();
  }
};

export { checkForSavedUnits, changeUnitType };
