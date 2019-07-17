/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-env browser */

const token = localStorage.getItem('token');
const carId = localStorage.getItem('carId');
const firstname = localStorage.getItem('firstname');
let slideIndex = 1;

const showSlides = (n) => {
  const slides = document.querySelectorAll('.imgSlides');
  const thumbnails = document.querySelectorAll('.thumbnail');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  [].forEach.call(slides, (x) => {
    x.style.display = 'none';
  });

  [].forEach.call(thumbnails, (x) => {
    x.className = x.className.replace(' active', '');
  });

  slides[slideIndex - 1].style.display = 'block';
  thumbnails[slideIndex - 1].className += ' active';
};


const plusSlides = (n) => {
  showSlides(slideIndex += n);
};

const currentSlide = (n) => {
  showSlides(slideIndex = n);
};

document.addEventListener('DOMContentLoaded', () => {
  // Display Username
  document.querySelector('#username').textContent = firstname;
  const convertDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
    }).format(dateObj);

    return formattedDate;
  };

  const parseImg = (image, index) => `${image.substring(0, index)}/t_media_lib_thumb/${image.substring(index)}`;

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

  const fetchSpecific = (adId) => {
    const url = `https://automart1.herokuapp.com/api/v1/car/${adId}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((res) => {
        const ad = res.data;
        const {
          id,
          manufacturer,
          model,
          images,
          price,
          state,
          created_on,
          year,
        } = ad;

        document.querySelector('.listing-header>h1').textContent = `${year} ${manufacturer} ${model}`;
        document.querySelector('.listing-price>h1').textContent = `${formatPrice(price)}`;
        document.querySelector('.listing-price>p:nth-child(3)').textContent = `REF-ID: ${id}`;
        document.querySelector('.listing-header>p:nth-child(3)').innerHTML = `<svg class="lnr lnr-calendar-full"><use xlink:href="#lnr-calendar-full"></use></svg> Added ${convertDate(created_on)} day(s) ago`;
        images.forEach((img, idx) => {
          const strippedImg = img.replace(/\s+/g, '');
          const thumbnail = parseImg(img, 50).replace(/\s+/g, '');
          const div = document.createElement('div');
          const newDiv = document.createElement('div');

          div.className = 'imgSlides';
          newDiv.className = 'column';

          div.innerHTML = `<div class="numbertext">${idx += 1} / ${images.length}</div><img src="${strippedImg}" style="width:100%">`;
          document.querySelector('#ad-image').appendChild(div);

          newDiv.innerHTML = `<img class="thumbnail" src="${thumbnail}" style="width:100%" onclick="currentSlide(${idx})" alt="">`;
          document.querySelector('.nf-row').appendChild(newDiv);
        });

        if (document.querySelector('#view-vehicle')) {
          showSlides(slideIndex);
        }
      })
      .catch(err => err);
  };

  fetchSpecific(carId);

  document.querySelector('#abuse_submit').addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name=name]').value;
    const phone = document.querySelector('input[name=abuse_mobile_number]').value;
    const email = document.querySelector('input[type=email]').value;
    const abuseType = document.querySelector('#abuse_type_id').value;
    const comment = document.querySelector('#abuse_comment').value;

    const report = {
      carId: `${carId}`,
      reason: `${abuseType}`,
      description: `${comment}`,
    };

    fetch('https://automart1.herokuapp.com/api/v1/flag/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(report),
    })
      .then(response => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch(err => err);
  });
});
