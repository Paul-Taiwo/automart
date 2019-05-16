let header = document.querySelector("header.header"),
    sideMenu = document.querySelector(".nav-list");
window.onscroll = () => {
	if (window.pageYOffset > 50) {
		header.classList.add("onscroll");
	} else {
		header.classList.remove("onscroll");
	}
}

document.querySelector("#toggler").addEventListener("click", (e) => {
  e.preventDefault();
  sideMenu.style.right = "0";
});

document.querySelector("#hideMenu").addEventListener("click", (e) => {
  e.preventDefault();
  sideMenu.style.right = "-240px";
});

// Dropdown toggle
document.querySelector("#toggleDropdown").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#myDropdown").classList.toggle("show");
});

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

const modalFunction = () => {
  let loginButton = document.querySelector("#login-button"),
      signupButton = document.querySelector("#signup-button"),
      closeModal = document.querySelectorAll(".modal-btn"),
      noAccount = document.querySelector("#no-account"),
      haveAccount = document.querySelector("#have-account");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#login-modal.modal").style.display = "block";
  });

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#signup-modal.modal").style.display = "block";
  });

  closeModal[0].addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#login-modal.modal").style.display = "none";
  });

  closeModal[1].addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#signup-modal.modal").style.display = "none";
  });

  noAccount.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#signup-modal.modal").style.display = "block";
    document.querySelector("#login-modal.modal").style.display = "none";
  });

  haveAccount.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#login-modal.modal").style.display = "block";
    document.querySelector("#signup-modal.modal").style.display = "none";
  });
}
modalFunction();
