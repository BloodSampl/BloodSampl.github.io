// Track the current slide and image index
let currentSlideIndex = 0;
let currentImageIndex = 0;
let switchToNextImageTimeout;  // Timeout to handle automatic image switching

// Initialize the slides
showSlides(currentSlideIndex);

// Function to display the slide and cycle through images within a slide
function showSlides(index) {
    let slides = document.querySelectorAll(".slide");

    // Loop through slides and ensure index is within bounds
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    // Hide all slides and reset images
    slides.forEach(slide => {
        slide.style.display = "none";
        let images = slide.querySelectorAll("img");
        images.forEach(image => image.style.display = "none");  // Hide all images in the slide
    });

    // Show the current slide
    let currentSlide = slides[currentSlideIndex];
    currentSlide.style.display = "block";  // Show the current slide

    // Get all images in the current slide
    let images = currentSlide.querySelectorAll("img");
    if (images.length > 0) {
        // Show the first image or continue cycling through images
        currentImageIndex = 0;  // Start with the first image
        images[currentImageIndex].style.display = "block";  // Show the first image

        // Automatically switch to the next image
        switchImages(images);
    }
}

// Function to automatically switch images in the current slide
function switchImages(images) {
    clearTimeout(switchToNextImageTimeout);  // Clear previous timeout

    switchToNextImageTimeout = setTimeout(function () {
        images[currentImageIndex].style.display = "none";  // Hide the current image
        currentImageIndex = (currentImageIndex + 1) % images.length;  // Move to the next image, loop back to the first
        images[currentImageIndex].style.display = "block";  // Show the next image

        // Repeat the process
        switchImages(images);
    }, 5000);  // Switch images every 5 seconds
}

// Next/previous control for slide navigation
function moveSlide(n) {
    clearTimeout(switchToNextImageTimeout);  // Clear the image switch timeout when manually navigating
    showSlides(currentSlideIndex += n);  // Show the next or previous slide
}

// Arrow key control
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        moveSlide(1);  // Move to the next slide with the right arrow key
    } else if (event.key === 'ArrowLeft') {
        moveSlide(-1);  // Move to the previous slide with the left arrow key
    }
});

// Touch control for mobile (Swipe)
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
