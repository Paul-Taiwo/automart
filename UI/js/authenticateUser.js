/* eslint-disable no-undef */

function authenticateUser(userData, endpoint) {
  const url = `https://automart1.herokuapp.com/api/v1/${endpoint}`;
  // const devUrl = `http://localhost:8080/api/v1/${endpoint}`;
  const defaultRole = 'user';
  let defaulPage = './dashboard.html';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        const { data } = res;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('email', data.email);
        localStorage.setItem('firstname', data.first_name);
        localStorage.setItem('lastname', data.last_name);
        localStorage.setItem('address', data.address);

        if (data.is_admin) {
          defaulPage = 'admin';
          defaulPage = '../admin/index.html';
        }
        localStorage.setItem('role', defaultRole);
        window.location.href = defaulPage;
      } else {
        document.querySelector('.show-error').style.display = 'block';
        document.querySelector('#error-text').innerText = res.error;
        setTimeout(() => {
          document.querySelector('.show-error').style.display = 'none';
        }, 2000);
      }
    })
    .catch((err) => {
      document.querySelector('.show-error').style.display = 'block';
      document.querySelector('#error-text').innerText = err;
      setTimeout(() => {
        document.querySelector('.show-error').style.display = 'none';
      }, 2000);
    });
}

document.querySelector('#signupForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const firstname = document.querySelector('input[name=firstname]').value;
  const lastname = document.querySelector('input[name=lastname]').value;
  const email = document.querySelector('input[name=email]').value;
  const address = document.querySelector('input[name=address]').value;
  const password = document.querySelector('input[name=password]').value;
  const endpoint = 'auth/signup';
  const userData = {
    firstname, lastname, email, address, password,
  };

  authenticateUser(userData, endpoint);
});

document.querySelector('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('input[name=loginemail]').value;
  const password = document.querySelector('input[name=loginpassword]').value;
  const endpoint = 'auth/signin';
  const userData = { email, password };

  authenticateUser(userData, endpoint);
});
