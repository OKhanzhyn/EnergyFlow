import axios from 'axios';
import { createPaginationFilters } from './pagination.js'; // Импортируем функцию создания пагинации

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

const switchList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const pagContainer = document.querySelector('#tui-pagination-container');
const bpFormWrapper = document.querySelector('.bp-form-wraper');

let pageSize = 8;
let currentPage = 1;
let defaultPage = 'Muscles';
let paginationInstance;

switchList.addEventListener('click', filterBtn);

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

function resizePage() {
  if (window.innerWidth < 767) {
    pageSize = 8;
  } else if (window.innerWidth < 768) {
    pageSize = 12;
  } else {
    pageSize = 12;
  }
}

async function getApiInfo({ filter, page = 1, limit = 12, type }) {
  try {
    const response = await axios.get(`/${type}`, {
      params: {
        filter,
        page,
        limit,
      },
    });
    return response.data;
  } catch {
    console.error('Something wrong');
  }
}

async function getExercises() {
  bpFormWrapper.classList.add('visually-hidden');
  try {
    const data = await getApiInfo({
      type: 'filters',
      filter: defaultPage,
      limit: pageSize,
      page: currentPage,
    });

    const { page, totalPages, results } = data;

    exercisesList.innerHTML = createMarkup(results);
    pagContainer.innerHTML = '';

    if (totalPages > 1) {
      paginationInstance = createPaginationFilters(
        pagContainer,
        totalPages,
        currentPage,
        pageSize,
        onPageChange
      );
    }
  } catch {
    console.error;
  }
}

function onPageChange(page) {
  currentPage = page;
  getExercises();
}

async function filterBtn(event) {
  event.preventDefault();

  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  exercisesList.innerHTML = '';
  currentPage = 1;
  const filterValue = event.target;
  const query = filterValue.dataset.filter;
  defaultPage = query;

  Array.from(event.currentTarget.children).map(item => {
    if (item.textContent !== event.target.textContent) {
      item.classList.remove('is-active');
    } else {
      item.classList.add('is-active');
    }
  });

  try {
    await getExercises();
  } catch {
    console.error('oops');
  }
}

function createMarkup(results) {
  const markUp = results
    .map(
      ({ name, filter, imgUrl }) =>
        `<li class="exercises-item" data-filter="${filter}" data-name="${name}">         
          <div class="image-container">
            <img class="exercises-image" src="${imgUrl}" alt="${filter}"/>
            <div class="text-container">
              <h3 class="exercises-title">${name}</h3>
              <p class="exercises-text">${filter}</p>
            </div>
          </div>
         </li>`
    )
    .join('');
  return markUp;
}

window.addEventListener('load', () => {
  resizePage();
  getExercises();
});

addEventListener(
  'resize',
  debounce(() => {
    const prevItemsPerPage = pageSize;
    resizePage();

    if (prevItemsPerPage !== pageSize) {
      getExercises();
    }
  }, 250)
);
