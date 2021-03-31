const offset = document.getElementById('upper-nav').offsetTop;
function scrollToTop() {
  if (document.documentElement.scrollTop > offset) {
    document.documentElement.scrollTop = `${offset}`;
  }
}

function setActiveForecast(target) {
  Array.from(document.querySelectorAll('.tab')).forEach((tab) => {
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

export default setActiveForecast;
