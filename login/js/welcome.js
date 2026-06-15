// Welcome message and user greeting
function displayWelcomeMessage() {
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (userEmail) {
        const firstName = userEmail.split('@')[0];
        console.log(`%c🎉 Welcome back, ${firstName}!`, 'color: #B8860B; font-size: 16px; font-weight: bold;');
        console.log(`%cRole: ${userRole || 'User'}`, 'color: #D4A853; font-size: 14px;');
        
        // Show welcome toast on first visit after login
        if (sessionStorage.getItem('justLoggedIn') !== 'false') {
            showWelcomeToast(firstName);
            sessionStorage.setItem('justLoggedIn', 'false');
        }
    }
}

// Show welcome toast notification
function showWelcomeToast(name) {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">👋</span>
            <div class="toast-text">
                <p class="toast-title">Welcome back!</p>
                <p class="toast-message">Hi ${name}, nice to see you again!</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .welcome-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #B8860B 0%, #D4A853 100%);
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(184, 134, 11, 0.4);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast-icon {
                font-size: 24px;
            }
            
            .toast-text {
                flex: 1;
            }
            
            .toast-title {
                margin: 0;
                font-weight: 600;
                font-size: 14px;
            }
            
            .toast-message {
                margin: 4px 0 0 0;
                font-size: 13px;
                opacity: 0.9;
            }
            
            .toast-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .toast-close:hover {
                opacity: 0.8;
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(400px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @media (max-width: 600px) {
                .welcome-toast {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Initialize welcome message when page loads
window.addEventListener('load', () => {
    displayWelcomeMessage();
});
