// Select elements
const prevBtn = document.querySelector(".carousel__button--left");
const nextBtn = document.querySelector(".carousel__button--right");
const slider = document.querySelector(".carousel__track");
const slides = Array.from(slider.children);
// Select bottom indicators
const indicatorsContainer = document.querySelector(".carousel__navigation");
const indicators = Array.from(document.querySelector(".carousel__navigation").children);
let width;

// Button func to move slider
nextBtn.addEventListener("click", () => {
  // grab current img slides & move slide on click
  const currentSlide = document.querySelector(".current-slide");
  let nextSlide = currentSlide.nextElementSibling;
  if (nextSlide === null) {
    nextSlide = currentSlide.parentNode.firstElementChild;
  }
  moveSlide(slider, currentSlide, nextSlide);
  // grab current indicators and update to show current location on slider
  const currentIndicator = indicatorsContainer.querySelector(".current-slide");
  let nextIndicator = currentIndicator.nextElementSibling;
  if (nextIndicator === null) {
    nextIndicator = currentIndicator.parentNode.firstElementChild;
  }
  updateIndicators(currentIndicator, nextIndicator);
});

prevBtn.addEventListener("click", () => {
  // grab current img slides & move slide on click
  const currentSlide = document.querySelector(".current-slide");
  let prevSlide = currentSlide.previousElementSibling;
  if (prevSlide === null) {
    prevSlide = currentSlide.parentNode.lastElementChild;
  }
  moveSlide(slider, currentSlide, prevSlide);
  // grab current indicators and update to show current location on slider
  const currentIndicator = indicatorsContainer.querySelector(".current-slide");
  let prevIndicator = currentIndicator.previousElementSibling;
  if (prevIndicator === null) {
    prevIndicator = currentIndicator.parentNode.lastElementChild;
  }
  updateIndicators(currentIndicator, prevIndicator);
});

// Indicators func to move slider
indicatorsContainer.addEventListener("click", (e) => {
  // grab clicked indicator dot
  const targetIndicator = e.target.closest("button");
  // return if clicked outside indicator
  if (!targetIndicator) {
    return;
  }
  // grab current img slide & indicator dot
  const currentSlide = slider.querySelector(".current-slide");
  const currentIndicator = indicatorsContainer.querySelector(".current-slide");
  // grab index by matching elements
  const targetIndex = indicators.findIndex((dot) => dot === targetIndicator);
  // grab target slide
  const targetSlide = slides[targetIndex];
  moveSlide(slider, currentSlide, targetSlide);
  updateIndicators(currentIndicator, targetIndicator);
});

// Functions
const givePosition = (slide, index) => {
  slide.style.left = width * index + "px";
};

const moveSlide = (slider, currentSlide, targetSlide) => {
  const amountToMove = targetSlide.style.left;
  slider.style.transform = `translateX(-${amountToMove})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateIndicators = (currentIndicator, targetIndicator) => {
  currentIndicator.classList.remove("current-slide");
  targetIndicator.classList.add("current-slide");
};

// Set and update slider width and images positions
const calulateSliderImgWidthAndPositonImgs = () => {
  // Get image slide width
  width = slides[0].getBoundingClientRect().width;
  // give position to images inside slider track to follow each other
  slides.forEach((slide, index) => givePosition(slide, index));
  // grab current img slide
  const currentSlide = document.querySelector(".current-slide");
  const amountToMove = currentSlide.style.left;
  slider.style.transform = `translateX(-${amountToMove})`;
  // disable transition on resize
  slider.style.transition = "none";
  // return transition after timeout
  setTimeout(() => {
    slider.style.transition = "transform 400ms ease";
  }, 200);
};

calulateSliderImgWidthAndPositonImgs();
window.onresize = calulateSliderImgWidthAndPositonImgs;

// TODO: timeout auto loop to next slide
