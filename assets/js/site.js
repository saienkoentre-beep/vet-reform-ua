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

(function () {
  var track = document.getElementById('sliderTrack');
  if (!track) return;
  var dotsWrap = document.getElementById('sliderDots');
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');
  var viewport = track.closest('.slider-viewport');
  var slides = track.children;
  var n = slides.length;
  var idx = 0;
  var timer = null;

  for (var i = 0; i < n; i++) {
    (function (i) {
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.addEventListener('click', function () { go(i); });
      dotsWrap.appendChild(dot);
    })(i);
  }
  var dots = dotsWrap.children;

  function go(i) {
    idx = (i + n) % n;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    for (var d = 0; d < dots.length; d++) dots[d].classList.remove('active');
    dots[idx].classList.add('active');
  }

  function startAutoplay() {
    timer = setInterval(function () { go(idx + 1); }, 6000);
  }
  function stopAutoplay() {
    clearInterval(timer);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { go(idx - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { go(idx + 1); });
  if (viewport) {
    viewport.addEventListener('mouseenter', stopAutoplay);
    viewport.addEventListener('mouseleave', startAutoplay);
  }
  startAutoplay();

  var startX = null;
  var wasSwipe = false;
  track.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    wasSwipe = false;
  }, { passive: true });
  track.addEventListener('touchmove', function (e) {
    if (startX === null) return;
    if (Math.abs(e.touches[0].clientX - startX) > 10) wasSwipe = true;
  }, { passive: true });
  track.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? go(idx + 1) : go(idx - 1); }
    startX = null;
  });
  track.addEventListener('click', function (e) {
    if (wasSwipe) { e.preventDefault(); wasSwipe = false; }
  }, true);
})();
