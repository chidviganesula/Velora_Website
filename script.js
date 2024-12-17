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
    carousel.insertBefore(lastImage, carousel.firstElementChild); // Clone last image to the start
}

// Update the image width and set the initial position
function setInitialPosition() {
    imageWidth = images[0].getBoundingClientRect().width;

    // Set carousel to show the first real image
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
}

// Move the carousel smoothly
function moveCarousel() {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
}

// Check for clones and reset position without transition
function checkLoop() {
    if (currentIndex >= images.length + 1) {
        currentIndex = 1;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    } else if (currentIndex <= 0) {
        currentIndex = images.length;
        carousel.style.transition = "none";
        carousel.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    }
}

// Button click listeners
nextButton.addEventListener('click', () => {
    if (currentIndex <= images.length) {
        currentIndex++;
        moveCarousel();
    }
    setTimeout(checkLoop, 500);
});

prevButton.addEventListener('click', () => {
    if (currentIndex >= 1) {
        currentIndex--;
        moveCarousel();
    }
    setTimeout(checkLoop, 500);
});

// Handle window resizing
window.addEventListener('resize', () => {
    setInitialPosition();
});

// Initial setup
setupClones();
setInitialPosition();
