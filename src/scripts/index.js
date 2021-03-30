import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './theme-settings';
import { saveUnitType, changeUnitType, loadUnitType } from './unit-utilities';
import { setActiveForecast } from './render-DOM';
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

Array.from(document.querySelectorAll('.tab')).forEach((tab) => {
  tab.addEventListener('click', (e) => {
    setActiveForecast(e.target);
  });
});
Array.from(document.querySelectorAll('.tab')).forEach((tab) => {
  tab.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setActiveForecast(e.target);
    }
  });
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeatherData(e);
  setActiveForecast(document.querySelector('#current-tab'));
});

document.querySelector('.use-location-btn').addEventListener('click', (e) => {
  getWeatherData(e);
  setActiveForecast(document.querySelector('#current-tab'));
});
