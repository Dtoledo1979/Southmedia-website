// Google Analytics 4. Set GA_ID to the property's Measurement ID (G-XXXXXXXXXX) to enable.
(function () {
  var GA_ID = '';
  if (!GA_ID) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  window.smgTrack = function (name, params) { window.gtag('event', name, params || {}); };
})();
