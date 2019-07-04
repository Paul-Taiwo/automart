/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Render user Details
 */

const isDashboard = window.location.href.includes('dashboard.html');
const token = localStorage.getItem('token');

const redirect = () => {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message h2').textContent = 'Not Authorized. Redirecting You to Homepage';
  setTimeout(() => {
    window.location.href = './index.html';
  }, 2000);
};

const convertDate = (date) => {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-GB').format(dateObj);

  return formattedDate;
};

const formatPrice = price => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
}).format(price);

document.addEventListener('DOMContentLoaded', () => {
  if (token === null) {
    redirect();
  }
});

const renderAds = (cars) => {
  const {
    id, manufacturer, model, createdOn, status, year,
  } = cars;
  const row = document.createElement('tr');

  row.innerHTML = `
  <td>${id}</td>
  <td class="t-center">${year} ${manufacturer} ${model}</td>
  <td>
  <h5 class="bg-info t-white t-center f-l-cap">${status}</h5>
  </td>
  <td>
  <h3 class="t-center">${convertDate(createdOn)}</h3>
  </td>
  <td class="t-center del-record">
  <button class="btn btn-info b-t-r-0 b-b-r-0" onclick="editAdsPrice()">Edit Price</button>
  <button class="btn btn-leaf b-t-l-0 b-b-l-0">Sold</button>
  </td>`;

  return document.querySelector('#allAds').appendChild(row);
};

const renderOrders = (order) => {
  const {
    id, amount, status,
  } = order;
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${id}</td>
    <td class="t-center f-l-cap">${status}</td>
    <td>
      <h3 class="t-center">5,000,000</h3>
    </td>
    <td>
      <h3 class="t-center">${formatPrice(amount)}</h3>
    </td>
    <td class="t-center del-record">
      <button class="btn btn-info" onclick="reviewPrice()">Review Price</button>
    </td>`;
  return document.querySelector('#all-orders').appendChild(row);
};

const getUserAds = (userId) => {
  const tableBody = document.querySelector('#allAds');
  // const url = `https://automart1.herokuapp.com/api/v1/car?owner=${userId}`;
  const devUrl = `http://localhost:8080/api/v1/car?owner=${userId}`;
  const tableRow = document.createElement('tr');

  fetch(devUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((res) => {
      if (res.data === 'No record found') {
        document.querySelector('#total-ads').textContent = '0';
        document.querySelector('.spinner-row').style.display = 'none';
        tableRow.innerHTML = '<td class="t-center" colspan="5">No record found</td>';

        return tableBody.appendChild(tableRow);
      }
      document.querySelector('.spinner-row').style.display = 'none';
      const result = res.data;
      document.querySelector('#total-ads').textContent = `(${result.length})`;

      return result.map(ad => renderAds(ad));
    })
    .catch((err) => {
      document.querySelector('.spinner-row').style.display = 'none';
      tableRow.innerHTML = '<td class="t-center" colspan="5">An error occured. Try reloading the page</td>';
      return tableBody.appendChild(tableRow);
    });
};

const getUserOrders = (userId) => {
  const tableBody = document.querySelector('#all-orders');
  const tableRow = document.createElement('tr');
  // const url = `https://automart1.herokuapp.com/api/v1/order?owner=${userId}`;
  const devUrl = `http://localhost:8080/api/v1/order?owner=${userId}`;

  fetch(devUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then((res) => {
      if (res.data === 'No record found') {
        document.querySelector('#all-orders .spinner-row').style.display = 'none';
        tableRow.innerHTML = '<td class="t-center" colspan="5">No record found</td>';

        return tableBody.appendChild(tableRow);
      }
      document.querySelector('#all-orders .spinner-row').style.display = 'none';
      const result = res.data;

      return result.map(ad => renderOrders(ad));
    })
    .catch((err) => {
      document.querySelector('#all-orders .spinner-row').style.display = 'none';
      tableRow.innerHTML = '<td class="t-center" colspan="5">An error occured. Try reloading the page</td>';
      return tableBody.appendChild(tableRow);
    });
};

if (isDashboard) {
  const firstname = localStorage.getItem('firstname');
  const userId = localStorage.getItem('userId');

  document.querySelector('#username').textContent = firstname;

  getUserAds(userId);
  getUserOrders(userId);
}
