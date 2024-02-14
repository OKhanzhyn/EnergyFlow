import axios from 'axios';
import { getApiInfo } from './api.js';
import {capitalizeFirstLetter} from '../js/exercises-list.js';

const modalExBtn = document.querySelector('.bp-list');
const modalWindow = document.querySelector('.backdrop');

modalExBtn.addEventListener('click', handleModal);

async function handleModal(event) {
if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  modalWindow.classList.remove("is-hidden");
  const liEl = event.target.closest('li');
  
  const cardId = liEl.dataset.id;
  try {
    const card = await axios.get(`https://energyflow.b.goit.study/api/exercises/${cardId}`);
    createModalMarkup(card.data);

    const starsDiv = document.querySelector(".stars-wraper");
    const stars = starsDiv.children;
    const rating = Math.round(card.data.rating);
    starsRating(stars, rating);


  } catch (err) {
    console.log(err);    
  }  
  
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  modalCloseBtn.addEventListener('click', handleModalClose);
  
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      handleModalClose(event);
    }
  });
  
  modalWindow.addEventListener('click', event => {
    if (event.currentTarget === event.target) {
      handleModalClose(event);
    }
  })
} 

function handleModalClose() {
  modalWindow.classList.add("is-hidden");
  window.removeEventListener('keydown', event => {
    if (event.code === 'Escape') {
      handleModalClose(event);
    }
  });
}

function createModalMarkup ({gifUrl, name, rating, target, bodyPart, equipment, burnedCalories, popularity, description}) {    
  const markup =
     `<div class="modal">
    <button class="modal-close-btn" type="button">
      <svg class="close-me-icon" viewBox="0 0 32 32" width="24" height="24">
        <use href="./img/sprite.svg#icon-close"></use>
      </svg>
    </button>
    <div class="modal-wraper">
      <div class="modal-exercises-image">
        <img
          class="exercise-image"
          src="${gifUrl}"
          alt="showing exercise"
        />
      </div>
      <div class="modal-info-wraper">
        <h2 class="me-title">${capitalizeFirstLetter(name)}</h2>
        <div class="rating-wraper">
          <span class="rating">${Math.round(rating).toFixed(1)}</span>
          <div class="stars-wraper">
            <svg class="icon-star dimmed-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star dimmed-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star dimmed-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star dimmed-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg
              class="icon-star dimmed-star"
              viewBox="0 0 32 32"
              width="13"
              height="13"
            >
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
          </div>
        </div>
        <div class="me-block-info">
          <div class="me-block-info-target">
            <h3 class="block-info-name">Target</h3>
            <span class="block-info-value">${capitalizeFirstLetter(target)}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Body Part</h3>
            <span class="block-info-value">${capitalizeFirstLetter(bodyPart)}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Equipment</h3>
            <span class="block-info-value">${capitalizeFirstLetter(equipment)}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Popular</h3>
            <span class="block-info-value">${popularity}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Burned Calories</h3>
            <div class="calories-wrap">
              <span class="block-info-value">${burnedCalories}</span
              ><!--
--><span class="block-info-static-value">/3 min</span>
            </div>
          </div>
        </div>
        <p class="exersice-text">
          ${capitalizeFirstLetter(description)}
        </p>
        <button class="add-to-favorites-btn" type="button">
          Add to favorites
          <svg class="heart-icon" viewBox="0 0 32 32" width="13" height="13">
            <use href="../img/sprite.svg#icon-like" />
          </svg>
        </button>
        <button class="give-rating-btn" type="button">Give a rating</button>
      </div>   
       </div>
    </div> 
    `    ;
  modalWindow.innerHTML = markup;
};

function starsRating(array, rating) {  
  const arr = Array.from(array);
    arr.forEach((star, i) => {
    i < rating ? star.classList.remove('dimmed-star') : null;
  });
}