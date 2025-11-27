
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    
    // Reduced to 1.8 seconds
    setTimeout(() => {
        loader.classList.add('fade-out');
        pageContent.classList.add('visible');
        
        // Initialize scroll reveals after page is visible
        setTimeout(() => {
            initScrollReveal();
            loader.style.display = 'none';
        }, 600);
    }, 1800);
});

// =========================================
// SCROLL PROGRESS BAR
// =========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
}

initScrollProgress();

// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================

function initScrollReveal() {
    // Add reveal classes to elements
    document.querySelectorAll('.section h2').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.section-subtitle').forEach(el => {
        el.classList.add('reveal', 'reveal-delay-1');
    });
    
    document.querySelectorAll('.subsection').forEach(el => {
        el.classList.add('reveal');
    });
    
    document.querySelectorAll('.text-content').forEach(el => {
        el.classList.add('stagger-children');
        el.querySelectorAll('.subsection').forEach(child => {
            child.classList.add('reveal-child');
        });
    });
    
    document.querySelectorAll('.pathway-list').forEach(el => {
        el.classList.add('stagger-children');
        el.querySelectorAll('li').forEach(child => {
            child.classList.add('reveal-child');
        });
    });
    
    document.querySelectorAll('figure').forEach(el => {
        el.classList.add('image-reveal');
    });
    
    document.querySelectorAll('.sources').forEach(el => {
        el.classList.add('reveal');
    });
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .stagger-children, .image-reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

// =========================================
// IMAGE LOADING STATES
// =========================================

function initImageLoading() {
    document.querySelectorAll('figure img').forEach(img => {
        // If already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
            img.closest('figure')?.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                img.closest('figure')?.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                // Still remove shimmer on error
                img.closest('figure')?.classList.add('loaded');
            });
        }
    });
}

initImageLoading();

// =========================================
// MOBILE NAVIGATION
// =========================================

function initMobileNav() {
    // Create toggle button
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle navigation');
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    
    // Create mobile nav
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <ul class="mobile-nav-menu">
            <li><a href="#background">Background</a></li>
            <li><a href="#cells">Cells</a></li>
            <li><a href="#genes">Genes</a></li>
            <li><a href="#pathways">Pathways</a></li>
            <li><a href="#cure">Cure</a></li>
        </ul>
    `;
    
    // Add to DOM
    document.querySelector('.nav-container').appendChild(navToggle);
    document.body.appendChild(overlay);
    document.body.appendChild(mobileNav);
    
    // Toggle functionality
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('visible');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }
    
    navToggle.addEventListener('click', toggleMobileNav);
    overlay.addEventListener('click', toggleMobileNav);
    
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileNav();
        });
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            toggleMobileNav();
        }
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const mobileLinks = mobileNav.querySelectorAll('a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

initMobileNav();

// =========================================
// BACK TO TOP BUTTON
// =========================================

function initBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = `
        <svg viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
        
        // Check if we're in a light or dark section
        const sections = document.querySelectorAll('.section');
        let inLightSection = false;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            
            if (rect.top < buttonRect.bottom && rect.bottom > buttonRect.top) {
                if (!section.classList.contains('section-alt')) {
                    inLightSection = true;
                }
            }
        });
        
        if (inLightSection) {
            button.classList.add('light-section');
        } else {
            button.classList.remove('light-section');
        }
    }, { passive: true });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

initBackToTop();

// =========================================
// SMOOTH SCROLLING FOR NAV LINKS
// =========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// =========================================
// ACTIVE NAV LINK HIGHLIGHTING
// =========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// =========================================
// HOTSPOT FUNCTIONALITY
// =========================================

document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close all other hotspots
        document.querySelectorAll('.hotspot.active').forEach(h => {
            if (h !== this) h.classList.remove('active');
        });
        
        // Toggle this hotspot
        this.classList.toggle('active');
    });
});

// Close hotspots when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.hotspot')) {
        document.querySelectorAll('.hotspot.active').forEach(h => {
            h.classList.remove('active');
        });
    }
});

// Close hotspots with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.hotspot.active').forEach(h => {
            h.classList.remove('active');
        });
    }
});

// =========================================
// IMAGE MODAL
// =========================================

document.querySelectorAll('.hotspot-container img').forEach(img => {
    img.addEventListener('click', function(e) {
        // Check if click is near a hotspot
        const container = this.closest('.hotspot-container');
        const hotspots = container.querySelectorAll('.hotspot');
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        let nearHotspot = false;
        hotspots.forEach(hotspot => {
            const style = hotspot.getAttribute('style');
            const topMatch = style.match(/top:\s*([\d.]+)%/);
            const leftMatch = style.match(/left:\s*([\d.]+)%/);
            if (topMatch && leftMatch) {
                const hotspotY = parseFloat(topMatch[1]);
                const hotspotX = parseFloat(leftMatch[1]);
                const distance = Math.sqrt(Math.pow(x - hotspotX, 2) + Math.pow(y - hotspotY, 2));
                if (distance < 8) nearHotspot = true;
            }
        });
        
        if (nearHotspot) {
            e.stopPropagation();
            return;
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 4px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.95);
            transition: transform 0.3s ease;
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modalImg.style.transform = 'scale(1)';
        });
        
        // Close modal function
        const closeModal = () => {
            modal.style.opacity = '0';
            modalImg.style.transform = 'scale(0.95)';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }, 300);
        };
        
        modal.addEventListener('click', closeModal);
        
        // Close on escape
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// =========================================
// CONSOLE LOG
// =========================================

console.log('Barth Syndrome Presentation - Enhanced Version Loaded');
