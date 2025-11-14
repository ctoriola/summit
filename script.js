// MIOC Website JavaScript

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form Validation and Submission
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            field.classList.add('border-red-500');
            isValid = false;
        }
    });
    
    // Phone validation
    const phoneFields = form.querySelectorAll('input[type="tel"]');
    phoneFields.forEach(field => {
        if (field.value && !isValidPhone(field.value)) {
            field.classList.add('border-red-500');
            isValid = false;
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Appointment Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.querySelector('form');
    if (appointmentForm && window.location.pathname.includes('appointment')) {
        
        // Department and Doctor dependency
        const departmentSelect = appointmentForm.querySelector('select[name="department"]');
        const doctorSelect = appointmentForm.querySelector('select[name="doctor"]');
        
        if (departmentSelect && doctorSelect) {
            const doctorsByDepartment = {
                'medical-oncology': [
                    { value: 'dr-sarah-johnson', text: 'Dr. Sarah Johnson' },
                    { value: 'dr-rajesh-gupta', text: 'Dr. Rajesh Gupta' },
                    { value: 'dr-priya-sharma', text: 'Dr. Priya Sharma' }
                ],
                'radiation-oncology': [
                    { value: 'dr-michael-chen', text: 'Dr. Michael Chen' },
                    { value: 'dr-anjali-patel', text: 'Dr. Anjali Patel' }
                ],
                'surgical-oncology': [
                    { value: 'dr-emily-rodriguez', text: 'Dr. Emily Rodriguez' },
                    { value: 'dr-vikram-singh', text: 'Dr. Vikram Singh' }
                ],
                'hematology': [
                    { value: 'dr-david-kumar', text: 'Dr. David Kumar' }
                ]
            };
            
            departmentSelect.addEventListener('change', function() {
                const department = this.value;
                const doctors = doctorsByDepartment[department] || [];
                
                // Clear existing options except first
                doctorSelect.innerHTML = '<option value="">Any Available Doctor</option>';
                
                // Add department-specific doctors
                doctors.forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.value;
                    option.textContent = doctor.text;
                    doctorSelect.appendChild(option);
                });
            });
        }
        
        // Form submission
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('appointmentForm')) {
                showLoadingState(this);
                
                // Simulate form submission
                setTimeout(() => {
                    hideLoadingState(this);
                    showSuccessMessage('Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.');
                }, 2000);
            } else {
                showErrorMessage('Please fill in all required fields correctly.');
            }
        });
    }
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact')) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                showLoadingState(this);
                
                // Simulate form submission
                setTimeout(() => {
                    hideLoadingState(this);
                    showSuccessMessage('Message sent successfully! We will get back to you soon.');
                    this.reset();
                }, 2000);
            } else {
                showErrorMessage('Please fill in all required fields correctly.');
            }
        });
    }
});

function validateContactForm() {
    const form = document.querySelector('form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Loading States
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';
        submitBtn.classList.add('loading');
    }
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Restore original text based on form type
        if (window.location.pathname.includes('appointment')) {
            submitBtn.innerHTML = 'Submit Appointment Request';
        } else if (window.location.pathname.includes('contact')) {
            submitBtn.innerHTML = 'Send Message';
        } else {
            submitBtn.innerHTML = 'Submit';
        }
    }
}

// Notification System
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll to Top Functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'fixed bottom-4 right-4 bg-navy text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 opacity-0 pointer-events-none';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        background-color: var(--navy);
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 1.25rem;
        font-weight: bold;
        z-index: 40;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });
}

// Initialize scroll to top on page load
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Doctor Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const doctorCards = document.querySelectorAll('.doctor-card, .min-w-\\[220px\\]');
    
    doctorCards.forEach(card => {
        const bookBtn = card.querySelector('button');
        if (bookBtn) {
            bookBtn.addEventListener('click', function() {
                const doctorName = card.querySelector('.font-semibold')?.textContent;
                if (doctorName) {
                    // Redirect to appointment page with doctor pre-selected
                    window.location.href = `appointment.html?doctor=${encodeURIComponent(doctorName)}`;
                }
            });
        }
    });
});

// URL Parameter Handling for Appointment Form
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('appointment')) {
        const urlParams = new URLSearchParams(window.location.search);
        const doctorParam = urlParams.get('doctor');
        
        if (doctorParam) {
            const doctorSelect = document.querySelector('select[name="doctor"]');
            if (doctorSelect) {
                // Try to match the doctor name to a select option
                const options = doctorSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent.includes(doctorParam)) {
                        option.selected = true;
                    }
                });
            }
        }
    }
});

// Search Functionality (if needed)
function initializeSearch() {
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-searchable]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query)) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }
}

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    const formType = form.id || 'unknown';
    trackEvent('form_submission', { form_type: formType });
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn-primary, .btn-secondary, .btn-success')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('button_click', { button_text: buttonText });
    }
});

// Performance Monitoring
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.now();
    trackEvent('page_load', { load_time: Math.round(loadTime) });
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
