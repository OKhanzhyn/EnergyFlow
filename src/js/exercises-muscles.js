import axios from 'axios';

import { renderPagination } from './pagination.js';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

let defaults = 'muscles';
const switcList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const page = document.querySelector('.exercises-page')
const mediaQuery = window.innerWidth;
let pageSize;


if (window.innerWidth < 767) {
    pageSize = 8;
  } else {
    pageSize = 12;
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
    console.error('n');
  }
}

async function getAxios() {
  try {
    const exercises = await getApiInfo({
      type: 'filters',
      filter: 'Muscles',
      limit: pageSize,
    }).then(data => {
      const { results } = data;
      exercisesList.innerHTML = createMarkup(results);
   });
  } catch {
    console.error;
  }
}
getAxios();

switcList.addEventListener('click', filterBtn);
async function filterBtn(event) {
  event.preventDefault();

  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  let curPage = 1;
  const filterValue = event.target;
  const query = filterValue.dataset.filter;
 
  exercisesList.innerHTML = ''
  Array.from(event.currentTarget.children).map(item => {
    if (item.textContent !== event.target.textContent) {
      item.classList.remove('is-active');
    } else {
      item.classList.add('is-active');
    }
  })
      try {
        getApiInfo({
          type: 'filters',
          filter: query,
          limit: pageSize,
        }).then(data => {
          const { results } = data;
          
          exercisesList.innerHTML = createMarkup(results);
        })
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

// Для пагінації
let itemsPerPage = 8;
let currentPage = 1;
// Для брейкпойнтів
const mobileBreakpoint = 768;
const tabletBreakpoint = 1440;
// Визначення кількості карток на сторінці (в залежності від розміру екрану)
function updateItemsPerPage() {
    if (window.innerWidth < mobileBreakpoint) {
        itemsPerPage = 8; // для моб
    } else if (window.innerWidth < tabletBreakpoint) {
        itemsPerPage = 12; // для таби
    } else {
        itemsPerPage = 12; // для десктопів
    }
}
// Додавання обробника кліку для кожної кнопки пагінації
// page.addEventListener('click', function(event) {
//     if (event.target.classList.contains('page')) {
//         currentPage = parseInt(event.target.textContent);
//         renderPage(currentPage);
//     }
// });

 