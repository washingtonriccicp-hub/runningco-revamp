const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-menu-toggle]");
const statusLabel = document.querySelector("[data-status-label]");
const statusDetail = document.querySelector("[data-status-detail]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateStoreStatus() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const weekday = day >= 1 && day <= 5;
  const saturday = day === 6;
  const sunday = day === 0;
  const open = weekday ? 600 : sunday ? 720 : 600;
  const close = weekday ? 1140 : sunday ? 960 : 1020;
  const label = weekday ? "Open 10 AM-7 PM" : sunday ? "Open 12 PM-4 PM" : "Open 10 AM-5 PM";

  statusLabel.textContent = "Today's stores";
  statusDetail.textContent = minutes >= open && minutes < close ? label : `Currently closed - ${label}`;

  if (!weekday && !saturday && !sunday) {
    statusDetail.textContent = "Check your preferred store";
  }
}

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
updateStoreStatus();
