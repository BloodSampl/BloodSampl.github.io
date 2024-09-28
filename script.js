// Track the current slide
let currentSlideIndex = 0;
showSlides(currentSlideIndex);
let slideInterval = setInterval(() => moveSlide(1), 5000); // Auto-slide every 5 seconds

// Show the slide based on the index
function showSlides(index) {
    let slides = document.querySelectorAll(".slide");
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.style.display = "none");
    slides[currentSlideIndex].style.display = "block";
}

// Next/previous control
function moveSlide(n) {
    showSlides(currentSlideIndex += n);
    resetSlideInterval(); // Reset auto-slide timer
}

// Reset auto-slide interval
function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), 5000);
}

// Arrow key control
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        moveSlide(1);
    } else if (event.key === 'ArrowLeft') {
        moveSlide(-1);
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
        moveSlide(1); // Swipe left -> go to next slide
    } else if (startX < endX - 50) {
        moveSlide(-1); // Swipe right -> go to previous slide
    }
});
