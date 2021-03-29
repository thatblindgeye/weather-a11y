function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

const unitButton = document.getElementById('unit-btn');

function changeUnitType() {
  if (unitButton.textContent === 'Imperial') {
    unitButton.textContent = 'Metric';
    saveUnitType('metric');
  } else {
    unitButton.textContent = 'Imperial';
    saveUnitType('imperial');
  }
}

function loadUnitType() {
  if (localStorage.getItem('units') === 'metric') {
    unitButton.textContent = 'Metric';
  } else {
    unitButton.textContent = 'Imperial';
  }
}

export { saveUnitType, changeUnitType, loadUnitType };
