function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

const unitButton = document.getElementById('unit-btn');
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

export { loadUnitType, changeUnitType };
