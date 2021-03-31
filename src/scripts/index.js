import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './theme-settings';
import { checkForSavedUnits, changeUnitType } from './unit-utilities';
import { setActiveForecast } from './DOM-utilities';
import getWeatherData from './fetch-logic';

window.addEventListener('load', (e) => {
  themeOnLoad();
  checkForSavedUnits();
  if (localStorage.getItem('recent location')) {
    getWeatherData(e);
  }
});

const unitButton = document.getElementById('unit-btn');
unitButton.addEventListener('click', (e) => {
  changeUnitType();
  if (localStorage.getItem('recent location')) {
    getWeatherData(e);
  }
});

const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('click', toggleTheme);
themeSwitch.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTheme();
  }
});

const forecastTabs = document.querySelectorAll('.tab');
Array.from(forecastTabs).forEach((tab) => {
  tab.addEventListener('click', (e) => {
    setActiveForecast(e.target);
  });
});
Array.from(forecastTabs).forEach((tab) => {
  tab.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setActiveForecast(e.target);
    }
  });
});

const form = document.querySelector('form');
const defaultTab = document.getElementById('current-tab');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeatherData(e);
  setActiveForecast(defaultTab);
});

document.querySelector('.use-location-btn').addEventListener('click', (e) => {
  getWeatherData(e);
  setActiveForecast(defaultTab);
});
