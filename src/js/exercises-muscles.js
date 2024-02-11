import axios from 'axios';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

let defaults = 'muscles';
const switcList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const page = document.querrySelector('exercises-page')
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

async function get() {
  try {
    const exercises = await getApiInfo({
      type: 'filters',
      filter: 'Muscles',
      limit: pageSize,
    }).then(data => {
      const { results } = data;
      exercisesList.innerHTML = markup(results);
   });
  } catch {
    console.error;
  }
}
get();

switcList.addEventListener('click', filter);
async function filter(event) {
  event.preventDefault();
  let curPage = 1;
  const fitV = event.target;
  const query = fitV.dataset.filter;
  console.log(query)
  exercisesList.innerHTML = ''
  Array.from(event.currentTarget.children).map(it => {
    if (it.textContent !== event.target.textContent) {
      it.classList.remove('is-active');
    } else {
      it.classList.add('is-active');
    }
  })
      try {
        getApiInfo({
          type: 'filters',
          filter: query,
          limit: pageSize,
        }).then(data => {
          const { results } = data;
          console.log(results)
          exercisesListinnerHTML = markup(results);
        })
    } catch {}
}


const result = exercises.results;
exercisesList.innerHTML = markup(result);

console.log(result);


function markup(results) {
  const mark = results
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
  return mark;
}