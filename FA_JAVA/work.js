'use strict';

document.addEventListener("DOMContentLoaded", function () {

  /** Add event listener on multiple elements */
  const addEventOnElements = function (elements, eventType, callback) {
    if (!elements) return;
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  };

  /** MOBILE NAVBAR TOGGLER */
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");

  const toggleNav = () => {
    if (navbar) {
      navbar.classList.toggle("active");
      document.body.classList.toggle("nav-active");
    }
  };

  addEventOnElements(navTogglers, "click", toggleNav);

  /** HEADER ANIMATION */
  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  window.addEventListener("scroll", () => {
    if (!header || !backTopBtn) return;
    const isActive = window.scrollY > 100;
    header.classList.toggle("active", isActive);
    backTopBtn.classList.toggle("active", isActive);
  });

  /** SLIDER */
  const slider = document.querySelector("[data-slider]");
  const sliderContainer = document.querySelector("[data-slider-container]");
  const sliderPrevBtn = document.querySelector("[data-slider-prev]");
  const sliderNextBtn = document.querySelector("[data-slider-next]");

  if (slider && sliderContainer && sliderPrevBtn && sliderNextBtn) {
    let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
    let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    let currentSlidePos = 0;

    const moveSliderItem = function () {
      const offsetLeft = sliderContainer.children[currentSlidePos]?.offsetLeft || 0;
      sliderContainer.style.transform = `translateX(-${offsetLeft}px)`;
    };

    const slideNext = function () {
      if (currentSlidePos >= totalSlidableItems) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }
      moveSliderItem();
    };

    const slidePrev = function () {
      if (currentSlidePos <= 0) {
        currentSlidePos = totalSlidableItems;
      } else {
        currentSlidePos--;
      }
      moveSliderItem();
    };

    sliderNextBtn.addEventListener("click", slideNext);
    sliderPrevBtn.addEventListener("click", slidePrev);

    /** RESPONSIVE */
    window.addEventListener("resize", function () {
      totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
      totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
      moveSliderItem();
    });
  }

});
