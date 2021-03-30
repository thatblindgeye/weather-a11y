import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './theme-settings';
import { saveUnitType, changeUnitType, loadUnitType } from './unit-utilities';
import getWeatherData from './api-logic';

const unitButton = document.getElementById('unit-btn');
unitButton.addEventListener('click', () => {
  changeUnitType();
});

window.addEventListener('load', () => {
  themeOnLoad();
  if (!localStorage.getItem('units')) {
    saveUnitType('imperial');
  } else {
    loadUnitType();
  }
});

const themeSwitch = document.querySelector('#theme-switch');
themeSwitch.addEventListener('click', toggleTheme);
themeSwitch.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTheme();
  }
});

const forecastLinks = document.querySelectorAll('.link');
function setActiveLink(target) {
  Array.from(forecastLinks).forEach((link) => {
    link.classList.remove('active-link');
  });
  target.classList.add('active-link');
}

Array.from(forecastLinks).forEach((link) => {
  link.addEventListener('click', (e) => {
    setActiveLink(e.target);
  });
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeatherData(e);
  setActiveLink(document.querySelector('#current-link'));
});

document.querySelector('.use-location-btn').addEventListener('click', (e) => {
  getWeatherData(e);
  setActiveLink(document.querySelector('#current-link'));
});
