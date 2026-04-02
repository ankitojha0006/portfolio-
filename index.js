// Smooth scroll for nav links
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector(".nav");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = nav?.offsetHeight || 0;
    const rect = target.getBoundingClientRect();
    const offsetTop = rect.top + window.scrollY - navHeight + 4;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    const mobileOpen = document.querySelector(".nav-links.open");
    if (mobileOpen) {
      mobileOpen.classList.remove("open");
    }
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section[id]");

const setActiveNav = () => {
  const scrollPos = window.scrollY + (nav?.offsetHeight || 0) + 8;
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const id = href.replace("#", "");
    if (id === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (navToggle && navLinksContainer) {
  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
  });
}

// Set year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

