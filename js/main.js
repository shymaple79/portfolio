// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            setupNavigation();
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

// Function to handle client-side routing
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't handle external links or mailto links
            if (this.hostname !== window.location.hostname || this.protocol === 'mailto:') {
                return;
            }

            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Update URL without reload
            window.history.pushState({}, '', href);
            
            // Load the new page content
            loadPage(href);
            
            // Update active link
            updateActiveLink(href);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        loadPage(window.location.pathname);
        updateActiveLink(window.location.pathname);
    });
}

// Function to load page content
function loadPage(url) {
    // Extract the page name from the URL
    const pageName = url.split('/').pop() || 'index.html';
    
    // Fetch the new page content
    fetch(pageName)
        .then(response => response.text())
        .then(html => {
            // Create a temporary element to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Update the main content
            const newContent = doc.querySelector('main');
            if (newContent) {
                document.querySelector('main').innerHTML = newContent.innerHTML;
            }
            
            // Update the page title
            document.title = doc.title;
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Reinitialize any necessary components
            initializeGallery();
        })
        .catch(error => console.error('Error loading page:', error));
}

// Function to update active link in navigation
function updateActiveLink(currentPath) {
    const navLinks = document.querySelectorAll('nav ul li a');
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === pageName || 
            (pageName === '' && linkHref === 'index.html') ||
            (pageName === '/' && linkHref === 'index.html')) {
            link.style.fontWeight = 'bold';
            link.style.borderBottom = '2px solid var(--primary-color)';
        } else {
            link.style.fontWeight = 'normal';
            link.style.borderBottom = 'none';
        }
    });
}

// Function to initialize gallery lightbox effect (if needed)
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                // Simple lightbox implementation could go here
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