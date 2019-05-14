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
