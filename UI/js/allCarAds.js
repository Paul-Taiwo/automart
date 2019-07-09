/* eslint-env browser */
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

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

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((res) => {
        res.data.map(ad => renderAds(ad));
        const allButtons = document.querySelectorAll('.car-price a');

        [].forEach.call(allButtons, (btns) => {
          btns.addEventListener('click', (e) => {
            e.preventDefault();
            const { target } = e;
            const carId = target.attributes.getNamedItem('data-id').value;
            localStorage.setItem('carId', carId);

            window.location.href = './specific-car.html';
          });
        });
      });
  };

  getAllUnsold();
});
