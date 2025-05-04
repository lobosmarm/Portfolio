// Main JavaScript for portfolio site

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll to target section with smooth behavior
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Simple form validation for contact form (if present)
    const contactForm = document.querySelector('.contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = contactForm.querySelector('input[type="text"]');
            const emailField = contactForm.querySelector('input[type="email"]');
            const messageField = contactForm.querySelector('textarea');
            
            // Basic validation
            let isValid = true;
            
            if (!nameField.value.trim()) {
                showFieldError(nameField, 'Please enter your name');
                isValid = false;
            } else {
                clearFieldError(nameField);
            }
            
            if (!emailField.value.trim()) {
                showFieldError(emailField, 'Please enter your email');
                isValid = false;
            } else if (!isVali
