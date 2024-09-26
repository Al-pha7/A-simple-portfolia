document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();  // Prevent default link behavior
        const targetID = this.getAttribute('href');  // Get the target ID
        const targetElement = document.querySelector(targetID);  // Get the target element
        
        if (targetElement) {
            smoothScrollTo(targetElement, 1000);  // Call smoothScrollTo with a duration (1000ms = 1 second)
        }
    });
});

// Custom smooth scrolling function
function smoothScrollTo(target, duration) {
    const startPosition = window.pageYOffset;  // Current scroll position
    const targetPosition = target.getBoundingClientRect().top;  // Target element's distance from the top
    const startTime = performance.now();  // Start time for the animation

    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;  // Time passed since animation started
        const progress = Math.min(elapsedTime / duration, 1);  // Progress between 0 and 1
        
        // Ease the progress (optional for smoother feel)
        const easeProgress = easeInOutQuad(progress);

        // Calculate the current scroll position
        window.scrollTo(0, startPosition + targetPosition * easeProgress);

        // Continue the animation as long as time is left
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    // Start the animation
    requestAnimationFrame(animation);
}

// Easing function for smoother effect (ease-in-out)
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
