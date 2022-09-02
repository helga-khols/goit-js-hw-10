import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetch-country';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input'),
  list: document.querySelector('ul'),
  div: document.querySelector('div'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  event.preventDefault();
  const searchCountry = event.target.value.trim();

  if (searchCountry !== '') {
    fetchCountries(searchCountry)
      .then(data => {
        if (data.length === 1) {
          createCountryCard(data);
        } else if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          clearTemplate();
        } else if (data.length >= 2 && data.length <= 10) {
          CreateCountriesList(data);
        }
      })
      .catch(() => {
        console.log('catch');
        onFetchError;
      });
  } else {
    clearTemplate();
  }
}

function onFetchError() {
  clearTemplate();
  Notiflix.Notify.failure('Ooops, there is no contry with that name');
}

function createCountryCard(country) {
  clearTemplate();
  const markup = country
    .map(
      item => `<p>
    <img src="${item.flags.svg}" alt="${
        item.name.official
      }" class="info__img"> <span class="info__title">${
        item.name.official
      }</span>
  </p>
  <p class="info__text"><span>Capital:</span> ${item.capital}</p>
  <p class="info__text"><span>Population:</span> ${item.population}</p>
  <p class="info__text"><span>Language:</span> ${Object.values(
    item.languages
  )}</p>`
    )
    .join('');

  return (refs.div.innerHTML = markup);
}

function CreateCountriesList(country) {
  clearTemplate();
  const markup = country
    .map(
      item => `<li> <p>
    <img src="${item.flags.svg}" alt="${item.name.official}" class="info__img"> <span class="info__title">${item.name.official}</span>
  </p></li>`
    )
    .join('');
  return (refs.list.innerHTML = markup);
}

function clearTemplate() {
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';
}
