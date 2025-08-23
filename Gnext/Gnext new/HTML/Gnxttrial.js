// Wrap everything in DOMContentLoaded to ensure HTML is loaded first
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-toggle-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.querySelector('.fixed.inset-0.backdrop-blur-sm');
    
    // Ensure elements exist before adding event listeners
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('-translate-x-full');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.add('-translate-x-full', 'opacity-0');
                mobileMenu.classList.remove('translate-x-0', 'opacity-100');
                if (backdrop) {
                    backdrop.classList.add('opacity-0', 'pointer-events-none');
                    backdrop.classList.remove('opacity-100');
                }
                // Animate hamburger back to normal
                const spans = mobileMenuButton.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0deg) translateY(0px)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0deg) translateY(0px)';
            } else {
                // Open menu
                mobileMenu.classList.remove('-translate-x-full', 'opacity-0');
                mobileMenu.classList.add('translate-x-0', 'opacity-100');
                if (backdrop) {
                    backdrop.classList.remove('opacity-0', 'pointer-events-none');
                    backdrop.classList.add('opacity-100');
                }
                // Animate hamburger to X
                const spans = mobileMenuButton.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            }
        });
    } else {
        console.error("Mobile menu button or menu element not found.");
    }

    // Close menu when clicking backdrop
    if (backdrop) {
        backdrop.addEventListener('click', function() {
            mobileMenu.classList.add('-translate-x-full', 'opacity-0');
            mobileMenu.classList.remove('translate-x-0', 'opacity-100');
            backdrop.classList.add('opacity-0', 'pointer-events-none');
            backdrop.classList.remove('opacity-100');
            
            // Reset hamburger animation
            const spans = mobileMenuButton.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0deg) translateY(0px)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0deg) translateY(0px)';
        });
    }

    // Close menu when clicking on menu items (mobile)
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when navigating to another page
            mobileMenu.classList.add('-translate-x-full', 'opacity-0');
            mobileMenu.classList.remove('translate-x-0', 'opacity-100');
            if (backdrop) {
                backdrop.classList.add('opacity-0', 'pointer-events-none');
                backdrop.classList.remove('opacity-100');
            }
            
            // Reset hamburger animation
            const spans = mobileMenuButton.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0deg) translateY(0px)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0deg) translateY(0px)';
        });
    });

// --- Navigation Active State Management (multi-page) ---
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('nav a[href]');
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const linkPage = linkPath.split('/').pop();

        // Reset classes
        link.classList.remove('text-gnext-orange', 'font-medium');
        link.classList.add('text-gray-800', 'md:text-gray-600');

        // Set active if link matches current page
        if (
            linkPage === currentPage ||
            (linkPage === 'index.html' && (currentPage === '' || currentPage === 'index.html'))
        ) {
            link.classList.add('text-gnext-orange', 'font-medium');
            link.classList.remove('text-gray-800', 'md:text-gray-600');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

// Call on page load
setActiveNavLink();
    // --- About Us Section Tabs ---
    const aboutTabs = document.querySelectorAll('.about-tab');
    const tabContents = {
        'vision': document.getElementById('vision-content'),
        'mission': document.getElementById('mission-content'),
        'values': document.getElementById('values-content')
    };

    if (aboutTabs.length > 0) {
        aboutTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs
                aboutTabs.forEach(t => {
                    t.classList.remove('active');
                    t.classList.remove('border-b-2', 'border-gnext-orange', 'text-gnext-orange', 'font-semibold');
                    t.classList.add('text-gray-600');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                this.classList.add('border-b-2', 'border-gnext-orange', 'text-gnext-orange', 'font-semibold');
                this.classList.remove('text-gray-600');
                
                // Hide all tab contents
                Object.values(tabContents).forEach(content => {
                    if (content) {
                        content.classList.add('hidden');
                        content.classList.remove('active-tab-content');
                    }
                });
                
                // Show target tab content
                if (tabContents[targetTab]) {
                    tabContents[targetTab].classList.remove('hidden');
                    tabContents[targetTab].classList.add('active-tab-content');
                }
            });
        });

        // Set initial active tab
        const initialTab = document.querySelector('.about-tab[data-tab="vision"]');
        if (initialTab) {
            initialTab.click();
        }
    }

    // --- Project Filter Logic ---
    const projectFilterButtons = document.querySelectorAll('.project-filter-button');
    const projectsGrid = document.getElementById('projects-grid');
    const projectCards = projectsGrid ? projectsGrid.querySelectorAll('.card-hover-effect') : [];

    if (projectFilterButtons.length > 0) {
        projectFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all buttons
                projectFilterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-gnext-orange', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-gnext-orange', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-800');
                
                // Filter project cards
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        // Add animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Wait for animation to complete
                    }
                });
            });
        });

        // Initial filter for "All Projects"
        const initialFilterButton = document.querySelector('.project-filter-button[data-category="all"]');
        if (initialFilterButton) {
            initialFilterButton.click();
        }
    }

    // --- Page Navigation History Management ---
    // Store the current page in browser history state
    if (window.history && window.history.replaceState) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        window.history.replaceState({ page: currentPage }, document.title, window.location.href);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        // The browser will handle the navigation, we just need to update active states
        setTimeout(() => {
            setActiveNavLink();
        }, 100);
    });

    // Team Member View More Functionality (if needed)
    const viewMoreButtons = document.querySelectorAll('#team .group button');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // You can add modal functionality here or link to detailed profiles
            console.log('View more clicked for team member');
        });
    });

    // Smooth scrolling for anchor links (only for same-page navigation)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                if (window.history && window.history.pushState) {
                    window.history.pushState(null, null, href);
                }
            }
        });
    });

    // Active navigation highlighting based on scroll position (for same-page sections)
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-gnext-orange', 'font-medium');
                if (link.getAttribute('href') === `#${current}` && current !== '') {
                    link.classList.add('text-gnext-orange', 'font-medium');
                }
            });
        });
    }

    // --- Form Handling (for contact forms, quote forms, etc.) ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add form validation and submission logic here
            console.log('Form submitted:', this);
            // Prevent default for now - add your form handling logic
            // e.preventDefault();
        });
    });

    // --- Initialize page-specific functionality ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Add page-specific initialization based on current page
    switch (currentPage) {
        case 'index.html':
        case '':
            // Home page specific functionality
            console.log('Home page loaded');
            break;
        case 'About us.html':
            // About page specific functionality
            console.log('About page loaded');
            break;
        case 'Team.html':
            // Team page specific functionality
            console.log('Team page loaded');
            break;
        case 'Projects.html':
            // Projects page specific functionality
            console.log('Projects page loaded');
            break;
        case 'Contact us.html':
            // Contact page specific functionality
            console.log('Contact page loaded');
            break;
        case 'Get a quote.html':
            // Quote page specific functionality
            console.log('Quote page loaded');
            break;
        default:
            console.log('Unknown page loaded:', currentPage);
    }
});