// AM Herkut Leipomo - Contact Form Handler
// Elegant contact form with email functionality

class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupEventListeners();
            this.setupFormValidation();
        }
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupFormValidation() {
        // Add custom validation messages
        const emailInput = this.form.querySelector('#email');
        if (emailInput) {
            emailInput.addEventListener('input', () => this.validateEmail(emailInput));
        }

        const phoneInput = this.form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', () => this.formatPhone(phoneInput));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showNotification('Täytä kaikki pakolliset kentät oikein', 'error');
            return;
        }

        const formData = this.getFormData();
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        // Show loading state
        this.setLoadingState(submitBtn, true);
        
        try {
            // Send email using multiple methods
            await this.sendEmail(formData);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showNotification('Viestin lähettäminen epäonnistui. Yritä uudelleen tai soita meille.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }

    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Tämä kenttä on pakollinen';
            isValid = false;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Anna kelvollinen sähköpostiosoite';
                isValid = false;
            }
        }

        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Anna kelvollinen puhelinnumero';
                isValid = false;
            }
        }

        // Name validation
        if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            if (value.length < 2) {
                errorMessage = 'Nimen tulee olla vähintään 2 merkkiä';
                isValid = false;
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                errorMessage = 'Viestin tulee olla vähintään 10 merkkiä';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateEmail(emailInput) {
        const email = emailInput.value.trim();
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showFieldError(emailInput, 'Anna kelvollinen sähköpostiosoite');
                return false;
            }
        }
        return true;
    }

    formatPhone(phoneInput) {
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('358')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+358' + value.substring(1);
            } else if (!value.startsWith('+')) {
                value = '+358' + value;
            }
        }
        phoneInput.value = value;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            newsletter: formData.get('newsletter') === 'on',
            privacy: formData.get('privacy') === 'on',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
    }

    async sendEmail(formData) {
        // Method 1: EmailJS (recommended for production)
        if (typeof emailjs !== 'undefined') {
            return this.sendWithEmailJS(formData);
        }
        
        // Method 2: Formspree (alternative)
        return this.sendWithFormspree(formData);
    }

    async sendWithEmailJS(formData) {
        // EmailJS configuration
        const serviceId = 'service_amherkut';
        const templateId = 'template_contact';
        const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

        const templateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            phone: formData.phone || 'Ei annettu',
            subject: formData.subject,
            message: formData.message,
            newsletter: formData.newsletter ? 'Kyllä' : 'Ei',
            to_email: 'larakimo@hotmail.com'
        };

        return emailjs.send(serviceId, templateId, templateParams, publicKey);
    }

    async sendWithFormspree(formData) {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }

    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Lähetetään...';
            button.classList.add('loading');
        } else {
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Lähetä Viesti';
            button.classList.remove('loading');
        }
    }

    showSuccessMessage() {
        this.showNotification('Kiitos! Viestisi on lähetetty onnistuneesti. Vastaamme sinulle 24 tunnin kuluessa.', 'success');
        
        // Track successful submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Contact Form',
                value: 1
            });
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.contactFormHandler = new ContactFormHandler();
});

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
    border-left: 4px solid #2196F3;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #4CAF50;
}

.notification-error {
    border-left-color: #f44336;
}

.notification-warning {
    border-left-color: #ff9800;
}

.notification-info {
    border-left-color: #2196F3;
}

.notification-content {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    gap: 10px;
}

.notification-content i {
    font-size: 1.2rem;
    color: #4CAF50;
}

.notification-success .notification-content i {
    color: #4CAF50;
}

.notification-error .notification-content i {
    color: #f44336;
}

.notification-warning .notification-content i {
    color: #ff9800;
}

.notification-info .notification-content i {
    color: #2196F3;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    margin-left: auto;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: #333;
}

.field-error {
    color: #f44336;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: block;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: #f44336;
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.fa-spinner.fa-spin {
    animation: spin 1s linear infinite;
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
