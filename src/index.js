import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.hidden = true;
error.hidden = true;
catInfo.hidden = true;

function loadBreeds() {
    loader.hidden = false;
    breedSelect.hidden = true;
    error.hidden = true;
  
    fetchBreeds()
      .then(breeds => {
        createBreedSelect(breeds);
        breedSelect.hidden = false;
      })
      .catch(error => {
        showError('Failed to load breeds.');
      })
      .finally(() => {
        loader.hidden = true;
      });
}
  
function createBreedSelect(breeds) {
    breedSelect.innerHTML = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
}
  
function onBreedSelect(event) {
    const breedId = event.target.value;

    catInfo.innerHTML= '';
    loader.hidden = false;
    catInfo.hidden = true;
    error.hidden = true;
  
    fetchCatByBreed(breedId)
      .then(catData => {
        displayCatInfo(catData);
      })
      .catch(error => {
        showError('Failed to load cat details.');
      })
      .finally(() => {
        loader.hidden = true;
      });
}
  

function displayCatInfo(catData) {
    const { breeds, url } = catData;
    const { name, description, temperament } = breeds[0];
  
    catInfo.innerHTML = `<div>
  <img src="${url}" alt="Cat image" width="300" /></div>
  <div>
  <h2>${name}</h2>
  <p>${description}</p>
  <p><strong>Temperament:</strong> ${temperament}</p></div>
    `;
  
    catInfo.hidden = false;
}
  
function showError(message) {
    error.textContent = message;
    error.hidden = false;
}
  
breedSelect.addEventListener('change', onBreedSelect);
  
loadBreeds();