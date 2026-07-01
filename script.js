/* ===========================================================
   HARBOURLINE IMMIGRATION — site script
   Mobile nav, sticky header, scroll reveals, animated counters,
   FAQ accordion, and lightweight (client-side only) form handling.
   =========================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    mobileNav();
    stickyHeader();
    scrollReveals();
    animateCounters();
    faqAccordion();
    contactForm();
    newsletterForm();
  }

  /* Footer year */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* Mobile nav toggle */
  function mobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Header shadow on scroll */
  function stickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Fade/slide-in on scroll */
  function scrollReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* Count-up numbers (data-count="500" data-suffix="+") */
  function animateCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { observer.observe(el); });
  }

  /* FAQ accordion */
  function faqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", function () {
        var wasOpen = item.classList.contains("open");
        items.forEach(function (other) {
          other.classList.remove("open");
          var q = other.querySelector(".faq-q");
          if (q) q.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* Contact form — client-side only, no backend wired up */
  function contactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;
    var msg = form.querySelector(".form-msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = form.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });

      if (!msg) return;
      if (!valid) {
        msg.textContent = "Please fill in the required fields before sending.";
        msg.className = "form-msg error";
        return;
      }

      msg.textContent =
        "Thanks — your message has been noted. A consultant will reach out within one business day. (Demo form: no data is actually sent.)";
      msg.className = "form-msg success";
      form.reset();
    });
  }

  /* Newsletter form — client-side only */
  function newsletterForm() {
    var form = document.querySelector("#newsletter-form");
    if (!form) return;
    var msg = form.querySelector(".form-msg");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!msg) return;
      if (!email || !email.value.trim()) {
        msg.textContent = "Enter a valid email address.";
        msg.className = "form-msg error";
        return;
      }
      msg.textContent = "You're subscribed. Watch your inbox for updates. (Demo form.)";
      msg.className = "form-msg success";
      form.reset();
    });
  }
})();
