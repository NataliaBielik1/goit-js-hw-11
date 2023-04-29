import "./css/styles.css";
import fetchCountries from "./fetchCountries";
import { Notify } from "notiflix";

var debounce = require("lodash.debounce");

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("input");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function renderCountry(c) {
  let languages = [];
  for (const key in c.languages) {
    languages.push(c.languages[key]);
  }

  let languagesStr = languages.join(", ");

  countryInfo.innerHTML = `
        <h2>
            <img src="${c.flags.svg}" class="flag" alt="${c.flags.alt}" /> 
            <span>${c.name.common}</span>
        </h2>
        <p>Capital: ${c.capital[0]}</p>
        <p>Population: ${c.population}</p>
        <p>Languages: ${languagesStr}</p>
    `;
}

function renderCountryList(items) {
  countryList.innerHTML = items
    .map(
      c =>
        `<li><img src="${c.flags.svg}" alt="${c.flags
          .alt}" class="flag" /> <span>${c.name.common}</span></li>`
    )
    .join("");
}

const onInput = async e => {
  let name = e.target.value.trim();

  countryInfo.innerHTML = "";
  countryList.innerHTML = "";

  if (name === "") {
    return;
  }

  let response = await fetchCountries(name);

  if (response.status === 404) {
    Notify.failure("Oops, there is no country with that name");
    return;
  }

  const items = await response.json();

  if (items.length > 10) {
    Notify.info("Too many matches found. Please enter a more specific name.");
    return;
  }

  if (items.length > 1) {
    renderCountryList(items);
    return;
  }

  if (items.length === 1) {
    renderCountry(items[0]);
    return;
  }
};

input.oninput = debounce(onInput, DEBOUNCE_DELAY);
