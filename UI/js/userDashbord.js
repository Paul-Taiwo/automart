/* eslint-disable no-undef */

/**
 * Render user Details
 */
const isDashboard = window.location.href.includes('dashboard.html');

const getUserAds = (userId) => {
  const token = localStorage.getItem('token');
  const url = `http://localhost/api/v1/car?owner=${userId}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((res) => {
      console.log(res);
    });
};


if (isDashboard) {
  const firstname = localStorage.getItem('firstname');
  const userId = localStorage.getItem('userId');

  document.querySelector('#username').textContent = firstname;

  getUserAds(userId);
}
