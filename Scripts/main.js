document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideInterval;

    // Generate dots based on number of slides
    function generateDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
                stopSlideTimer();
                startSlideTimer();
            });
            
            sliderDots.appendChild(dot);
        });
    }

    // Function to update slider
    function updateSlider() {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Remove active class from all dots
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[currentSlide].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Start auto slide
    function startSlideTimer() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    // Stop auto slide
    function stopSlideTimer() {
        clearInterval(slideInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideTimer();
        startSlideTimer();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideTimer();
        startSlideTimer();
    });

    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopSlideTimer);
    sliderContainer.addEventListener('mouseleave', startSlideTimer);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopSlideTimer();
            startSlideTimer();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopSlideTimer();
            startSlideTimer();
        }
    });

    // Initialize slider
    generateDots(); // Generate dots first
    updateSlider(); // Then update the slider
    startSlideTimer(); // Start the auto-slide timer
});