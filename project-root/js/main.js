// js/main.js - Modern JavaScript with ES6+ Features

// 1. Modern Class-based Architecture
class ModernWebsite {
  constructor() {
    this.init();
  }

  // 2. Async/Await for initialization
  async init() {
    console.log('🚀 Initializing Modern Website...');
    
    // Wait for DOM to be ready
    await this.waitForDOM();
    
    // Initialize features
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupFormHandling();
    this.setupAnimations();
    
    console.log('✅ Website initialized successfully!');
  }

  // 3. Promise-based DOM ready
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  // 4. Modern Event Delegation
  setupNavigation() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });

    // Active navigation highlighting
    this.updateActiveNavigation();
  }

  // 5. Modern Scroll Effects with Intersection Observer
  setupScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
      
      lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });
  }

  // 6. Modern Form Handling with Fetch API
  setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data using modern FormData API
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
          await this.submitForm(data);
          this.showNotification('Message sent successfully! 🎉', 'success');
          contactForm.reset();
        } catch (error) {
          this.showNotification('Failed to send message. Please try again. 😞', 'error');
          console.error('Form submission error:', error);
        }
      });
    }
  }

  // 7. Modern Fetch API with async/await
  async submitForm(data) {
    // Simulate API call (replace with real endpoint)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Form data:', data);
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.3) {
          resolve({ success: true });
        } else {
          reject(new Error('Network error'));
        }
      }, 1000);
    });

    // Real API call would look like this:
    /*
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
    */
  }

  // 8. Modern Notification System
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // 9. Modern Animation Setup
  setupAnimations() {
    // Add staggered animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      
      // Stagger the animations
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // 10. Modern Navigation Active State
  updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Check if link matches current page
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage || 
          (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// 11. Modern Utility Functions
class Utils {
  // Debounce function for performance
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Modern localStorage with error handling
  static storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Storage error:', error);
        return false;
      }
    },
    
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Storage error:', error);
        return defaultValue;
      }
    }
  };

  // Modern device detection
  static device = {
    isMobile: () => window.innerWidth <= 768,
    isTouch: () => 'ontouchstart' in window,
    isOnline: () => navigator.onLine
  };
}

// 12. Modern Module Pattern - Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the website
  window.modernWebsite = new ModernWebsite();
  
  // Add some modern browser features
  if ('serviceWorker' in navigator) {
    console.log('Service Worker supported');
  }
  
  if ('localStorage' in window) {
    console.log('Local Storage supported');
  }
  
  // Performance monitoring
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
});

// 13. Modern Error Handling
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// 14. Export for module system (if needed)
export { ModernWebsite, Utils };