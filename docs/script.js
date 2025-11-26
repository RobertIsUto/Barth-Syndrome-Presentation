// =========================================
// BARTH SYNDROME - PROFESSIONAL B&W DESIGN
// Enhanced JavaScript
// =========================================

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
        }, 1000);
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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add scrolled class for background change
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navbar.style.background = '#000000';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = '#0a0a0a';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all figures and subsections for animation
document.querySelectorAll('figure, .subsection').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(40px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
    observer.observe(element);
});

// Staggered animation for list items
const listObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('li');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 80);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.text-content ul').forEach(list => {
    list.querySelectorAll('li').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    listObserver.observe(list);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 120;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS animations dynamically
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
    @keyframes scaleIn {
        from { 
            opacity: 0;
            transform: scale(0.95);
        }
        to { 
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

console.log('Barth Syndrome Website - Professional B&W Design loaded successfully!');

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

// Enhanced image modal for clicking on images
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
        
        // Create modal with professional styling
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
            animation: fadeIn 0.4s ease;
            backdrop-filter: blur(10px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = this.src;
        modalImg.style.cssText = `
            max-width: 100%;
            max-height: 85vh;
            border-radius: 4px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            filter: grayscale(100%);
        `;
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 32px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            line-height: 1;
            font-weight: 300;
        `;
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
        
        modalContent.appendChild(modalImg);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal function
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            modalContent.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        modal.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
        modalImg.addEventListener('click', (e) => e.stopPropagation());
        
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

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 600) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.querySelector('.hero-content').style.opacity = 1 - (scrolled / 500);
        }
    });
}

// Add subtle hover effects to source cards
document.querySelectorAll('.source-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth reveal for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('reveal');
    sectionObserver.observe(section);
});
