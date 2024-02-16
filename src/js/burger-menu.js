
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
  
  mobMenuFav.addEventListener('click', onfavBtnClick);
  function onfavBtnClick () {
      if ( mobMenuFav )  
      {mobMenuFav.classList.add(activeClass);
        mobMenuHome.classList.remove(activeClass);
             return;
           
      } else {
          return;
         }   
  }
    console.log(activeClass);
    console.log(mobMenuBtnAct);
 