// =========================================
// BARTH SYNDROME - ACADEMIC PRESENTATION
// Simplified Professional JavaScript
// =========================================

// Loading Screen Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    
    // Wait for loading animation to complete
    setTimeout(() => {
        loader.classList.add('fade-out');
        pageContent.classList.add('visible');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2800);
});

// Smooth scrolling for navigation links
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

// Navbar scroll effect - subtle background change
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.style.background = '#000000';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = '#0a0a0a';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
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
});

// Hotspot click/touch functionality
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

// Simple image modal for clicking on images (preserving full color)
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
        
        // Create simple modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
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
            border-radius: 3px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Fade in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
        
        // Close modal function
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        modal.addEventListener('click', closeModal);
        
        // Close on escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// Console log for debugging
console.log('Barth Syndrome Academic Presentation loaded successfully');
