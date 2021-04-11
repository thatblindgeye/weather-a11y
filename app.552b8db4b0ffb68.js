!function(){var e,t={214:function(e,t,n){e.exports=n.p+"assets/images/icons/expand_24dp.c20ca823560c420.svg"},648:function(e,t,n){e.exports=n.p+"assets/images/logos/GitHub-Black-Mark-32px.b34b292f80403cc.png"},370:function(e,t,n){e.exports=n.p+"assets/images/logos/GitHub-White-Mark-32px.d99f18323c87254.png"},790:function(e,t,n){"use strict";var r=n(648),a=n.n(r),o=n(370),c=n.n(o);const i=document.querySelector("#theme-switch"),s=document.getElementById("dark-theme-icon"),l=document.getElementById("light-theme-icon"),d=document.querySelector(".github-icon"),u=()=>{i.setAttribute("aria-checked","false"),document.documentElement.setAttribute("data-theme","dark"),i.style.justifyContent="flex-start",l.style.transform="translateX(3rem)",s.style.transform="translateX(0rem)",d.src=c()},m=()=>{i.setAttribute("aria-checked","true"),document.documentElement.setAttribute("data-theme","light"),i.style.justifyContent="flex-end",l.style.transform="translateX(0rem)",s.style.transform="translateX(-3rem)",d.src=a()},p=()=>{"light"===document.documentElement.getAttribute("data-theme")?u():m(),localStorage.setItem("theme",document.documentElement.getAttribute("data-theme"))};function h(e){localStorage.setItem("units",e)}const f=document.getElementById("unit-btn");var g=n(214),y=n.n(g),v=n(704),b=n.n(v),w=n(298),$=n.n(w);function E(e,t,n){const r={timeZone:`${t}`};return $()(new Date(b()(e).toLocaleString("en-US",r)),n)}function x(e){return"metric"===localStorage.getItem("units")?`${e.toFixed()}° C`:`${e.toFixed()}° F`}function S(e){const t=e.charAt(0);return e.replace(t,t.toUpperCase())}const k=document.createRange(),C=(e,t)=>`${E(e,t,"yyyy-MM-dd kk:mm:ss")}`;var I=function(e,t){document.getElementById("forecast-header").textContent=`Forecast for ${e}`,Array.from(document.querySelectorAll(".forecast")).forEach((e=>{for(;e.lastChild;)e.removeChild(e.lastChild)})),(e=>{const{current:t,timezone:n,alerts:r}=e,a=document.createElement("div");if(r){const e=`\n    <div id='alert-container'>\n      <div \n        class='alert-header' \n        role='button' \n        aria-label='weather alert'\n        aria-describedby='alert-event'\n        aria-expanded='false' \n        aria-controls='alert-description'\n        tabindex='0'>\n          <span id='alert-event'>${r[0].event}</span>\n          <img class='expand-icon' src='${y()}' aria-hidden='true'/>\n      </div>\n      <div id='alert-description'>\n      ${r[0].description.replace(/\n/g,"<br>")}\n      </div>\n    </div>\n    `,t=k.createContextualFragment(e);a.appendChild(t)}const o=`\n  <div class='current-main weather-info-container'>\n    <div class='current-temps-container'>\n      <div \n        id='current-primary-temp' \n        aria-label='current temperature'\n        aria-describedby='current-primary-temp'>\n          ${x(t.temp)}\n      </div>\n      <div \n        id='current-secondary-temp' \n        aria-label='current temperature'\n        aria-describedby='current-secondary-temp'>\n          Feels like: ${x(t.feels_like)}\n      </div>\n    </div>\n    <div class='current-weather-container'>\n      <img\n        class='current-icon'\n        src='https://openweathermap.org/img/wn/${t.weather[0].icon}@4x.png' \n        alt='' \n        aria-hidden='true'\n      />\n    </div>\n    <div \n    id='current-description' \n    aria-label='current weather'\n    aria-describedby='current-description'>\n      ${S(t.weather[0].description)}\n  </div>\n  </div>\n  <table class='current-table weather-table'>\n    <caption>Additioanl Details</caption>\n    <tr>\n      <th scope='row'>Sunrise</th>\n      <td>\n        <time datetime='${C(t.sunrise,n)}'>\n          ${E(t.sunrise,n,"h:mm aa")}\n        </time>\n      </td>\n    </tr>\n    <tr>\n      <th scope='row'>Sunset</th>\n      <td>\n        <time datetime='${C(t.sunset,n)}'>\n          ${E(t.sunset,n,"h:mm aa")}\n        </time>\n      </td>\n    </tr>\n    <tr>\n      <th scope='row'>Wind</th>\n      <td>${c=t.wind_speed,"metric"===localStorage.getItem("units")?`${(3.6*c).toFixed()} km/h`:`${c.toFixed()} mph`}</td>\n    </tr>\n    <tr>\n      <th scope='row'>Humidity</th>\n      <td>${t.humidity}%</td>\n    </tr>\n    <tr>\n      <th scope='row'>UV Index</th>\n      <td>${function(e){let t=e.toFixed();switch(t){case"0":case"1":case"2":t+=" (low)";break;case"3":case"4":case"5":t+=" (moderate)";break;case"6":case"7":t+=" (high)";break;case"8":case"9":case"10":t+=" (very high)";break;default:t+=" (extreme)"}return t}(t.uvi)}</td>\n    </tr>\n  </table>\n  `;var c;const i=k.createContextualFragment(o);a.appendChild(i),document.getElementById("current-forecast").appendChild(a)})(t),(e=>{const{hourly:t,timezone:n}=e,r=document.createElement("div");for(let e=0;e<25;e++){const a=`\n      <table class='hourly-table weather-table'>\n        <caption>\n          <time datetime='${C(t[e].dt,n)}'>\n            ${E(t[e].dt,n,"h aa")}\n          </time>\n        </caption>\n          <tr>\n            <th scope='row'>Temperature</th>\n            <td>${x(t[e].temp)}</td>\n          </tr>\n          <tr>\n            <th scope='row'>Will Feel Like</th>\n            <td>${x(t[e].feels_like)}</td>\n          </tr>\n          <tr>\n            <th scope='row'>Expected Condition</th>\n            <td>${S(t[e].weather[0].description)}</td>\n          </tr>\n          <tr>\n          <th scope='row'>Chance of Precipitation</th>\n          <td>${(100*t[e].pop).toFixed()}%</td>\n        </tr>\n      </table>\n    `,o=k.createContextualFragment(a);r.appendChild(o)}document.getElementById("hourly-forecast").appendChild(r)})(t),(e=>{const{daily:t,timezone:n}=e,r=document.createElement("div");for(let e=0;e<8;e++){const a=`\n    <table class='daily-table weather-table'>\n      <caption>\n        <time datetime='${C(t[e].dt,n)}'>\n          ${E(t[e].dt,n,"M/d")}\n        </time>\n      </caption>\n        <tr>\n          <th scope='row'>Sunrise</th>\n          <td>\n            <time datetime='${C(t[e].sunrise,n)}'>\n              ${E(t[e].sunrise,n,"h:mm aa")}\n            </time>\n          </td>\n        </tr>\n        <tr>\n          <th scope='row'>Sunset</th>\n          <td>\n            <time datetime='${C(t[e].sunset,n)}'>\n              ${E(t[e].sunset,n,"h:mm aa")}\n            </time>\n          </td>\n        </tr>\n        <tr>\n          <th scope='row'>High</th>\n          <td>${x(t[e].temp.max)}</td>\n        </tr>\n        <tr>\n          <th scope='row'>Low</th>\n          <td>${x(t[e].temp.min)}</td>\n        </tr>\n        <tr>\n          <th scope='row'>Expected Condition</th>\n          <td>${S(t[e].weather[0].description)}</td>\n        </tr>\n        <tr>\n        <th scope='row'>Chance of Precipitation</th>\n        <td>${(100*t[e].pop).toFixed()}%</td>\n      </tr>\n    </table>\n    `,o=k.createContextualFragment(a);r.appendChild(o)}document.getElementById("daily-forecast").appendChild(r)})(t)};function A(e){return[e.name,e.state,e.country].filter((e=>void 0!==e)).join(", ")}function L(){const e=document.querySelector(".search-error-container"),t=document.querySelector(".search-results-container");e&&e.remove(),t&&t.remove()}const B=document.getElementById("location-search"),F="13aa14e68e00ac80cb7c634dc1194d83";const q={timeout:15e3,enableHighAccuracy:!0};var O=async function(e){L();const t=localStorage.getItem("units");let n,r,a,o;try{"load"===e.type||e.target===document.getElementById("unit-btn")?[r,a,o]=function(){const e=JSON.parse(localStorage.getItem("recent location"));return[e.name,e.latitude,e.longitude]}():"submit"===e.type?(n=await async function(){if(!B.value)throw new Error("Search field cannot be blank.");const e=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${B.value}&limit=10&appid=${F}`,{mode:"cors"}),t=await e.json();if(0===t.length||"404"===t.cod)throw new Error(`Location "${B.value}" not found.`);return t.length>1?(function(e){const t=document.createRange(),n=t.createContextualFragment("<div class='search-results-container'></div>"),r=`\n    <div class='results-amount' role='status'>\n      ${e.length} results for "${B.value}":\n    </div>\n  `,a=t.createContextualFragment(r),o=document.createElement("ul");o.className="results-list",o.setAttribute("aria-label",`results for ${B.value}`);for(let n=0;n<e.length;n++){const r=`\n    <li>\n      <a href='#' class='result-item animated' data-index='${n}'>\n        ${A(e[n])}\n      </a>\n    </li>\n    `,a=t.createContextualFragment(r);o.appendChild(a)}document.querySelector(".search-container").insertBefore(n,document.querySelector('label[for="location-search"]')),document.querySelector(".search-results-container").append(a,o)}(t),t[await function(){const e=document.querySelector(".search-results-container");return new Promise((t=>{const n=r=>{r.target.classList.contains("result-item")&&(e.removeEventListener("click",n),t(r.target.dataset.index),L())};e.addEventListener("click",n)}))}()]):t[0]}(),r=A(n),a=n.lat,o=n.lon):(n=await new Promise(((e,t)=>{navigator.geolocation.getCurrentPosition(e,t,q)})),r="Current Location",a=n.coords.latitude,o=n.coords.longitude),B.value="",function(e,t,n){const r={name:e,latitude:t,longitude:n};localStorage.getItem("recent location")!==JSON.stringify(r)&&localStorage.setItem("recent location",JSON.stringify(r))}(r,a,o),document.getElementById("forecast-header").textContent="Loading...";const c=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${o}&exclude=minutely&units=${t}&appid=${F}`),i=await c.json();I(r,i)}catch(e){!function(e){const t=`<div class="search-error-container">${e}</div>`,n=document.createRange().createContextualFragment(t);document.querySelector(".search-container").insertBefore(n,document.querySelector('label[for="location-search"]'))}(e.message)}};window.addEventListener("load",(e=>{"light"===localStorage.getItem("theme")?m():u(),localStorage.getItem("units")?"metric"===localStorage.getItem("units")?f.textContent="Metric":f.textContent="Imperial":h("imperial"),localStorage.getItem("recent location")&&O(e)})),document.getElementById("unit-btn").addEventListener("click",(e=>{"metric"===localStorage.getItem("units")?(f.textContent="Imperial",h("imperial")):(f.textContent="Metric",h("metric")),localStorage.getItem("recent location")&&O(e)}));const j=document.getElementById("theme-switch");j.addEventListener("click",p),j.addEventListener("keydown",(e=>{" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),p())}));const M=document.querySelectorAll(".tab");function P(e){Array.from(M).forEach((e=>{e.classList.remove("active-tab"),e.setAttribute("aria-expanded",!1)})),e.classList.add("active-tab"),e.setAttribute("aria-expanded",!0),Array.from(document.querySelectorAll(".forecast")).forEach((e=>{e.classList.remove("active-forecast")}));const t=e.getAttribute("aria-controls");document.getElementById(`${t}`).classList.add("active-forecast"),function(){const e=document.querySelector("header").scrollHeight;document.documentElement.scrollTop>e&&(document.documentElement.scrollTop=`${e}`)}()}Array.from(M).forEach((e=>{e.addEventListener("click",(e=>{P(e.target)}))})),Array.from(M).forEach((e=>{e.addEventListener("keydown",(e=>{" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),P(e.target))}))}));const N=document.getElementById("current-tab");function D(e){if("alert-header"===e.target.className||"alert-header"===e.target.parentElement.className){"false"===(t=document.querySelector(".alert-header")).getAttribute("aria-expanded")?t.setAttribute("aria-expanded","true"):t.setAttribute("aria-expanded","false"),document.getElementById("alert-description").classList.toggle("expanded"),document.querySelector(".expand-icon").classList.toggle("rotate")}var t}document.querySelector("form").addEventListener("submit",(e=>{e.preventDefault(),O(e),P(N)})),document.querySelector(".use-location-btn").addEventListener("click",(e=>{O(e),P(N)}));const H=document.getElementById("current-forecast");H.addEventListener("click",D),H.addEventListener("keydown",(e=>{" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),D(e))}))}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=function(t,n,a,o){if(!n){var c=1/0;for(l=0;l<e.length;l++){n=e[l][0],a=e[l][1],o=e[l][2];for(var i=!0,s=0;s<n.length;s++)(!1&o||c>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(i=!1,o<c&&(c=o));i&&(e.splice(l--,1),t=a())}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[n,a,o]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,o,c=n[0],i=n[1],s=n[2],l=0;for(a in i)r.o(i,a)&&(r.m[a]=i[a]);for(s&&s(r),t&&t(n);l<c.length;l++)o=c[l],r.o(e,o)&&e[o]&&e[o][0](),e[c[l]]=0;r.O()},n=self.webpackChunk=self.webpackChunk||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=r.O(void 0,[216],(function(){return r(790)}));a=r.O(a)}();