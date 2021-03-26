import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './app-settings';
import { convertToCoordinates, getUserLocation } from './search-logic';

window.addEventListener('load', themeOnLoad);

document.querySelector('#theme-switch').addEventListener('click', toggleTheme);
document.querySelector('#theme-switch').addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTheme();
  }
});

window.addEventListener('submit', (e) => {
  e.preventDefault();
  convertToCoordinates();
});

document
  .querySelector('.use-location-btn')
  .addEventListener('click', getUserLocation);
