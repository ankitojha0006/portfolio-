const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu");

function smoothScrollToId(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const topbar = document.querySelector(".topbar");
  const offset = (topbar?.offsetHeight || 0) + 10;
  const y = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    smoothScrollToId(href);
    nav?.classList.remove("open");
  });
});

menuBtn?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

const sections = document.querySelectorAll("section[id]");

function setActive() {
  const topbar = document.querySelector(".topbar");
  const offset = (topbar?.offsetHeight || 0) + 12;
  const pos = window.scrollY + offset;
  let current = "";

  sections.forEach((s) => {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (pos >= top && pos < bottom) current = s.id;
  });

  navLinks.forEach((a) => {
    const href = a.getAttribute("href") || "";
    const id = href.replace("#", "");
    a.classList.toggle("active", id && id === current);
  });
}

window.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear().toString();

