import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bp-form');
  const searchInput = document.querySelector('.bp-search-input');
  const bpList = document.querySelector('.bp-list');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    bpList.innerHTML = '';

    fetch(`/api/exercises?search=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.length === 0) {
          const noResultsMessage = document.createElement('div');
          noResultsMessage.textContent = 'Unfortunately, no results were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.';
          bpList.appendChild(noResultsMessage);
        } else {
          data.forEach(exercise => {
            const listItem = document.createElement('li');
            listItem.textContent = exercise.name;
            bpList.appendChild(listItem);
          });
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
});

