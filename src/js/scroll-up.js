function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Показывать/скрывать кнопку scroll-up при прокрутке
    window.onscroll = function () {
        var scrollButton = document.querySelector('.scroll-up');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    };