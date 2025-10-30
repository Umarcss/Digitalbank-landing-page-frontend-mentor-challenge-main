document.addEventListener("DOMContentLoaded", function () {
	const navToggler = document.querySelector(".nav__toggler");
	const navMobile = document.querySelector(".nav__mobile");
	const overlay = document.querySelector(".overlay");
	const allDesktopLinks = document.querySelectorAll(".nav__desktop-link");
	let mainTimeout = 400;

	const showOverlay = () => {
		overlay.classList.add("active");
	};
	const hideOverlay = () => {
		setTimeout(() => {
			overlay.classList.remove("active");
		}, mainTimeout);
	};
	let togglerOpened = false;
	const handleNav = () => {
		const isOpened = navToggler.getAttribute("aria-expanded") === "true";

		if (!isOpened) {
			togglerOpened = true;
			showNav();
			togglerOn();
			showOverlay();
			setTimeout(() => {
				togglerOpened = false;
			}, mainTimeout);
		} else {
			if (togglerOpened) return;
			showNav();
			togglerOff();
			hideOverlay();
		}
	};
	const togglerOff = () => {
		navToggler.classList.remove("active");
		navToggler.classList.add("unactive");
		navToggler.setAttribute("aria-expanded", "false");
		navToggler.setAttribute("aria-label", "Show mobile navigation");
		setTimeout(() => {
			navToggler.classList.remove("unactive");
		}, mainTimeout);
	};
	const togglerOn = () => {
		navToggler.classList.add("active");
		navToggler.setAttribute("aria-expanded", "true");
		navToggler.setAttribute("aria-label", "Close mobile navigation");
	};

	const showNav = () => {
		const isOpened = navToggler.getAttribute("aria-expanded") === "true";
		if (!isOpened) {
			navMobile.style.display = "block";
			navMobile.style.height = navMobile.scrollHeight + "px";
			navMobile.classList.add("opened");
		} else {
			requestAnimationFrame(() => {
				navMobile.style.height = 0 + "px";
			});
			navMobile.classList.remove("opened");
			setTimeout(() => {
				navMobile.style.display = "none";
			}, mainTimeout);
		}
	};
	const removeActive = () => {
		allDesktopLinks.forEach((link) => link.classList.remove("active"));
	};
	allDesktopLinks.forEach((link) =>
		link.addEventListener("click", (e) => {
			e.preventDefault();
			removeActive();
			link.classList.add("active");
		})
	);
	overlay.addEventListener("click", () => {
		showNav();
		togglerOff();
		hideOverlay();
	});
	navToggler.addEventListener("click", handleNav);
});
