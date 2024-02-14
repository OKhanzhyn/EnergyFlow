import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const switchItems = document.querySelectorAll('.switch-item');
  const exercisesList = document.querySelector('.exercises-list');
  const bpList = document.querySelector('.bp-list');
  const bpFormWrapper = document.querySelector('.bp-form-wraper');
  const bpSearchInput = document.querySelector('.bp-search-input');

  for (let i = 0; i < switchItems.length; i++) {
    switchItems[i].addEventListener('click', async function() {
      const filter = switchItems[i].dataset.filter;
      
      const subtypes = await fetchData(`subtypes?filter=${filter}`);
      renderSubtypes(subtypes);
    });
  }

  function renderSubtypes(subtypes) {
    exercisesList.innerHTML = '';
    bpList.innerHTML = '';
    bpFormWrapper.classList.add('visually-hidden');
    for (let i = 0; i < subtypes.length; i++) {
      const li = document.createElement('li');
      li.textContent = subtypes[i];
      li.addEventListener('click', async function() {
        const exercises = await fetchData(`exercises?subtype=${subtypes[i]}`);
        renderExercises(exercises);

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
    exercisesList.innerHTML = '';
    for (let i = 0; i < exercises.length; i++) {
      const li = document.createElement('li');
      li.textContent = exercises[i].name;
      li.addEventListener('click', function() {
        bpFormWrapper.classList.remove('visually-hidden');
      });
      exercisesList.appendChild(li);
    }
  }

  bpSearchInput.addEventListener('input', async function() {
    const searchTerm = bpSearchInput.value.trim().toLowerCase();
    const exercises = await fetchData(`/api/exercises?search=${searchTerm}`);
    renderExercises(exercises);
  });

  exercisesList.addEventListener('click', function(event) {
    const targetItem = event.target.closest('.exercises-item');
    if (targetItem) {
      event.preventDefault();
      bpFormWrapper.classList.remove('visually-hidden');
    }
  });

  switchItems.forEach(item => {
    item.addEventListener('click', function() {
      if (!bpList.classList.contains('visually-hidden')) {
        exercisesList.classList.remove('visually-hidden');
      }
    });
  });
});