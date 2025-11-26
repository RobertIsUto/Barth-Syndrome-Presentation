// Loading Screen Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');
    
    // Wait for the loading animation to complete
    setTimeout(() => {
        loader.classList.add('fade-out');
        pageContent.classList.add('visible');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2800); // Match this with the loader-progress animation duration
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all figures for animation
document.querySelectorAll('figure').forEach(figure => {
    figure.style.opacity = '0';
    figure.style.transform = 'translateY(30px)';
    figure.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(figure);
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
        link.style.color = '#fff';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#e94560';
        }
    });
});

// Image modal functionality is now integrated with hotspot detection above

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('Barth Syndrome Website loaded successfully!');

// Hotspot click/touch functionality for mobile
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

// Prevent image modal from opening when clicking on hotspot
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
        
        // Open modal for image
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(233, 69, 96, 0.3);
        `;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
});
