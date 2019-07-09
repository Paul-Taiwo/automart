/* eslint-disable no-param-reassign */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const firstname = localStorage.getItem('firstname');
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  const priceDiv = document.querySelectorAll('.filters-section')[1];
  const priceSubmit = priceDiv.querySelector('input');

  // Display Username
  document.querySelector('#username').textContent = firstname;

  const redirect = () => {
    document.querySelector('.message').style.display = 'block';
    document.querySelector('.message h2').textContent = 'Not Authorized. Redirecting You to Homepage';
    setTimeout(() => {
      window.location.href = './index.html';
    }, 2000);
  };

  // Format price to Nigerian currency
  const formatPrice = price => new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price);

  const renderAds = (ad) => {
    const {
      id,
      manufacturer,
      model,
      images,
      price,
      state,
      // status,
      year,
    } = ad;

    const li = document.createElement('li');
    li.className = 'car-ads';

    li.innerHTML = `
        <div class = "car-image" style="background-image: url('${images[0]}')">
          <div class="car-state t-white f-l-cap">${state}</div>
        </div>
        <div class = "car-info" >
          <h2>${manufacturer} ${model}</h2>
          <p><svg class = "lnr lnr-map-marker">
              <use xlink: href = "#lnr-map-marker" ></use>
            </svg>Lagos</p>
          <p><svg class = "lnr lnr-map-marker">
              <use xlink: href = "#lnr-map-marker" ></use>
            </svg> ${year}</p>
        </div>
        <div class = "car-price">
          <p class = "vehicle-price">${formatPrice(price)}</p>
          <a href="" class ="btn btn-leaf"  data-id="${id}"> View </a>
        </div>`;

    document.querySelector('#ads-container').appendChild(li);
  };

  const getAllUnsold = () => {
    const url = 'https://automart1.herokuapp.com/api/v1/car?status=available';
    // const url = 'http://localhost:8080/api/v1/car?status=available';

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((res) => {
        // If response status Code is 401, redirect user to index page
        if (res.status === 401) {
          localStorage.clear();
          redirect();
        }

        // Remove spinner
        document.querySelector('.spinner').style.display = 'none';

        res.data.map(ad => renderAds(ad));
        const allButtons = document.querySelectorAll('.car-price a');

        // Get all buttons and listen for a click event
        [].forEach.call(allButtons, (btns) => {
          btns.addEventListener('click', (e) => {
            e.preventDefault();
            const { target } = e;
            const carId = target.attributes.getNamedItem('data-id').value; // Get the id of the clicked AD from the data-id attribute
            localStorage.setItem('carId', carId); // Store the ID

            // Redirect to view specific page
            window.location.href = './specific-car.html';
          });
        });
      })
      .catch((err) => {
        const li = document.createElement('li');
        li.className = 't-center';
        li.innerHTML = 'An error occured. Try reloading the page';
        document.querySelector('.spinner').style.display = 'none';
        document.querySelector('#ads-container').appendChild(li);
        return err;
      });
  };


  // Get all checkboxes and listen for a click event
  [].forEach.call(checkboxes, (checkbox) => {
    checkbox.addEventListener('click', (e) => {
      const { target } = e;

      // If target is checked, fetch the resource
      if (target.checked) {
        const query = target.value;
        const queryParameter = target.offsetParent.parentElement.attributes.getNamedItem('data-type').value;
        const url = `https://automart1.herokuapp.com/api/v1/car?status=available&${queryParameter}=${query}`;
        // const url = `http:localhost:8080/api/v1/car?status=available&${queryParameter}=${query}`;

        // Remove the no record message
        if (document.querySelector('li.no-record')) document.querySelector('li.no-record').style.display = 'none';

        // Remove All Ads
        [].forEach.call(document.querySelectorAll('.car-ads'), (elem) => {
          elem.style.display = 'none';
        });

        // Display spinner
        document.querySelector('.spinner').style.display = 'block';

        // Fetch the resource
        fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then((res) => {
            target.checked = false;
            document.querySelector('.filter-body').classList.remove('left');


            // If response status Code is 401, redirect user to index page
            if (res.status === 401) {
              localStorage.clear();
              redirect();
            }

            // if record is not found, display a message
            if (res.data === 'No record found') {
              document.querySelector('.spinner').style.display = 'none';
              document.querySelector('li.no-record').style.display = 'block';
            }

            // Remove spinner
            document.querySelector('.spinner').style.display = 'none';

            res.data.map(ad => renderAds(ad));
            const allButtons = document.querySelectorAll('.car-price a');


            // Get all buttons and listen for a click event
            [].forEach.call(allButtons, (btns) => {
              btns.addEventListener('click', (el) => {
                el.preventDefault();
                const carId = el.target.attributes.getNamedItem('data-id').value; // Get the id of the clicked AD from the data-id attribute
                localStorage.setItem('carId', carId); // Store the ID

                // Redirect to view specific page
                window.location.href = './specific-car.html';
              });
            });
          })
          .catch(err => err); // If error return error
      }
    });
  });

  // Listen for a click event on the price submit button
  priceSubmit.addEventListener('click', (evt) => {
    evt.preventDefault();

    const minValue = document.querySelector('#priceMin').value;
    const maxValue = document.querySelector('#priceMax').value;
    const url = `https://automart1.herokuapp.com/api/v1/car?status=available&min_price=${minValue}&max_price=${maxValue}`;

    if (!minValue || !maxValue) {
      document.querySelector('#price-error').style.visibility = 'visible';
      document.querySelector('#price-error').textContent = 'price cannot be empty';
      setTimeout(() => {
        document.querySelector('#price-error').style.visibility = 'hidden';
      }, 2000);
    } else {
    //  Remove the no record message
      if (document.querySelector('li.no-record')) document.querySelector('li.no-record').style.display = 'none';

      // Remove All Ads
      [].forEach.call(document.querySelectorAll('.car-ads'), (elem) => {
        elem.style.display = 'none';
      });

      // Display spinner
      document.querySelector('.spinner').style.display = 'block';

      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then((res) => {
          document.querySelector('.filter-body').classList.remove('left');
          // If response status Code is 401, redirect user to index page
          if (res.status === 401) {
            localStorage.clear();
            redirect();
          }

          // if record is not found, display a message
          if (res.data === 'No record found') {
            document.querySelector('.spinner').style.display = 'none';
            document.querySelector('li.no-record').style.display = 'block';
          }

          // Remove spinner
          document.querySelector('.spinner').style.display = 'none';

          res.data.map(ad => renderAds(ad));
          const allButtons = document.querySelectorAll('.car-price a');


          // Get all buttons and listen for a click event
          [].forEach.call(allButtons, (btns) => {
            btns.addEventListener('click', (el) => {
              el.preventDefault();
              const carId = el.target.attributes.getNamedItem('data-id').value; // Get the id of the clicked AD from the data-id attribute
              localStorage.setItem('carId', carId); // Store the ID

              // Redirect to view specific page
              window.location.href = './specific-car.html';
            });
          });
        })
        .catch(err => err);
    }
  });

  if (window.screen.availWidth <= 768
      || window.matchMedia('(max-width: 768)').matches) {
    document.querySelector('.filter-header').addEventListener('click', () => {
      document.querySelector('.filter-body').classList.toggle('left');
    });
  }
  getAllUnsold();
});
