import '../styles/sanitize.css';
import '../styles/style.css';
import { themeOnLoad, toggleTheme } from './site-settings';

window.addEventListener('load', themeOnLoad);

document.querySelector('#theme-switch').addEventListener('click', toggleTheme);
document.querySelector('#theme-switch').addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTheme();
  }
});
