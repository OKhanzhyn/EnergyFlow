import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const switchItems = document.querySelectorAll('.switch-item');
  const exercisesList = document.querySelector('.exercises-list');
  const bpList = document.querySelector('.bp-list');
  const bpFormWrapper = document.querySelector('.bp-form-wraper');
  const bpSearchInput = document.querySelector('.bp-search-input');
  
  // switch-item 
  for (let i = 0; i < switchItems.length; i++) {
    switchItems[i].addEventListener('click', async function() {
      const filter = switchItems[i].dataset.filter;

      clearSearchResults();

      // Виконуємо пошук у вправах що прийшли
      const searchTerm = bpSearchInput.value.trim().toLowerCase();
      performSearch('Muscles', 'All', searchTerm);
    });
  }

  // Чистимо попередній пошук
  function clearSearchResults() {
    bpList.innerHTML = '';
  }

  // Пошук
  function performSearch(filter, subtype, searchTerm) {
    const filteredExercises = Array.from(bpList.children).filter(exercise =>
      exercise.textContent.toLowerCase().includes(searchTerm)
    );
    if (filteredExercises.length === 0) {
      renderErrorMessage('Вправ не знайдено');
    } else {
      renderExercises(filteredExercises, bpList);
    }
  }

  // Помилка пошуку
  function renderErrorMessage(message) {
    exercisesList.innerHTML = `<li>${message}</li>`;
  }

  function renderExercises(exercises, list) {
    list.innerHTML = ''; // Очищаємо список
    for (let i = 0; i < exercises.length; i++) {
      const li = document.createElement('li');
      li.textContent = exercises[i].textContent;
      li.addEventListener('click', function() {
        bpFormWrapper.classList.remove('visually-hidden');
      });
      list.appendChild(li);
    }
  }
  
  bpSearchInput.addEventListener('input', function() {
    const searchTerm = bpSearchInput.value.trim().toLowerCase();
    performSearch('Muscles', 'All', searchTerm);
  });

  // Філтр та підвид 
  document.getElementById('bp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const filter = document.querySelector('.switch-item.is-active').dataset.filter;
    const subtype = 'All';
    const searchTerm = bpSearchInput.value.trim().toLowerCase();
    performSearch(filter, subtype, searchTerm);
  });

  exercisesList.addEventListener('click', function(event) {
    const targetItem = event.target.closest('.exercises-item');
    if (targetItem) {
      event.preventDefault();
      bpFormWrapper.classList.remove('visually-hidden');
    }
  });

  //Перехід switchItems
  switchItems.forEach(item => {
    item.addEventListener('click', function() {
      if (!bpList.classList.contains('visually-hidden')) {
        exercisesList.classList.remove('visually-hidden');
      }
    });
  });
});
