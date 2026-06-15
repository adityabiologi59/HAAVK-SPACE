// Admin Navigation
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Set active link based on current section
window.addEventListener('load', () => {
    const dashboardLink = document.querySelector('[href="#dashboard"]');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }
});