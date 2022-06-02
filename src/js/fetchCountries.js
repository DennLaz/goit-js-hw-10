import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ROOT_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(
    `${ROOT_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notify.failure('Oops, there is no country with that nam!')
      );
    }
    return response.json();
  });
}
