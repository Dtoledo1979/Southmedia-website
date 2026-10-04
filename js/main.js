document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  var burger = document.getElementById('burgerBtn');
  var navList = document.getElementById('navList');
  if (burger && navList) {
    var setOpen = function (open) {
      navList.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      burger.textContent = open ? '✕' : '☰';
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', function () {
      setOpen(!navList.classList.contains('open'));
    });
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: preselect from ?package= / ?type=, block double submits
  var form = document.querySelector('form[name="contact"]');
  if (form) {
    var params = new URLSearchParams(location.search);
    var pkg = params.get('package');
    var type = params.get('type');
    var pkgSelect = document.getElementById('package');
    var typeSelect = document.getElementById('type');
    if (pkg && pkgSelect && pkgSelect.querySelector('option[value="' + pkg.replace(/[^a-z-]/g, '') + '"]')) {
      pkgSelect.value = pkg;
      if (!type) type = pkg.indexOf('wedding') === 0 ? 'Wedding' : 'Corporate';
    }
    if (type && typeSelect && typeSelect.querySelector('option[value="' + type.replace(/[^A-Za-z]/g, '') + '"]')) {
      typeSelect.value = type;
    }

    form.addEventListener('submit', function (e) {
      if (form.dataset.sending) { e.preventDefault(); return; }
      form.dataset.sending = '1';
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.setAttribute('aria-disabled', 'true');
        btn.textContent = 'Sending…';
      }
      if (window.smgTrack) window.smgTrack('generate_lead', { event_type: typeSelect ? typeSelect.value : '' });
    });

    // Coming back via the Back button restores the page from cache: re-enable the form
    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      delete form.dataset.sending;
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.removeAttribute('aria-disabled'); btn.textContent = 'Send request →'; }
    });
  }

  // Analytics: contact clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !window.smgTrack) return;
    var href = a.getAttribute('href');
    if (href.indexOf('tel:') === 0) window.smgTrack('click_phone');
    else if (href.indexOf('mailto:') === 0) window.smgTrack('click_email');
    else if (/instagram\.com|facebook\.com/.test(href)) window.smgTrack('click_social', { link_url: href });
  });
});
