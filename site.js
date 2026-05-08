/* Zbaraschuk Innovations — shared runtime
   - Reveal-on-scroll
   - Active nav link highlighting */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => io.observe(el));
    }

    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href === path) a.setAttribute("aria-current", "page");
    });

    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    if (nav && toggle) {
      const setOpen = (open) => {
        nav.toggleAttribute("data-nav-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      };
      toggle.addEventListener("click", () => {
        setOpen(!nav.hasAttribute("data-nav-open"));
      });
      nav.querySelectorAll(".nav-links a").forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.hasAttribute("data-nav-open")) {
          setOpen(false);
          toggle.focus();
        }
      });
    }
  });
})();
