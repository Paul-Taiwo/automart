let header = document.querySelector("header.header"),
  slideIndex = 1,
  currentTab = 0;

window.onscroll = () => {
  if (window.pageYOffset > 50) {
    header.classList.add("onscroll");
  } else {
    header.classList.remove("onscroll");
  }
}

const openSideMenu = () => {
  document.querySelector(".nav-list").style.right = "0";
}

const closeSideMenu = () => {
  document.querySelector(".nav-list").style.right = "-240px";
}

// Dropdown toggle
const toggleDropdown = () => {
  document.querySelector("#myDropdown").classList.toggle("show");
}

document.querySelectorAll('nav ul>li>a').forEach(function (x) {
  x.addEventListener("click", function () {
    let current = document.querySelector(".active");
    current.className = current.className.replace(" active", "");
    this.className += " active";
  });
});

document.querySelectorAll(".accordion").forEach(function (x) {
  x.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

const showLoginForm = () => {
  document.querySelector("#login-modal.modal").style.display = "block";
}

const closeLoginForm = () => {
  document.querySelector("#login-modal.modal").style.display = "none";
}

const showSignupForm = () => {
  document.querySelector("#signup-modal.modal").style.display = "block";
}

const closeSignupForm = () => {
  document.querySelector("#signup-modal.modal").style.display = "none";
}

const noAccount = () => {
  document.querySelector("#signup-modal.modal").style.display = "block";
  document.querySelector("#login-modal.modal").style.display = "none";
}

const haveAccount = () => {
  document.querySelector("#login-modal.modal").style.display = "block";
  document.querySelector("#signup-modal.modal").style.display = "none";
}

const reportAds = () => {
  document.querySelector("#report-ads.modal").style.display = "block";
}

const closeReportAds = () => {
  document.querySelector("#report-ads.modal").style.display = "none";
}

const editAdsPrice = () => {
  document.querySelector("#update-price.modal").style.display = "block";
}

const closeEditPrice = () => {
  document.querySelector("#update-price.modal").style.display = "none";
}

const reviewPrice = () => {
  document.querySelector("#review-price.modal").style.display = "block";
}

const closeReviewPrice = () => {
  document.querySelector("#review-price.modal").style.display = "none";
}

const purchase = () => {
  document.querySelector("#purchase-order.modal").style.display = "block";
}

const closePurchase = () => {
  document.querySelector("#purchase-order.modal").style.display = "none";
}

const plusSlides = (n) => {
  showSlides(slideIndex += n);
}

const currentSlide = (n) => {
  showSlides(slideIndex = n);
}

const showSlides = (n) => {
  let i = 0,
    slides = document.querySelectorAll(".imgSlides"),
    thumbnails = document.querySelectorAll(".thumbnail");

  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  slides.forEach((x) => {
    x.style.display = "none";
  });

  thumbnails.forEach((x) => {
    x.className = x.className.replace(" active", "");
  });

  slides[slideIndex - 1].style.display = "block";
  thumbnails[slideIndex - 1].className += " active";
}

const showCurrentTab = (n) => {
  let tab = document.querySelectorAll(".tabpanel");

  tab[n].style.display = "block";

  if (n == 0) {
    document.querySelector("#create-ads-prev").style.display = "none";
  } else {
    document.querySelector("#create-ads-prev").style.display = "block";
  }

  if (n == (tab.length - 1)) {
    document.querySelector("#create-ads-next").innerHTML = "Submit";
  } else {
    document.querySelector("#create-ads-next").innerHTML = "Next";
  }

  stepIndicator(n);
}

const stepIndicator = (n) => {
  let steps = document.querySelectorAll(".tablinks");

  steps.forEach((x) => {
    x.className = x.className.replace(" active", "");
  });
  steps[n].className += " active";
}

const nextPrev = (n) => {
  let tab = document.querySelectorAll(".tabpanel");
  tab[currentTab].style.display = "none";
  currentTab = currentTab + n;

  if (currentTab >= tab.length) {
    document.querySelector("#create-ads-form").submit();
  }
  showCurrentTab(currentTab)
}

window.on = ()=> {
  console.log('YEs');
}

if (document.querySelector("#view-vehicle")) {
  showSlides(slideIndex);
}
showCurrentTab(currentTab);
