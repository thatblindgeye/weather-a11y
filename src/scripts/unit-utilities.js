function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

const unitButton = document.getElementById('unit-btn');
function changeUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Imperial';
    saveUnitType('imperial');
  } else {
    unitButton.textContent = 'Metric';
    saveUnitType('metric');
  }
}

function loadUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Metric';
  } else {
    unitButton.textContent = 'Imperial';
  }
}

function checkForSavedUnits() {
  if (!localStorage.getItem('units')) {
    saveUnitType('imperial');
  } else {
    loadUnitType();
  }
}

export { checkForSavedUnits, changeUnitType };
