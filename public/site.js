(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function setOpen(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  // Highlight the menu item for the section on screen
  if ('IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('[data-nav]').forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (k) { var s = document.getElementById(k); if (s) io.observe(s); });
  }
})();
