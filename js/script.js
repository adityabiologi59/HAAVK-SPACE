// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
   if (window.scrollY > 100) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

function openMobileNav() {
   mobileNav.classList.add('active');
   mobileOverlay.classList.add('active');
   document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
   mobileNav.classList.remove('active');
   mobileOverlay.classList.remove('active');
   document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMobileNav);
mobileNavClose.addEventListener('click', closeMobileNav);
mobileOverlay.addEventListener('click', closeMobileNav);

mobileNavLinks.forEach(link => {
   link.addEventListener('click', closeMobileNav);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href === '#') {
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
         return;
      }
      const target = document.querySelector(href);
      if (target) {
         const headerHeight = header.offsetHeight;
         const targetPosition = target.offsetTop - headerHeight;
         window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
         });
      }
   });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
   contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you for your message! We will contact you soon.');
      contactForm.reset();
   });
}

// Intersection Observer for scroll animations
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.style.opacity = '1';
         entry.target.style.transform = 'translateY(0)';
      }
   });
}, observerOptions);

document.querySelectorAll('section:not(.hero)').forEach(section => {
   section.style.opacity = '0';
   section.style.transform = 'translateY(30px)';
   section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
   observer.observe(section);
});

// ===== LOGIN FUNCTIONALITY =====
// Check login status on page load
function checkLoginStatus() {
   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
   const userEmail = localStorage.getItem('userEmail');
   const authArea = document.getElementById('authArea');
   const userInfo = document.getElementById('userInfo');
   
   if (isLoggedIn && userEmail && authArea && userInfo) {
      // User is logged in
      userInfo.textContent = `Welcome, ${userEmail.split('@')[0]}`;
      authArea.innerHTML = '<button onclick="logout()" class="nav-cta">Logout</button>';
   }
}

// Navigate to login page
function goLogin() {
   window.location.href = './login/index.html';
}

// Logout function
function logout() {
   localStorage.removeItem('isLoggedIn');
   localStorage.removeItem('userEmail');
   localStorage.removeItem('rememberMe');
   
   const authArea = document.getElementById('authArea');
   const userInfo = document.getElementById('userInfo');
   
   if (authArea && userInfo) {
      userInfo.textContent = 'Belum login';
      authArea.innerHTML = '<button onclick="goLogin()" class="nav-cta">Login</button>';
   }
   
   alert('You have been logged out!');
}

// Initialize login status when page loads
window.addEventListener('load', checkLoginStatus);