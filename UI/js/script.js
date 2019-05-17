let header = document.querySelector("header.header"),
    slideIndex = 1;

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

document.querySelectorAll('nav ul>li>a').forEach(function(x) {
  x.addEventListener("click", function() {
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

const closeLoginForm= () => {
  document.querySelector("#login-modal.modal").style.display = "none";
}

const showSignupForm = () => {
  document.querySelector("#signup-modal.modal").style.display = "block";
}

const closeSignupForm= () => {
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

// const modalFunction = () => {
//   let loginButton = document.querySelector("#login-button"),
//       signupButton = document.querySelector("#signup-button"),
//       closeModal = document.querySelectorAll(".modal-btn"),
//       noAccount = document.querySelector("#no-account"),
//       haveAccount = document.querySelector("#have-account");

//   loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#login-modal.modal").style.display = "block";
//   });

//   signupButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#signup-modal.modal").style.display = "block";
//   });

//   closeModal[0].addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#login-modal.modal").style.display = "none";
//   });

//   closeModal[1].addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#signup-modal.modal").style.display = "none";
//   });

//   noAccount.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#signup-modal.modal").style.display = "block";
//     document.querySelector("#login-modal.modal").style.display = "none";
//   });

//   haveAccount.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector("#login-modal.modal").style.display = "block";
//     document.querySelector("#signup-modal.modal").style.display = "none";
//   });
// }
// modalFunction();

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

showSlides(slideIndex);