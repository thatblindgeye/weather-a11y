const themeSwitch = document.querySelector('#theme-switch');
const darkIcon = document.getElementById('dark-theme-icon');
const lightIcon = document.getElementById('light-theme-icon');
const githubLogo = document.querySelector('.github-icon');

const saveTheme = () => {
  localStorage.setItem(
    'theme',
    document.documentElement.getAttribute('data-theme')
  );
};

const setDarkTheme = () => {
  themeSwitch.setAttribute('aria-checked', 'false');
  document.documentElement.setAttribute('data-theme', 'dark');
  themeSwitch.style.justifyContent = 'flex-start';
  lightIcon.style.transform = 'translateX(3rem)';
  darkIcon.style.transform = 'translateX(0rem)';
  githubLogo.src = 'assets/images/logos/GitHub-White-Mark-32px.png';
};

const setLightTheme = () => {
  themeSwitch.setAttribute('aria-checked', 'true');
  document.documentElement.setAttribute('data-theme', 'light');
  themeSwitch.style.justifyContent = 'flex-end';
  lightIcon.style.transform = 'translateX(0rem)';
  darkIcon.style.transform = 'translateX(-3rem)';
  githubLogo.src = 'assets/images/logos/GitHub-Black-Mark-32px.png';
};

const themeOnLoad = () => {
  if (localStorage.getItem('theme') === 'light') {
    setLightTheme();
  } else {
    setDarkTheme();
  }
};

const toggleTheme = () => {
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  saveTheme();
};

export { themeOnLoad, toggleTheme };
