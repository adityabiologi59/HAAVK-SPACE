// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
    });
}

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
}

// Close mobile menu when link is clicked
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
    });
});

// Authentication Status
function updateAuthStatus() {
    const userInfo = document.getElementById('userInfo');
    const authArea = document.getElementById('authArea');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (isLoggedIn) {
        userInfo.textContent = `Selamat datang, ${userName || userEmail || 'User'}`;
        authArea.innerHTML = '<button onclick="handleLogout()" class="nav-cta">Keluar</button>';
    } else {
        userInfo.textContent = 'Belum login';
        authArea.innerHTML = '<button onclick="goLogin()" class="nav-cta">Masuk</button>';
    }
}

function goLogin() {
    window.location.href = './login/index.html';
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    updateAuthStatus();
    alert('Anda telah keluar dari akun.');
}

// Initialize auth status on page load
window.addEventListener('load', updateAuthStatus);

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Mohon isi semua kolom yang wajib diisi');
            return;
        }
        
        // Store message (in real app, this would be sent to server)
        const messages = JSON.parse(localStorage.getItem('haavk_messages') || '[]');
        const newMessage = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            message: message,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem('haavk_messages', JSON.stringify(messages));
        
        alert('Pesan Anda telah dikirim! Kami akan menghubungi Anda segera.');
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header sticky effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});