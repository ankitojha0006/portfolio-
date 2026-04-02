// Helper to smooth scroll to target
function smoothScrollTo(targetSelector) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const nav = document.querySelector(".shell");
  const navH = nav?.offsetHeight || 0;
  const offset = rect.top + window.scrollY - navH - 8;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

// Top nav links
const topLinks = document.querySelectorAll(".top-link");
topLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(href);
  });
});

// Side rail dots
const railDots = document.querySelectorAll(".rail-dot");
railDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const target = dot.getAttribute("data-target");
    if (!target) return;
    smoothScrollTo(target);
  });
});

// Active state on scroll
const panels = document.querySelectorAll("section.panel[id]");

function setActiveNavAlt() {
  const nav = document.querySelector(".shell");
  const navH = nav?.offsetHeight || 0;
  const scrollPos = window.scrollY + navH + 10;
  let currentId = "";

  panels.forEach((panel) => {
    const top = panel.offsetTop;
    const bottom = top + panel.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      currentId = panel.id;
    }
  });

  topLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const id = href.replace("#", "");
    if (id === currentId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  railDots.forEach((dot) => {
    const target = dot.getAttribute("data-target");
    if (!target) return;
    const id = target.replace("#", "");
    if (id === currentId) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavAlt);
window.addEventListener("load", setActiveNavAlt);

// Footer year
const altYear = document.getElementById("alt-year");
if (altYear) {
  altYear.textContent = new Date().getFullYear().toString();
}

