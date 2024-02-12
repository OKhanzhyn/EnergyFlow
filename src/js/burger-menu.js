const btnOpenModal = document.querySelector('.js-open-menu');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = () => {
  modal.classList.remove('open');
  document.removeEventListener('keydown', closeModal);
};

btnOpenModal.addEventListener('click', () => {
  modal.classList.add('open');
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  });
});

btnCloseModal.addEventListener('click', () => {
  closeModal();
});

// Коли буде готова саме розмітка бургер меню, додаємо до CSS:.modal {
//   opacity: 0;} .modal.open {opacity: 1;}, ну і клас закриття кнопки модалки перевірити
