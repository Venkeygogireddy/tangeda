/* ===========================
   SEARCH ROUTING
=========================== */
function performSearch() {
  const input = document.getElementById("site-search");
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  if (!query) return;

  const pageMap = {
    home: "index.html",
    about: "about.html",
    history: "about.html",

    explore: "about.html",
    people: "people.html",
    gallery: "gallery.html",
    photos: "gallery.html",

    culture: "festivals.html",
    festivals: "festivals.html",
    festival: "festivals.html",
    sankranthi: "gallery.html#sankranthi",
    pongal: "gallery.html#sankranthi",
    ganesh: "gallery.html#ganesh",
    ganeshchaturthi: "gallery.html#ganesh",
    chaturthi: "gallery.html#ganesh",
    muharram: "gallery.html#muharram",
    temples: "temples.html",

    news: "news.html",
    services: "services.html",
    directory: "directory.html",
    travel: "travel.html",

    guestbook: "guestbook.html",
    contact: "contact.html"
  };

  for (const key in pageMap) {
    if (query.includes(key)) {
      window.location.href = pageMap[key];
      return;
    }
  }

  alert("No matching page found.");
}

/* ===========================
   HERO SLIDESHOW
=========================== */
(function () {
  const slides = document.querySelectorAll(".hero-slide");
  if (!slides.length) return;

  let index = 0;
  const interval = 6000;

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, interval);
})();

/* ===========================
   DROPDOWNS (stable click)
=========================== */
(function () {
  const dropdowns = document.querySelectorAll(".nav-dd");
  const triggers = document.querySelectorAll(".dd-link");

  function closeAll() {
    dropdowns.forEach(dd => dd.classList.remove("open"));
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const id = trigger.dataset.dd;
      const target = document.getElementById(id);
      const wasOpen = target.classList.contains("open");

      closeAll();
      if (!wasOpen) target.classList.add("open");
    });
  });

  document.querySelectorAll(".dropdown-content a").forEach(link => {
    link.addEventListener("click", e => {
      e.stopPropagation();
      closeAll();
    });
  });

  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeAll();
  });
})();

/* ===========================
   MOBILE HAMBURGER MENU
=========================== */
(function () {
  const nav = document.getElementById("top-nav");
  const toggle = document.getElementById("nav-toggle");

  if (!nav || !toggle) return;

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }

  toggle.addEventListener("click", e => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  document.addEventListener("click", e => {
    if (!nav.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });
})();
