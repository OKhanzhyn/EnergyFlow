const scrollButton = document.querySelector('.scroll-up');

window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
});
function scrollToTop(event) {
  event.preventDefault(); 
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
