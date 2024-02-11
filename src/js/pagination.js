export const itemsPerPage = 8;
export let currentPage = 1;
export const mobileBreakpoint = 768;
export const tabletBreakpoint = 1440;
export function renderPagination(container, currentPage, totalPages) {
    if (!container) {
        console.error('Pagination container not found');
        return;
    }
    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="page ${i === currentPage ? 'is-active' : ''}">${i}</button>`;
    }
    return paginationHTML;
} 