
const refs = {
    openModalBtn: document.querySelector('.js-open-menu'),
    closeModalBtn: document.querySelector('.js-close-menu'),
    modal: document.querySelector('.js-menu-container'),
  };
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  function toggleModal() {
    refs.modal.classList.toggle('is-open');
  }

  const mobMenuBtnAct = document.querySelector('.mobile-menu-link');
  const mobMenuHome = document.querySelector('.home-link');
  const mobMenuFav = document.querySelector('.fav-link');
  const activeClass = 'active';
  const FAV_URL = 'http://localhost:5173/favorites.html';
  
  
    window.addEventListener('load', () => {
      if (window.location.pathname.endsWith('favorites.html')) {
        mobMenuFav.classList.add(activeClass);
        mobMenuHome.classList.remove(activeClass);
      } else {
        mobMenuHome.classList.add(activeClass);
        mobMenuFav.classList.remove(activeClass);
      }
    })