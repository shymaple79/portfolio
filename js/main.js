// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            
            // Highlight current page in navigation
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('nav ul li a');
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === currentPage || 
                    (currentPage === '' && linkHref === 'index.html') ||
                    (currentPage === '/' && linkHref === 'index.html')) {
                    link.style.fontWeight = 'bold';
                    link.style.borderBottom = '2px solid var(--primary-color)';
                }
            });
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Initialize any gallery or interactive elements
    initializeGallery();
});

// Function to initialize gallery lightbox effect (if needed)
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Simple lightbox implementation could go here
                // For a production site, you might want to use a library like Lightbox or Fancybox
                console.log('Gallery item clicked:', this.alt);
            });
        });
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.tagName.toLowerCase() === 'a') {
        const href = target.getAttribute('href');
        
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Add animations when elements come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
}

// Call on scroll and on page load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);