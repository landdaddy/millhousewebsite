
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

const instagramFeeds = document.querySelectorAll("[data-instagram-feed]");
const escapeHtml = (value = "") => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const renderInstagramItems = (feed, items) => {
  feed.innerHTML = items.slice(0, 6).map((item, index) => {
    const image = item.thumbnail_url || item.media_url;
    const label = item.caption ? item.caption.split("\n")[0].slice(0, 54) : "From the Millhouse feed";
    const shape = index === 0 ? " tall" : index === 3 ? " wide" : "";
    return `<a class="instagram-card${shape}" href="${escapeHtml(item.permalink)}" target="_blank" rel="noopener"><img src="${escapeHtml(image)}" alt="${escapeHtml(label)}" loading="lazy"><span>${escapeHtml(label)}</span></a>`;
  }).join("");
};

if (instagramFeeds.length) {
  fetch("/api/instagram")
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      if (!data || !Array.isArray(data.items) || !data.items.length) return;
      instagramFeeds.forEach((feed) => renderInstagramItems(feed, data.items));
    })
    .catch(() => {});
}

