
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenuPanel = document.querySelector(".mobile-menu-panel");
if (menuToggle && mobileMenuPanel) {
  document.querySelectorAll(".nav-links a").forEach((link) => {
    mobileMenuPanel.appendChild(link.cloneNode(true));
  });
  const closeMenu = () => {
    document.body.classList.remove("mobile-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenuPanel.hidden = true;
  };
  menuToggle.addEventListener("click", () => {
    const open = !document.body.classList.contains("mobile-menu-open");
    document.body.classList.toggle("mobile-menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenuPanel.hidden = !open;
  });
  mobileMenuPanel.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
