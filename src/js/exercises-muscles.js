import axios from 'axios';

axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

let defaults = 'muscles';
const switcList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const mediaQuery = window.innerWidth;
let pageSize;

if (window.innerWidth < 767) {
    pageSize = 8;
  } else {
    pageSize = 12;
  }
  
 console.log('PageSize:', pageSize);


const exercises = await axios
  .get('/filters', {
    params: {
      filter: 'Muscles',
      limit: pageSize,
    }
  })
  .then(({ data }) => data
  )
  .catch(console.error);

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