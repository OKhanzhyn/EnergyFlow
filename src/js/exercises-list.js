import { getApiInfo } from './api.js';

const switchItems = document.querySelectorAll('.switch-item');
const cardContainer = document.querySelector(".exercises-list");
const paginationContainer = document.querySelector('.exercises-page');

const itemsPerPage = 8;
let currentPage = 1;

async function fetchDataFromApi(exercise) {
    try {
        const response = await getApiInfo({ filter: exercise, type: 'exercises' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data from API: ' + error.message);
    }
}

async function renderPage() {
    try {
        const activeContainer = document.querySelector('.switch-item.is-active');
        if (!activeContainer) {
            console.error('No active container found');
            return;
        }
        const query = activeContainer.textContent.trim().toLowerCase(); 
        if (!query) {
            console.error('Query is undefined');
            return;
        }
        const exerciseData = await fetchDataFromApi(query);

        const totalPages = Math.ceil(exerciseData.results.length / itemsPerPage);

        renderExerciseCards(exerciseData.results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));

        if (exerciseData.results.length > itemsPerPage) {
            renderPagination(totalPages);
        }
    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
}

function renderPagination(totalPages) {
    if (!paginationContainer) {
        console.error('Pagination container not found');
        return;
    }

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page ${i === currentPage ? 'is-active' : ''}">${i}</button>`;
    }
    paginationContainer.innerHTML = paginationHTML;

    const paginationItems = paginationContainer.querySelectorAll('.page');
    paginationItems.forEach(item => {
        item.addEventListener('click', () => {
            currentPage = parseInt(item.textContent);
            renderPage();
        });
    });
}

async function renderExerciseCards(exerciseData) {
    try {
        if (!exerciseData || exerciseData.length === 0) {
            console.log("No exercise data to render");
            return;
        }

        console.log("Rendering exercise cards with data:", exerciseData);
        
        let markup = '';
        exerciseData.forEach(exercise => {
            markup += template(exercise);
        });
        
        cardContainer.innerHTML = markup;

        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('Clicked on exercise:', card.querySelector('h2').textContent);
            });
        });
    } catch (error) {
        console.error('Error rendering exercise cards:', error);
    }
}

function template(exercise) {
    return `
    <div class="exercise-card">
    <li class="bp-item">
    <div class="bp-exercisecard-wraper">
      <div class="bp-rating-info">
        <span class="bp-workout-span">WORKOUT</span>
        <span class="bp-rating">${exercise.rating}</span>
        <svg
          class="icon-star"
          viewBox="0 0 32 32"
          width="13"
          height="13"
        >
          <use href="./img/sprite.svg#icon-star"></use>
        </svg>
      </div>

      <button class="bp-start-button" type="button">
        Start
        <svg
          class="bp-arrow"
          viewBox="0 0 32 32"
          width="14"
          height="14"
        >
          <use href="./img/sprite.svg#icon-arrow" />
        </svg>
      </button>
    </div>

    <div class="bp-exercise-name">
      <svg
        class="bp-run-icon"
        viewBox="0 0 32 32"
        width="14.07"
        height="16"
      >
        <use href="./img/sprite.svg#icon-running-man" />
      </svg>
      <span>${exercise.name}</span>
    </div>

    <div class="bp-block-info">
      <div class="bp-calories">
        <span class="bp-block-info-title">Burned calories: </span>
        <span class="bp-block-info-value calories-value">${exercise.burnedCalories}</span>
        <span class="bp-block-info-value">/ ${exercise.time} min</span>
      </div>
      <div class="bp-body-part">
        <span class="bp-block-info-title">Body part: </span>
        <span class="bp-block-info-value body-part-value">${exercise.bodyPart}</span>
      </div>
      <div class="bp-target">
        <span class="bp-block-info-title">Target: </span>
        <span class="bp-block-info-value bp-target-value">${exercise.target}</span>
      </div>
    </div>
  </li>`;
}

function handleSwitchItemClick() {
    switchItems.forEach(item => item.classList.remove('is-active'));
    this.classList.add('is-active');

    renderPage();
}

switchItems.forEach(item => {
    item.addEventListener('click', handleSwitchItemClick);
});

renderPage();