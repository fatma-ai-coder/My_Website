'use strict';

document.addEventListener("DOMContentLoaded", function () {

  /** PRELOAD */
  const preloader = document.querySelector("[data-preload]");
  if (preloader) {
    window.addEventListener("load", function () {
      preloader.classList.add("loaded");
      document.body.classList.add("loaded");
    });
  }

  /** Add event listener on multiple elements */
  const addEventOnElements = function (elements, eventType, callback) {
    if (!elements) return;
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  };

  /** NAVBAR */
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = function () {
    if (navbar && overlay) {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("nav-active");
    }
  };

  addEventOnElements(navTogglers, "click", toggleNavbar);

  /** HEADER & BACK TO TOP BUTTON */
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");
  let lastScrollPos = 0;

  const hideHeader = function () {
    if (!header) return;
    const isScrollBottom = lastScrollPos < window.scrollY;
    header.classList.toggle("hide", isScrollBottom);
    lastScrollPos = window.scrollY;
  };

  window.addEventListener("scroll", function () {
    if (!header || !backTopBtn) return;
    const isScrolled = window.scrollY >= 50;
    header.classList.toggle("active", isScrolled);
    backTopBtn.classList.toggle("active", isScrolled);
    hideHeader();
  });

  /** HERO SLIDER */
  const heroSlider = document.querySelector("[data-hero-slider]");
  const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
  const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
  const heroSliderNextBtn = document.querySelector("[data-next-btn]");

  if (heroSlider && heroSliderItems.length) {
    let currentSlidePos = 0;
    let lastActiveSliderItem = heroSliderItems[0];

    const updateSliderPos = function () {
      lastActiveSliderItem.classList.remove("active");
      heroSliderItems[currentSlidePos].classList.add("active");
      lastActiveSliderItem = heroSliderItems[currentSlidePos];
    };

    const slideNext = function () {
      currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
      updateSliderPos();
    };

    const slidePrev = function () {
      currentSlidePos = (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
      updateSliderPos();
    };

    if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);
    if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

    /** Auto Slide */
    let autoSlideInterval;
    const autoSlide = function () {
      autoSlideInterval = setInterval(slideNext, 7000);
    };

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
      clearInterval(autoSlideInterval);
    });

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
    window.addEventListener("load", autoSlide);
  }

  /** PARALLAX EFFECT */
  const parallaxItems = document.querySelectorAll("[data-parallax-item]");
  if (parallaxItems.length) {
    window.addEventListener("mousemove", function (event) {
      let x = (event.clientX / window.innerWidth * 10) - 5;
      let y = (event.clientY / window.innerHeight * 10) - 5;

      x = -x;
      y = -y;

      for (let i = 0; i < parallaxItems.length; i++) {
        const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
        if (!isNaN(speed)) {
          parallaxItems[i].style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0px)`;
        }
      }
    });
  }

});
