/* eslint-disable no-undef */

/**
 * Render user Details
 */
const isDashboard = window.location.href.includes('dashboard.html');

const getUserAds = (userId) => {
  const token = localStorage.getItem('token');
  const url = `https://automart1.herokuapp.com/api/v1/car?owner=${userId}`;

  console.log('Wait Baba');
  // fetch(url, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: token,
  //   },
  // })
  //   // .then(response => response.json())
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};


if (isDashboard) {
  const firstname = localStorage.getItem('firstname');
  const userId = localStorage.getItem('userId');

  document.querySelector('#username').textContent = firstname;

  getUserAds(userId);
}
