// Welcome script - handles post-login functionality
document.addEventListener('DOMContentLoaded', function() {
   // Check if user is already logged in
   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
   if (isLoggedIn) {
      // Redirect to main page if already logged in
      window.location.href = '../index.html';
   }
});