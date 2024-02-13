import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async function() {
  const switchItems = document.querySelectorAll('.switch-item');
  const exercisesList = document.querySelector('.exercises-list');
  const bpList = document.querySelector('.bp-list');
  const bpFormWrapper = document.querySelector('.bp-form-wraper');
  const bpSearchInput = document.querySelector('.bp-search-input');

  for (let i = 0; i < switchItems.length; i++) {
    switchItems[i].addEventListener('click', async function() {
      const filter = switchItems[i].dataset.filter;
      // Показати список підвидів для обраного фільтру
      const subtypes = await fetchData(`subtypes?filter=${filter}`);
      renderSubtypes(subtypes);
    });
  }

  function renderSubtypes(subtypes) {
    exercisesList.innerHTML = ''; // Очистити список вправ
    bpList.innerHTML = ''; // Очистити список підвидів
    bpFormWrapper.classList.add('visually-hidden'); // Приховати рядок пошуку
    for (let i = 0; i < subtypes.length; i++) {
      const li = document.createElement('li');
      li.textContent = subtypes[i];
      li.addEventListener('click', async function() {
        const exercises = await fetchData(`exercises?subtype=${subtypes[i]}`);
        renderExercises(exercises);
        // Показати рядок пошуку після вибору підвиду
        bpFormWrapper.classList.remove('visually-hidden');
      });
      bpList.appendChild(li);
    }
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function renderExercises(exercises) {
    exercisesList.innerHTML = ''; // Очистити список вправ
    for (let i = 0; i < exercises.length; i++) {
      const li = document.createElement('li');
      li.textContent = exercises[i].name;
      exercisesList.appendChild(li);
    }
  }

  bpSearchInput.addEventListener('input', async function() {
    const searchTerm = bpSearchInput.value.trim().toLowerCase();
    const exercises = await fetchData(`/api/exercises?search=${searchTerm}`);
    renderExercises(exercises);
  });
});


// document.addEventListener('DOMContentLoaded', function () {
//   const switchItems = document.querySelectorAll('.switch-item');
//   const bpFormWrapper = document.querySelector('.bp-form-wraper');
//   const galleryExercises = document.querySelector('.gallery-exercises');
//   const bpList = document.querySelector('.bp-list');
//   const bpSearchInput = document.querySelector('.bp-search-input');
//   let currentFilter = '';

//   // Приховуємо строку пошуку на всіх кнопках switch-item
//   bpFormWrapper.classList.add('visually-hidden');

//   switchItems.forEach(item => {
//     item.addEventListener('click', function () {
//       // Приховуємо перелік підвидів, якщо він відображений
//       galleryExercises.classList.add('visually-hidden');
//       // Показуємо перелік підвидів, якщо користувач натиснув на активну кнопку
//       if (this.classList.contains('is-active')) {
//         galleryExercises.classList.remove('visually-hidden');
//       }
//       // Приховуємо строку пошуку
//       bpFormWrapper.classList.add('visually-hidden');
//       // Показуємо строку пошуку, якщо користувач натиснув на неактивну кнопку
//       if (!this.classList.contains('is-active')) {
//         bpFormWrapper.classList.remove('visually-hidden');
//       }
//       // Оновлюємо значення фільтра
//       currentFilter = this.dataset.filter;
//     });
//   });

//   // Симуляція вибору підвиду вправ
//   galleryExercises.addEventListener('click', function (event) {
//     const target = event.target;
//     if (target.tagName === 'BUTTON') {
//       const subtype = target.dataset.subtype;
//       // Викликаємо функцію для відображення вправ з використанням фільтра і підвиду
//       showExercises(currentFilter, subtype);
//     }
//   });

//   // Функція для відображення вправ
//   function showExercises(filter, subtype) {
//     // Робимо запит до бекенду для отримання вправ з використанням фільтра і підвиду
//     axios.get(`/api/exercises`, {
//       params: {
//         filter: filter,
//         subtype: subtype,
//       }
//     })
//     .then(response => {
//       const exercises = response.data;
//       // Відображаємо вправи у bpList
//       renderExercises(exercises);
//       // Показуємо строку пошуку
//       bpFormWrapper.classList.remove('visually-hidden');
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }

//   // Функція для відображення вправ у bpList
//   function renderExercises(exercises) {
//     bpList.innerHTML = '';
//     exercises.forEach(exercise => {
//       const listItem = document.createElement('li');
//       listItem.textContent = exercise.name;
//       bpList.appendChild(listItem);
//     });
//   }

//   // Обробник події для форми пошуку
//   bpFormWrapper.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const searchTerm = bpSearchInput.value.trim().toLowerCase();
//     // Викликаємо функцію для пошуку вправ за назвою
//     searchExercises(currentFilter, searchTerm);
//   });

//   // Функція для пошуку вправ за назвою
//   function searchExercises(filter, searchTerm) {
//     // Робимо запит до бекенду для отримання вправ з використанням фільтра і ключового слова
//     axios.get(`/api/exercises`, {
//       params: {
//         filter: filter,
//         search: searchTerm,
//       }
//     })
//     .then(response => {
//       const exercises = response.data;
//       // Відображаємо вправи у bpList
//       renderExercises(exercises);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const formWrapper = document.querySelector('.bp-form-wraper');
//   const musclesFilter = document.querySelector('[data-filter="Muscles"]');
//   const filters = document.querySelectorAll('.switch-item');
//   const form = document.getElementById('bp-form');
//   const searchInput = document.querySelector('.bp-search-input');
//   const bpList = document.querySelector('.bp-list');
//   const switchItems = document.querySelectorAll('.switch-item');
//   let page = 1; 
//   let limit = 9; 
//   let selectedFilter = 'Muscles'; // Початкове значення фільтру
//   let subtype = '';

//   // Приховуємо форму пошуку на початку
//   formWrapper.classList.add('visually-hidden');

//   // Функція для відображення форми пошуку та приховування фільтрів
//   function toggleFormAndFilters(activeFilter) {
//     // Приховуємо форму пошуку для "Muscles", а для інших показуємо
//     if (activeFilter === musclesFilter) {
//       formWrapper.classList.add('visually-hidden');
//     } else {
//       formWrapper.classList.remove('visually-hidden');
//     }

//     // Знімаємо клас visually-hidden у всіх фільтрів
//     filters.forEach(f => f.classList.remove('visually-hidden'));
//   }

//   // Додаємо обробник події на кожний фільтр
//   filters.forEach(filter => {
//     filter.addEventListener('click', function() {
//       // Оновлюємо значення selectedFilter при зміні вибраного фільтру
//       selectedFilter = this.dataset.filter;
//       // Встановлюємо активний клас для вибраного фільтру
//       filters.forEach(f => f.classList.remove('is-active'));
//       this.classList.add('is-active');
//       // Викликаємо функцію для відображення/приховування форми та фільтрів
//       toggleFormAndFilters(this);
//       // Оновлюємо список вправ при зміні фільтру
//       updateExerciseList();
//     });
//   });

//   form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     // При пошуку скидаємо номер сторінки на початок
//     page = 1;
//     // Оновлюємо список вправ при пошуку
//     updateExerciseList();
//   });

//   function updateExerciseList() {
//     const searchTerm = searchInput.value.trim().toLowerCase();

//     bpList.innerHTML = '';

//     axios.get(`/api/exercises`, {
//       params: {
//         search: searchTerm,
//         filter: selectedFilter,
//         subtype: subtype,
//         page: page,
//         limit: limit
//       }
//     })
//     .then(response => {
//       const data = response.data;
//       if (data.length === 0) {
//         iziToast.error({
//           title: 'No Results',
//           message: '',
//           position: 'topCenter',
//           timeout: 5000,
//           closeOnClick: true
//         });
//       } else {
//         data.forEach(exercise => {
//           const listItem = document.createElement('li');
//           listItem.textContent = exercise.name;
//           bpList.appendChild(listItem);
//         });
//       }
//     })
//     .catch(error => {
//       error;
//     });
//   }

// });
// ;
