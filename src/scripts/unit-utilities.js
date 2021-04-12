function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

const unitButton = document.getElementById('unit-btn');
const unitButtonLabel = document.getElementById('unit-btn-label');
function changeUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = `Imperial Units`;
    saveUnitType('imperial');
  } else {
    unitButton.textContent = 'Metric Units ';
    saveUnitType('metric');
  }
}

function loadUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Metric Units';
  } else {
    unitButton.textContent = 'Imperial Units';
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
