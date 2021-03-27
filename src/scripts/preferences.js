function saveUnitType(unit) {
  localStorage.setItem('units', unit);
}

function savePreferredLocation() {
  localStorage.setItem('location', 'test');
}

function clearPreferredLocation() {
  localStorage.removeItem('location');
}

export default saveUnitType;
