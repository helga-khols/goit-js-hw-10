import Notiflix from 'notiflix';

function fetchCountries(countryName) {
  const url = `https://restcountries.com/v3.1/name/`;
  const searchFilter = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${countryName}${searchFilter}`).then(r => {
    if (!r.ok) {
      Notiflix.Notify.failure('Ooops, there is no contry with that name');
      return;
    } else return r.json();
  });
}

export { fetchCountries };
