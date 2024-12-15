const carousel = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 1; // Start at the first real image
let imageWidth;

// Clone first and last images for smooth looping
function setupClones() {
    const firstImage = images[0].cloneNode(true);
    const lastImage = images[images.length - 1].cloneNode(true);

    carousel.appendChild(firstImage); // Clone first image to the end
    carousel.insertBefore(lastImage, images[0]); // Clone last image to the start
}

// Set the initial position and calculate image width
function setInitialPosition() {
    imageWidth = images[0].getBoundingClientRect().width;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
}

// Move carousel by updating transform
function moveCarousel() {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
}

// Reset position when at a clone
function checkLoop() {
    if (currentIndex === images.length + 1) {
        carousel.style.transition = "none";
        currentIndex = 1; // Reset to the first real image
        carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    } else if (currentIndex === 0) {
        carousel.style.transition = "none";
        currentIndex = images.length; // Reset to the last real image
        carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    }
}

// Button click listeners
nextButton.addEventListener('click', () => {
    currentIndex++;
    moveCarousel();
    setTimeout(checkLoop, 500); // Adjust after transition
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    moveCarousel();
    setTimeout(checkLoop, 500); // Adjust after transition
});

// Handle window resizing
window.addEventListener('resize', setInitialPosition);

// Scroll animation logic
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

// Add scroll listener for pop-up effect
window.addEventListener('scroll', () => {
    const visibleImages = document.querySelectorAll('.carousel-images img');

    visibleImages.forEach((image) => {
        if (isInViewport(image)) {
            image.classList.add('scroll-in');
        } else {
            image.classList.remove('scroll-in');
        }
    });
});

// Initial setup
setupClones();
setInitialPosition();
