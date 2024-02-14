import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', async function () {
  const switchItems = document.querySelectorAll('.switch-item');
  const exercisesList = document.querySelector('.exercises-list');
  const bpList = document.querySelector('.bp-list');
  const bpFormWrapper = document.querySelector('.bp-form-wraper');
  const bpSearchInput = document.querySelector('.bp-search-input');
  const exercisesPerPage = 8;
  let currentPage = 1; 

  for (let i = 0; i < switchItems.length; i++) {
    switchItems[i].addEventListener('click', async function() {
      const filter = switchItems[i].dataset.filter;
      
      const subtypes = await fetchData(`subtypes?filter=${filter}`);
      renderSubtypes(subtypes);
    });
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        throw new Error('Response is not valid JSON');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
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

  function renderErrorMessage(message) {
    exercisesList.innerHTML = `<li>${message}</li>`;
  }

  // function updatePagination(totalPages) {
  // }

  async function performSearch(filter, subtype, searchTerm) {
  const start = (currentPage - 1) * exercisesPerPage;
  const url = `/api/exercises?filter=${filter}&subtype=${subtype}&search=${searchTerm}&start=${start}&limit=${exercisesPerPage}`;
  try {
    const response = await fetchData(url);
    const exercises = response.exercises;
    const total = response.total;
    if (exercises && exercises.length === 0) {
      renderErrorMessage('No exercises found.');
    } else {
      renderExercises(exercises);
      updatePagination(Math.ceil(total / exercisesPerPage));
    }
  } catch (error) {
    console.error('Error fetching exercises:', error);
    renderErrorMessage('Error fetching exercises.');
  }
}


  bpSearchInput.addEventListener('input', function() {
    const searchTerm = bpSearchInput.value.trim().toLowerCase();
    performSearch('Muscles', 'All', searchTerm);
  });

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

  switchItems.forEach(item => {
    item.addEventListener('click', function() {
      if (!bpList.classList.contains('visually-hidden')) {
        exercisesList.classList.remove('visually-hidden');
      }
    });
  });
});
