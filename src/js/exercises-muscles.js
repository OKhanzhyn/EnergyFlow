
axios.defaults.baseURL = 'https://energyflow.b.goit.study/api';

let defaults = 'muscles';
const switcList = document.querySelector('.switch-list');
const exercisesList = document.querySelector('.exercises-list');
const screenWidth = window.innerWidth;
let pageSize = 0;

if (screenWidth < 375) {
  pageSize = 8;
}
if (screenWidth >= 375 && screenWidth <= 768)  {
  pageSize = 12;
}
else {
  pageSize = 10;
}


const exercises = await axios
  .get('/filters', {
    params: {
      filter: 'Muscles',
      limit =  pageSize;
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