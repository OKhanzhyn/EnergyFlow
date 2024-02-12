import { getApiInfo } from './api.js'


const modalExBtn = document.querySelector('.bp-start-button');
const modalWindow = document.querySelector('.backdrop');
const modalClose = document.querySelector('.modal-close-btn');

async function fetchDataFromApi(exercise) {
    try {
        const response = await getApiInfo({ filter: exercise, type: 'exercises' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data from API: ' + error.message);
    }
}

modalExBtn.addEventListener("click", handleModal);

function handleModal() {
    console.log("fhfgh");
}



// function 
// getApiInfo.then(({ data }) => data)

function createModalMarkup () {    
    return
      `
      <div class="modal-exercises-image">
        <img
          class="exercise-image"
          src="${gifUrl}"
          alt="showing exercise"
        />
      </div>
      <div class="modal-info-wraper">
        <h2 class="me-title">${name}</h2>
        <div class="rating-wraper">
          <span class="rating">${rating}</span>
          <div class="stars-wraper">
            <svg class="icon-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star" viewBox="0 0 32 32" width="13" height="13">
              <use href="./img/sprite.svg#icon-star"></use>
            </svg>
            <svg class="icon-star" viewBox="0 0 32 32" width="13" height="13">
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
            <span class="block-info-value">${target}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Body Part</h3>
            <span class="block-info-value">${bodyPart}</span>
          </div>
          <div class="me-block-info-target">
            <h3 class="block-info-name">Equipment</h3>
            <span class="block-info-value">${equipment}</span>
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
          ${description}
        </p>
        <button class="add-to-favorites-btn" type="button">
          Add to favorites
          <svg class="heart-icon" viewBox="0 0 32 32" width="13" height="13">
            <use href="../img/sprite.svg#icon-like" />
          </svg>
        </button>
        <button class="give-rating-btn" type="button">Give a rating</button>
      </div>    
    `    
};