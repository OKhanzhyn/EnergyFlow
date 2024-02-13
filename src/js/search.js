document.addEventListener('DOMContentLoaded', function () {
  const formWrapper = document.querySelector('.bp-form-wraper');
  const musclesFilter = document.querySelector('[data-filter="Muscles"]');
  const filters = document.querySelectorAll('.switch-item');
  const form = document.getElementById('bp-form');
  const searchInput = document.querySelector('.bp-search-input');
  const bpList = document.querySelector('.bp-list');
  const switchItems = document.querySelectorAll('.switch-item');
  let page = 1; 
  let limit = 9; 
  let selectedFilter = '';
  let subtype = '';

  // Функція для відображення форми пошуку та приховування фільтрів
  function toggleFormAndFilters(activeFilter) {
    // Приховуємо форму пошуку для "Muscles", а для інших показуємо
    if (activeFilter === musclesFilter) {
      formWrapper.classList.add('visually-hidden');
    } else {
      formWrapper.classList.remove('visually-hidden');
    }

    // Знімаємо клас visually-hidden у всіх фільтрів
    filters.forEach(f => f.classList.remove('visually-hidden'));
    // Приховуємо вибраний фільтр
    activeFilter.classList.add('visually-hidden');
  }

  // Додаємо обробник події на кожний фільтр
  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Оновлюємо значення selectedFilter при зміні вибраного фільтру
      selectedFilter = this.textContent.trim();
      // Встановлюємо активний клас для вибраного фільтру
      filters.forEach(f => f.classList.remove('is-active'));
      this.classList.add('is-active');
      // Викликаємо функцію для відображення/приховування форми та фільтрів
      toggleFormAndFilters(this);
    });
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();

    bpList.innerHTML = '';

    axios.get(`/api/exercises`, {
      params: {
        search: searchTerm,
        filter: selectedFilter,
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