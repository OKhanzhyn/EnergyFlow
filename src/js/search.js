import { getApiInfo } from './api.js';
import { postApiInfo } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bp-form');
  const searchInput = document.querySelector('.bp-search-input');
  const bpList = document.querySelector('.bp-list');
  const switchItems = document.querySelectorAll('.switch-item');
  let page = 1; 
  let limit = 9; 
  let filter = '';
  let subtype = '';

    switchItems.forEach(item => {
        item.addEventListener('click', function() {
    switchItems.forEach(element => {
        element.classList.remove('is-active');
    });
    this.classList.add('is-active');
        filter = this.textContent.trim();
    });
});

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    bpList.innerHTML = '';

    axios.get(`/api/exercises`, {
      params: {
        search: searchTerm,
        filter: filter,
        subtype: subtype,
        page: page,
        limit: limit
      }
    })
    .then(response => {
      const data = response.data;
      if (data.length === 0) {
        iziToast.error({
          title: 'No Results',
          message: '',
          position: 'topCenter',
          timeout: 5000,
          closeOnClick: true
        });
      } else {
        data.forEach(exercise => {
          const listItem = document.createElement('li');
          listItem.textContent = exercise.name;
          bpList.appendChild(listItem);
        });
      }
    })
        .catch(error => {
            error;
    });
  });
});