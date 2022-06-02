import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import templateList from './templates/country-list.hbs';
import templateInfo from './templates/country-info.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputValue, DEBOUNCE_DELAY));

function onInputValue() {
  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    return;
  }

  let lenguagesOfCountry;

  fetchCountries(inputValue)
    .then(data => {
      data.forEach(
        el => (lenguagesOfCountry = Object.values(el.languages).join())
      );

      if (data.length > 10) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (data.length >= 2 && data.length <= 10) {
        countryInfoEl.innerHTML = '';
        const items = templateList(data);
        countryListEl.innerHTML = items;
      } else {
        countryListEl.innerHTML = '';
        data.lenguages = lenguagesOfCountry;
        const info = templateInfo(data);
        countryInfoEl.innerHTML = info;
      }
    })
    .catch(error => {});
}
