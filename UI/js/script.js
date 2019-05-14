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
  e.preventDefault;
  sideMenu.style.right = "0";
});

document.querySelector("#hideMenu").addEventListener("click", (e) => {
  e.preventDefault;
  sideMenu.style.right = "-240px";
});
