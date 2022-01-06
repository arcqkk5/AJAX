'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////
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

// const getCountryData = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     const currencies = data.currencies;
//     const currencyName = Object.values(currencies)[0].name;
//     const currencySymbol = Object.values(currencies)[0].symbol;
//     const languages = data.languages;
//     const firstLang = Object.values(languages)[0];

//     const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flags.png}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
//             +data.population / 1000000
//           ).toFixed(1)} Млн.</p>
//           <p class="country__row"><span>🗣️</span>${firstLang}</p>
//           <p class="country__row"><span>💰</span>${currencySymbol} ${currencyName}</p>
//         </div>
//       </article>
//     `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// const getCountryBorderCountry = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     displayCountry(data);

//     //Получение соседних стран
//     const [firstNeighbour] = data.borders;
//     if (!firstNeighbour) return;

//     const request1 = new XMLHttpRequest();
//     request1.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${firstNeighbour}`
//     );
//     request1.send();

//     request1.addEventListener('load', function () {
//       const [data1] = JSON.parse(this.responseText);
//       console.log(data1);

//       displayCountry(data1, 'neighbour');
//     });
//   });
// };

// getCountryBorderCountry('ukraine');

//old
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
// request.send();

// const requestFetch = fetch('https://restcountries.com/v3.1/name/ukraine');
// console.log(requestFetch);

// const getCountryData = function (countryName) {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(function (response) {
//       // console.log(response);
//       return response.json();
//     })
//     .then(function (response1) {
//       // console.log(response1);
//       displayCountry(response1[0]);
//     });
// };
// getCountryData('russia');

const getCountryData = function (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayCountry(data[0]);
      const firstNeighbour = data[0].borders[0];
      if (!firstNeighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${firstNeighbour}`);
    })
    .then(response => response.json())
    .then(data => displayCountry(data[0], 'neighbour'))
    .catch(error => alert(error));
};

btn.addEventListener('click', function () {
  getCountryData('russia');
});

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('Вы выиграли!');
//   } else {
//     reject('Вы проиграли:(');
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Промисификация API гколокации

// console.log('Получение местоположения!');
const getUserPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      e => reject(e)
    );
  });
};

getUserPosition()
  .then(pos => console.log(pos))
  .catch(e => console.error(e));
