import { getApiInfo } from './api.js';

// Вибір з DOM
const switchItems = document.querySelectorAll('.switch-item');
const cardContainer = document.querySelector(".bp-list");
const paginationContainer = document.querySelector('.exercises-page');

// Для пагінації
let itemsPerPage = 8;
let currentPage = 1;

// Для брейкпойнтів
const mobileBreakpoint = 768;
const tabletBreakpoint = 1440;

// Затримувач для resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Визначення кількості карток на сторінці (в залежності від розміру екрану)
function updateItemsPerPage() {
    if (window.innerWidth < mobileBreakpoint) {
        itemsPerPage = 8; // для моб
    } else if (window.innerWidth < tabletBreakpoint) {
        itemsPerPage = 9; // для таби
    } else {
        itemsPerPage = 9; // для десктопів
    }
}

// Отримання даних з API (асинхронний запит)
async function fetchDataFromApi(exercise) {
    try {
        const response = await getApiInfo({ filter: exercise, type: 'exercises' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data from API: ' + error.message);
    }
}

// Рендеринг сторінки
async function renderPage() {
    try {
        // Для активного контейнера
        const activeContainer = document.querySelector('.switch-item.is-active');
        if (!activeContainer) {
            console.error('No active container found');
            return;
        }
        // Для запиту
        const query = activeContainer.textContent.trim().toLowerCase();
        if (!query) {
            console.error('Query is undefined');
            return;
        }
        // Для даних з API
        const exerciseData = await fetchDataFromApi(query);

        // Загальна кількість сторінок
        const totalPages = Math.ceil(exerciseData.results.length / itemsPerPage);

        // Рендеринг вправ (поточна сторінка)
        renderExerciseCards(exerciseData.results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));

        // Якщо кількість вправ більше однієї сторінки
        if (exerciseData.results.length > itemsPerPage) {
            renderPagination(totalPages);
        }
    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
}

// Рендеринг пагінації
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
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Додали preventDefault()
            currentPage = parseInt(item.textContent);
            renderPage();
        });
    });
}

// Рендеринг карток вправ
async function renderExerciseCards(exerciseData) {
    try {
        if (!exerciseData || exerciseData.length === 0) {
            console.log("No exercise data to render");
            return;
        }

        console.log("Rendering exercise cards with data:", exerciseData);

        if (!cardContainer) {
            console.error('Card container not found');
            return;
        }

        let markup = '';
        exerciseData.forEach(exercise => {
            markup += template(exercise);
        });

        cardContainer.innerHTML = markup;

        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            card.addEventListener('click', () => {
                console.log('Clicked on exercise:', card.querySelector('h2').textContent);

                // Змінюємо віжуалі-хідден для контейнера .bp-list
                cardContainer.classList.remove('visual-hidden');
                // Змінюємо віжуалі-хідден для картки, яка була натиснута
                card.classList.add('visual-hidden');
            });
        });
    } catch (error) {
        console.error('Error rendering exercise cards:', error);
    }
}

// Шаблон для картки вправ
function template(exercise) {
    return `
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

// Обробник на елемент переключення
function handleSwitchItemClick() {
    switchItems.forEach(item => item.classList.remove('is-active'));
    this.classList.add('is-active');

    renderPage();
}

// Додавання обробника кліку до кожного елемента переключення
switchItems.forEach(item => {
    item.addEventListener('click', handleSwitchItemClick);
});

// Оновлення кількості карток (при завантаженні сторінки та при зміні розміру вікна)
window.addEventListener('load', () => {
    updateItemsPerPage();
    renderPage();
});

window.addEventListener('resize', debounce(() => {
    const prevItemsPerPage = itemsPerPage;
    updateItemsPerPage();

    if (prevItemsPerPage !== itemsPerPage) {
        renderPage();
    }
}, 250));