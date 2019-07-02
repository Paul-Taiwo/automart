/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const isAuth = () => localStorage.getItem('token');

const isHomePage = () => {
  const homePage = window.location.pathname === '/'
    || window.location.pathname === '/index.html';
  return homePage;
};

if (isAuth() !== null && isHomePage()) {
  document.addEventListener('DOMContentLoaded', () => {
    window.location.href = './dashboard.html';
  });
}

if (isAuth()) {
  document.addEventListener('DOMContentLoaded', () => {
    const logOut = document.querySelectorAll('.logout');
    [].forEach.call(logOut, (item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
      });
    });
  });
}
