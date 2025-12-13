/* ============================
   Shared script.js for all pages
   - Dropdown groups
   - Mobile hamburger
   - Search routing
   - Hero slideshow (if present)
============================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------
     Dropdowns (Explore/Culture/Info)
  ---------------------------- */
  const dropdowns = Array.from(document.querySelectorAll(".dropdown.nav-dd"));

  function closeAllDropdowns() {
    dropdowns.forEach(dd => dd.classList.remove("open"));
  }

  // open/close when clicking the trigger (.dd-link)
  document.querySelectorAll(".dd-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const dd = link.closest(".dropdown");
      const wasOpen = dd.classList.contains("open");

      closeAllDropdowns();
      if (!wasOpen) dd.classList.add("open");
    });
  });

  // allow clicking inside dropdown
  document.querySelectorAll(".dropdown-content").forEach(menu => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });

  // close when clicking outside or pressing Esc
  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ----------------------------
     Mobile hamburger
  ---------------------------- */
  const nav = document.getElementById("top-nav");
  const toggle = document.getElementById("nav-toggle");

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "☰";
  }

  if (nav && toggle) {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "✕" : "☰";
      closeAllDropdowns();
    });

    // close menu if click outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target)) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ----------------------------
     Hero slideshow (only if hero slides exist)
  ---------------------------- */
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 6000);
  }
});

/* ----------------------------
   Search routing (global)
---------------------------- */
function performSearch() {
  const input = document.getElementById("site-search");
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  if (!query) return;

  const pageMap = {
    home: "index.html",
    about: "about.html",
    history: "about.html",
    people: "people.html",
    gallery: "gallery.html",
    photos: "gallery.html",
    images: "gallery.html",
    festivals: "festivals.html",
    festival: "festivals.html",
    sankranthi: "gallery.html#sankranthi",
    pongal: "gallery.html#sankranthi",
    ganesh: "gallery.html#ganesh",
    ganeshchaturthi: "gallery.html#ganesh",
    chaturthi: "gallery.html#ganesh",
    muharram: "gallery.html#muharram",
    temples: "temples.html",
    temple: "temples.html",
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
