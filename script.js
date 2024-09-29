// Track the current slide
let currentSlideIndex = 0;
let switchToGifTimeout;  // Timeout to handle switching from image to GIF after 5 seconds

showSlides(currentSlideIndex);

function showSlides(index) {
    let slides = document.querySelectorAll(".slide");

    // Loop through slides and ensure index is within bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Hide all slides and reset images and GIFs visibility
    slides.forEach(slide => {
        slide.querySelector(".slide-img").style.display = "none";  // Hide all original images
        slide.querySelector(".slide-gif").style.display = "none";  // Hide all GIFs
        slide.style.display = "none";  // Hide all slides
    });

    // Show the current slide
    let currentSlide = slides[currentSlideIndex];
    currentSlide.style.display = "block";  // Show the current slide
    currentSlide.querySelector(".slide-img").style.display = "block";  // Show the original image

    // After 5 seconds, switch to GIF
    clearTimeout(switchToGifTimeout);  // Clear any existing timeout to prevent overlap
    switchToGifTimeout = setTimeout(() => {
        // Hide original image and show GIF
        currentSlide.querySelector(".slide-img").style.display = "none";  // Hide original image

        // Reset GIF to start from the beginning
        let gif = currentSlide.querySelector(".slide-gif");
        gif.src = gif.src; // Reset the GIF to restart it
        gif.style.display = "block";  // Show GIF
    }, 5000);  // Switch after 5 seconds
}

// Next/previous control for slide navigation
function moveSlide(n) {
    clearTimeout(switchToGifTimeout);  // Clear the GIF switch timeout when manually navigating
    showSlides(currentSlideIndex += n);  // Show the next or previous slide
}

// Arrow key control
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        moveSlide(1);  // Move to next slide with right arrow
    } else if (event.key === 'ArrowLeft') {
        moveSlide(-1);  // Move to previous slide with left arrow
    }
});

// Touch control for mobile
let startX = 0;
document.querySelector('.slideshow-container').addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
});
document.querySelector('.slideshow-container').addEventListener('touchend', function(event) {
    let endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
        moveSlide(1);  // Swipe left -> go to next slide
    } else if (startX < endX - 50) {
        moveSlide(-1);  // Swipe right -> go to previous slide
    }
});
