import { getApiInfo } from './api.js';
import { createPaginationFilters } from './pagination.js'; 

// Вибір з DOM
const switchItems = document.querySelectorAll('.switch-item');
const cardContainer = document.querySelector(".bp-list");
const paginContainer = document.querySelector('#tui-pagination-container');
const exercisesList = document.querySelector('.exercises-list');

// Для пагінації
let itemsPerPage = 8;
let currentPage = 1;
let paginationInstance; 
let totalPages; 

// створення карток
// Оновлення кількості карток (при завантаженні сторінки та при зміні розміру вікна)
window.addEventListener('load', () => {
    updateItemsPerPage();
    renderPage();

    // Обробника кліку до кожного елемента карток вправ
    const exercisesListItems = document.querySelectorAll('.exercises-item');
    exercisesListItems.forEach(card => {
        card.addEventListener('click', event => handleExerciseCardClick(event));
    });
});

if (exercisesList) {
    exercisesList.addEventListener('click', function (event) {
        const targetItem = event.target.closest('.exercises-item');
    
        if (targetItem) {
            event.preventDefault();
    
            const bpList = document.querySelector('.bp-list');
            if (bpList) {
                bpList.classList.remove('visually-hidden');
            }
            exercisesList.classList.add('visually-hidden');
            
            const urlParams = new URLSearchParams(window.location.search); // беремо значення урла яке є зараз
            const exerciseKey = targetItem.getAttribute("data-filter"); // беремо значення атрибута
            const exerciseValue = targetItem.getAttribute("data-name");
    
            console.log(exerciseKey);
            console.log(exerciseValue);
    
    
            urlParams.set( exerciseKey.toLowerCase(), exerciseValue.toLowerCase() );
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState(null, null, newUrl); // задаю квері параметри в урлу
    
            renderPage(exerciseValue);
        }
    });
}

window.addEventListener(
    'resize',
    debounce(() => {
        const prevItemsPerPage = itemsPerPage;
        updateItemsPerPage();

        if (prevItemsPerPage !== itemsPerPage) {
            renderPage();
        }
    }, 250)
);


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
    if (window.innerWidth < 768) {
        itemsPerPage = 8;
    } else {
        itemsPerPage = 9;
    }
}

// Отримання даних з API (асинхронний запит)
async function fetchDataFromApi(exercise) {
    try {
        const response = await getApiInfo({ ...exercise , type: 'exercises' });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data from API: ' + error.message);
    }
}

// Рендеринг сторінки
async function renderPage() {
    try {
        const activeContainer = document.querySelector('.switch-item.is-active');
        if (!activeContainer) {
            return;
        }

        // Для запиту
        const query = activeContainer.textContent.trim().toLowerCase();
        if (!query) {
            console.error('Query is undefined');
            return;
        }

        // Для даних з API
        const searchParams = new URLSearchParams(window.location.search); // Беремо дані з url qewry params
        let bodypart = searchParams.get("bodypart");
        let muscles = searchParams.get("muscles");
        let equipment = searchParams.get("equipment");

        if (searchParams.size) {
            const exerciseData = await fetchDataFromApi({ bodypart, muscles, equipment });

            // Рендеринг вправ (поточна сторінка)
            renderExerciseCards(exerciseData.results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        }

        const urlParams = new URLSearchParams(window.location.search); // очищають url
        window.history.replaceState(null, null, window.location.pathname ); // очищають url

    } catch (error) {
        console.error('Error fetching and rendering data:', error);
    }
}



// Рендеринг карток вправ
async function renderExerciseCards(exerciseData) {
    try {
        if (!exerciseData || exerciseData.length === 0) {
            console.log('No exercise data to render');
            return;
        }

        console.log("Rendering exercise cards with data:", exerciseData);

        let markup = '';
        exerciseData.forEach(exercise => {
            markup += renderExerciseCardMarkup(exercise);
        });

        cardContainer.innerHTML = markup;
        paginContainer.innerHTML = '';

        if (totalPages > 1) {
          paginationInstance = createPaginationFilters(
            paginContainer,
            totalPages,
            currentPage,
            pageSize,
            onPageChange
          );
        }
    } catch (error) {
        console.error('Error rendering exercise cards:', error);
    }
}

// Шаблон для картки вправ
function renderExerciseCardMarkup(exercise) {

    let markup = `
    <li class="bp-item" data-id="${exercise._id}">
    <div class="bp-exercisecard-wraper">
        <div class="bp-rating-info">
        <span class="bp-workout-span">WORKOUT</span>
        <span class="bp-rating">${capitalizeFirstLetter(exercise.rating)}</span>
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
        <span>${capitalizeFirstLetter(exercise.name)}</span>
    </div>

    <div class="bp-block-info">
        <div class="bp-calories">
            <span class="bp-block-info-title">Burned calories: </span>
            <span class="bp-block-info-value calories-value">${capitalizeFirstLetter(exercise.burnedCalories)}</span>
            <span class="bp-block-info-value">/ ${exercise.time} min</span>
        </div>
        <div class="bp-body-part">
            <span class="bp-block-info-title">Body part: </span>
            <span class="bp-block-info-value body-part-value">${capitalizeFirstLetter(exercise.bodyPart)}</span>
        </div>
        <div class="bp-target">
            <span class="bp-block-info-title">Target: </span>
            <span class="bp-block-info-value bp-target-value">${capitalizeFirstLetter(exercise.target)}</span>
        </div>
    </div>
    </li>`;

    return markup;
}
function capitalizeFirstLetter(word) {
    // Перевірка чи починається слово з букви
    if (/^[a-zA-Z]/.test(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return word; // якщо перший символ є цифрою або іншим символом, нічого не робимо
    }
}
// Обробник на елемент переключення
function handleSwitchItemClick() {
    switchItems.forEach(item => item.classList.remove('is-active'));
    this.classList.add('is-active');
    currentPage = 1;

    renderPage();
}

// Додавання обробника кліку до кожного елемента переключення
// switchItems.forEach(item => {
//     item.addEventListener('click', handleSwitchItemClick);
// });




export { capitalizeFirstLetter };
