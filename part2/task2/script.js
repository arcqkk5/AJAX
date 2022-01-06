'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const images = document.querySelector('.images');
let currentImage;

const createImageElement = function (imagePath) {
  return new Promise(function (resolve, reject) {
    const imageElement = document.createElement('img');
    imageElement.src = imagePath;

    imageElement.addEventListener('load', function () {
      images.append(imageElement);
      resolve(imageElement);
    });

    imageElement.addEventListener('error', function () {
      reject(new Error('Путь не найден!'));
    });
  });
};

createImageElement('img/image1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Первое изображение загружено!');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImageElement('img/image2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Второе изображение загружено!');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(e => console.error(e));
