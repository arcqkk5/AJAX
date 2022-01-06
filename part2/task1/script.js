'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////

const displayCountryByGPS = function (lat = 0, lng = 0) {
  fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) throw new Error(`проблема с количеством запросов!`);
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.country}, ${data.city}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => response.json())
    .then(data => displayCountry(data[0]))
    .catch(e => {
      console.log(`Что-то пошло не так! Ошибка: ${e.message}`);
    });
};

const displayCountry = function (data, className = '') {
  const currencies = data.currencies;
  const currencyName = Object.values(currencies)[0].name;
  const currencySymbol = Object.values(currencies)[0].symbol;
  const languages = data.languages;
  const firstLang = Object.values(languages)[0];

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
            +data.population / 1000000
          ).toFixed(1)} million.</p>
          <p class="country__row"><span>🗣️</span>${firstLang}</p>
          <p class="country__row"><span>💰</span>${currencySymbol} ${currencyName}</p>
        </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

//1 - done
//2 - done
//3 - done
//4 - done
//5 - done
//6 - done
//7 - done

//test data
displayCountryByGPS(35.756, 139.256);
displayCountryByGPS(48.857, 2.358);
displayCountryByGPS(40.708, -74.051);
