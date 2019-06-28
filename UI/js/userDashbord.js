/* eslint-disable no-undef */

/**
 * Render user Details
 */
const isDashboard = window.location.href.includes('dashboard.html');

if (isDashboard) {
  const firstname = localStorage.getItem('firstname');
  const lastname = localStorage.getItem('lastname');
  const address = localStorage.getItem('address');

  document.querySelector('#username').textContent = firstname;
}
