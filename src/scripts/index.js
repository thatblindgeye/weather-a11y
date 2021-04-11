import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './theme-settings';
import { checkForSavedUnits, changeUnitType } from './unit-utilities';
import getWeather from './fetch-logic';

window.addEventListener('load', (e) => {
  themeOnLoad();
  checkForSavedUnits();

  if (localStorage.getItem('recent location')) {
    getWeather(e);
  }
});

document.getElementById('unit-btn').addEventListener('click', (e) => {
  changeUnitType();
  if (localStorage.getItem('recent location')) {
    getWeather(e);
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

// auto scroll the page to the top of forecast container
// when clicking a new forecast tab
function scrollToTop() {
  const offset = document.querySelector('header').scrollHeight;
  if (document.documentElement.scrollTop > offset) {
    document.documentElement.scrollTop = `${offset}`;
  }
}

const forecastTabs = document.querySelectorAll('.tab');
function setActiveForecast(target) {
  Array.from(forecastTabs).forEach((tab) => {
    tab.classList.remove('active-tab');
    tab.setAttribute('aria-expanded', false);
  });

  target.classList.add('active-tab');
  target.setAttribute('aria-expanded', true);

  Array.from(document.querySelectorAll('.forecast')).forEach((display) => {
    display.classList.remove('active-forecast');
  });

  const activeForecastId = target.getAttribute('aria-controls');
  const activeForecastDisplay = document.getElementById(`${activeForecastId}`);
  activeForecastDisplay.classList.add('active-forecast');

  scrollToTop();
}

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

const defaultTab = document.getElementById('current-tab');
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather(e);
  setActiveForecast(defaultTab);
});

document.querySelector('.use-location-btn').addEventListener('click', (e) => {
  getWeather(e);
  setActiveForecast(defaultTab);
});

function toggleAriaExpanded(target) {
  if (target.getAttribute('aria-expanded') === 'false') {
    target.setAttribute('aria-expanded', 'true');
  } else {
    target.setAttribute('aria-expanded', 'false');
  }
}

function toggleAlertExpand(e) {
  if (
    e.target.className === 'alert-header' ||
    e.target.parentElement.className === 'alert-header'
  ) {
    const alertHeader = document.querySelector('.alert-header');

    toggleAriaExpanded(alertHeader);
    document.getElementById('alert-description').classList.toggle('expanded');
    document.querySelector('.expand-icon').classList.toggle('rotate');
  }
}

const currentForecast = document.getElementById('current-forecast');
currentForecast.addEventListener('click', toggleAlertExpand);
currentForecast.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleAlertExpand(e);
  }
});
