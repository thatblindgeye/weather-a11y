import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './theme-settings';
import { saveUnitType, changeUnitType, loadUnitType } from './unit-utilities';
import getWeatherData from './api-logic';

const unitButton = document.getElementById('unit-btn');
unitButton.addEventListener('click', () => {
  changeUnitType();
});

window.addEventListener('load', (e) => {
  themeOnLoad();
  if (!localStorage.getItem('units')) {
    saveUnitType('imperial');
  } else {
    loadUnitType();
  }
  getWeatherData(e);
});

const themeSwitch = document.querySelector('#theme-switch');
themeSwitch.addEventListener('click', toggleTheme);
themeSwitch.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTheme();
  }
});

const forecastTabs = document.querySelectorAll('.tab');
function setActiveTab(target) {
  Array.from(forecastTabs).forEach((tab) => {
    tab.classList.remove('active-tab');
    tab.setAttribute('aria-expanded', false);
  });
  target.classList.add('active-tab');
  target.setAttribute('aria-expanded', true);
}

Array.from(forecastTabs).forEach((link) => {
  link.addEventListener('click', (e) => {
    setActiveTab(e.target);
  });
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeatherData(e);
  setActiveTab(document.querySelector('#current-tab'));
});

document.querySelector('.use-location-btn').addEventListener('click', (e) => {
  getWeatherData(e);
  setActiveTab(document.querySelector('#current-tab'));
});
