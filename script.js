
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

const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroAction = document.querySelector("[data-hero-action]");
const heroDots = document.querySelectorAll(".sm-hero-dots button");
const heroPrev = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");
if (heroCarousel && heroAction) {
  const slides = Array.from(heroCarousel.querySelectorAll(".sm-hero-slide"));
  let currentSlide = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (currentSlide < 0) currentSlide = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === currentSlide));
    heroDots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === currentSlide));
    const active = slides[currentSlide];
    heroAction.textContent = active.dataset.buttonText || "Build";
    heroAction.href = active.dataset.buttonLink || "contact.html";
  };

  let heroTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  heroDots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      window.clearInterval(heroTimer);
      showSlide(dotIndex);
      heroTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
    });
  });
  heroPrev?.addEventListener("click", () => {
    window.clearInterval(heroTimer);
    showSlide(currentSlide - 1);
    heroTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  });
  heroNext?.addEventListener("click", () => {
    window.clearInterval(heroTimer);
    showSlide(currentSlide + 1);
    heroTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  });
}

const instagramFeeds = document.querySelectorAll("[data-instagram-feed]");
const escapeHtml = (value = "") => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const renderInstagramItems = (feed, items) => {
  feed.innerHTML = items.slice(0, 5).map((item, index) => {
    const image = item.thumbnail_url || item.media_url;
    const label = item.caption ? item.caption.split("\n")[0].slice(0, 54) : "From the Millhouse feed";
    const shape = index === 0 ? " tall" : index === 3 ? " wide" : "";
    return `<a class="instagram-card${shape}" href="${escapeHtml(item.permalink)}" target="_blank" rel="noopener"><img src="${escapeHtml(image)}" alt="${escapeHtml(label)}" loading="lazy"><span>${escapeHtml(label)}</span></a>`;
  }).join("");
};

if (instagramFeeds.length) {
  const hideInstagramFeeds = () => {
    instagramFeeds.forEach((feed) => feed.closest(".instagram-section")?.classList.add("is-empty"));
  };
  fetch("/api/instagram")
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      if (!data || !Array.isArray(data.items) || !data.items.length) {
        hideInstagramFeeds();
        return;
      }
      instagramFeeds.forEach((feed) => renderInstagramItems(feed, data.items));
    })
    .catch(hideInstagramFeeds);
}

const instagramCarousels = document.querySelectorAll("[data-instagram-carousel]");
instagramCarousels.forEach((feed) => {
  window.setInterval(() => {
    const cards = Array.from(feed.children);
    if (cards.length > 1) feed.appendChild(cards[0]);
  }, 4200);
});
