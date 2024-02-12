import axios from 'axios';

// import { currentPage, renderPagination } from './pagination.js';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

const switcList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const pagContainer = document.querySelector('.exercises-page');

let pageSize = 8;
let currentPage = 1;
let defaultPage = 'Muscles';

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
  try {
    const exercises = await getApiInfo({
      type: 'filters',
      filter: defaultPage,
      limit: pageSize,
      page: currentPage,
    }).then(data => {
      const { page, totalPages, results } = data;

      exercisesList.innerHTML = createMarkup(results);
      pagContainer.innerHTML = '';

      if (totalPages > 1) {
        const pagination = addPagPages(page, totalPages);
        pagContainer.innerHTML = pagination;
      }
    });
  } catch {
    console.error;
  }
}

getExercises();

switcList.addEventListener('click', filterBtn);
pagContainer.addEventListener('click', onPagination);

async function filterBtn(event) {
  event.preventDefault();

  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  currentPage = 1;
  const filterValue = event.target;
  const query = filterValue.dataset.filter;
  defaultPage = query;

  exercisesList.innerHTML = '';

  Array.from(event.currentTarget.children).map(item => {
    if (item.textContent !== event.target.textContent) {
      item.classList.remove('is-active');
    } else {
      item.classList.add('is-active');
    }
  });

  try {
    getApiInfo({
      type: 'filters',
      filter: query,
      limit: pageSize,
      page: currentPage,
    }).then(data => {
      const { page, totalPages, results } = data;

      exercisesList.innerHTML = createMarkup(results);
      pagContainer.innerHTML = '';

      if (totalPages > 1) {
        const pagination = addPagPages(page, totalPages);
        pagContainer.innerHTML = pagination;
      }
    });
  } catch {}
}

function createMarkup(results) {
  const markUp = results
    .map(
      ({ name, filter, imgUrl }) =>
        `<li class="exercises-item">
          <a class="exercises-link" href="">
          <div class="image-container">
              <img class="exercises-image" src="${imgUrl}"/>
              <div class="text-container">
                <h3 class="exercises-title">${name}</h3>
                <p class="exercises-text">${filter}</p>
              </div>
            </div>
          </a>
         </li>`
    )
    .join('');
  return markUp;
}

async function onPagination(event) {
  currentPage = Number(event.target.textContent);

  console.log(currentPage);

  Array.from(event.currentTarget.children).map(item => {
    if (item.textContent !== currentPage) {
      item.classList.remove('is-active');
    } else {
      event.target.classList.add('is-active');
    }
  });

  exercisesList.innerHTML = '';

  try {
    const { page, totalPages, results } = await getExercises();
    if (page === totalPages) {
      return;
    }
    exercisesList.innerHTML = createMarkup(results);
  } catch {
    console.error('Oops, something wrong');
  }
}

function addPagPages(page, totalPages) {
  let paginationHtml = '';

  for (let i = 1; i <= totalPages; i += 1) {
    paginationHtml += `<button class="page is-active" type="button">${i}</button>`;
  }
  return paginationHtml;
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
