document.addEventListener('click', function (e) {
  var toggle = e.target.closest('.mobile-nav-toggle');
  var nav = document.querySelector('.header-nav');
  if (!nav) return;
  if (toggle) {
    nav.classList.toggle('mobile-open');
    return;
  }
  if (!e.target.closest('.header-nav')) {
    nav.classList.remove('mobile-open');
  }
});
