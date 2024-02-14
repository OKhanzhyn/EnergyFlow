import Pagination from 'tui-pagination';

function createPaginationFilters(
  container,
  totalPages,
  currentPage,
  pageSize,
  onPageChange
) {
  const paginationInstance = new Pagination(container, {
    totalItems: pageSize * totalPages,
    itemsPerPage: pageSize,
    visiblePages: 3,
    page: currentPage,
    template: {
      page: '<button class="tui-page page">{{page}}</button>',
      currentPage:
        '<strong class="tui-page page button-is-active">{{page}}</strong>',
    },
  });

  paginationInstance.on('beforeMove', event => {
    onPageChange(event.page);
  });

  return paginationInstance;
}

function createPaginationSubFilters(totalPages) {
  if (window.innerWidth < 768) {
    pageSize = 8;
  } else {
    pageSize = 9;
  }

  const paginationContainer = document.querySelector('.tui-pagination');
  const instance = new Pagination(paginationContainer, {
    totalItems: pageSize * totalPages,
    itemsPerPage: pageSize,
    visiblePages: 3,
    centerAlign: true,
  });

  return instance;
}

export { createPaginationFilters, createPaginationSubFilters };
