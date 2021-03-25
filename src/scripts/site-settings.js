const themeSwitch = document.querySelector('#theme-switch');
const darkIcon = document.getElementById('dark-theme-icon');
const lightIcon = document.getElementById('light-theme-icon');

const _saveToLocal = () => {
  localStorage.setItem(
    'theme',
    document.documentElement.getAttribute('data-theme')
  );
};

const _setDarkTheme = () => {
  themeSwitch.setAttribute('aria-checked', 'false');
  document.documentElement.setAttribute('data-theme', 'dark');
  themeSwitch.style.justifyContent = 'flex-start';
  lightIcon.style.transform = 'translateX(3rem)';
  darkIcon.style.transform = 'translateX(0rem)';
};

const _setLightTheme = () => {
  themeSwitch.setAttribute('aria-checked', 'true');
  document.documentElement.setAttribute('data-theme', 'light');
  themeSwitch.style.justifyContent = 'flex-end';
  lightIcon.style.transform = 'translateX(0rem)';
  darkIcon.style.transform = 'translateX(-3rem)';
};

const themeOnLoad = () => {
  if (localStorage.getItem('theme') === 'light') {
    _setLightTheme();
  } else {
    _setDarkTheme();
  }
};

const toggleTheme = (e) => {
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    _setDarkTheme();
  } else {
    _setLightTheme();
  }
  _saveToLocal();
};

export { themeOnLoad, toggleTheme };
