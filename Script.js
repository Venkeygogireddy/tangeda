/* script.js - Shared JS for Tangeda site (nav + dropdowns + hamburger + search) */

(function () {
  // ---------- Search ----------
  function performSearch() {
    const input = document.getElementById("site-search");
    if (!input) return;

    const query = input.value.toLowerCase().trim();
    if (!query) return;

    const pageMap = {
      home: "index.html",
      about: "about.html",
      history: "about.html",

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

      people: "people.html",
      gallery: "gallery.html",
      photos: "gallery.html",
      images: "gallery.html",

      news: "news.html",
      services: "services.html",
      directory: "directory.html",
      travel: "travel.html",

      guestbook: "guestbook.html",
      contact: "contact.html",
    };

    for (const keyword in pageMap) {
      if (query.includes(keyword)) {
        window.location.href = pageMap[keyword];
        return;
      }
    }

    alert("No matching page found.");
  }

  // Make callable from HTML: onsubmit="performSearch(); return false;"
  window.performSearch = performSearch;

  // If you ever add a voice button again, keep this stub ready:
  window.startVoiceSearch = function () {
    alert("Voice search is not enabled on this page.");
  };

  // ---------- Dropdowns (Explore/Culture/Info) ----------
  (function setupDropdowns() {
    const dropdowns = Array.from(document.querySelectorAll(".nav-dd"));
    if (!dropdowns.length) return;

    function closeAll() {
      dropdowns.forEach((d) => d.classList.remove("open"));
    }

    document.querySelectorAll(".dd-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const id = link.getAttribute("data-dd");
        const dd = document.getElementById(id);
        if (!dd) return;

        const wasOpen = dd.classList.contains("open");
        closeAll();
        if (!wasOpen) dd.classList.add("open");
      });
    });

    // Allow clicking submenu links (avoid dropdown closing too early)
    document.querySelectorAll(".dropdown-content a").forEach((a) => {
      a.addEventListener("click", function (e) {
        e.stopPropagation();
        closeAll(); // close after choosing item
      });
    });

    document.addEventListener("click", function () {
      closeAll();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  })();

  // ---------- Mobile Hamburger ----------
  (function setupHamburger() {
    const nav = document.getElementById("top-nav");
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");

    if (!nav || !toggle || !links) return;

    function closeMenu() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) closeMenu();
    });

    // Close on ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  })();

  // ---------- Hero slideshow (only if hero exists) ----------
  (function setupHeroSlideshow() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides || slides.length <= 1) return;

    let current = 0;
    const interval = 6000;

    function show(i) {
      slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    }

    setInterval(() => {
      current = (current + 1) % slides.length;
      show(current);
    }, interval);
  })();
})();
