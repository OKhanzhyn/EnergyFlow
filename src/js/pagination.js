import Pagination from 'tui-pagination';

function createPaginationFilters(totalPages) {
  if (window.innerWidth < 768) {
    pageSize = 8;
  } else {
    pageSize = 12;
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
