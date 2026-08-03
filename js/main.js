document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burgerBtn');
  var navList = document.getElementById('navList');
  if (burger && navList) {
    burger.addEventListener('click', function () {
      navList.classList.toggle('open');
      burger.textContent = navList.classList.contains('open') ? '✕' : '☰';
    });
    navList.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navList.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }
});
