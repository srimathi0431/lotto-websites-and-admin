// Scroll reveal animation utility with parallax effects using Intersection Observer

export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const revealOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Optional: stop observing after reveal
        // observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });

  return observer;
};

// Parallax scroll effect for elements with data-parallax attribute
export const initParallax = () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (!parallaxElements.length) return;

  const handleScroll = () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  };

  // Use requestAnimationFrame for smooth performance
  let ticking = false;
  
  const optimizedScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', optimizedScroll);
  };
};

// Clean up observer
export const cleanupScrollReveal = (observer) => {
  if (observer) {
    observer.disconnect();
  }
};
