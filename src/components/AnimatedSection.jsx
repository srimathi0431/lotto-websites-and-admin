import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/animations.css';

/**
 * AnimatedSection Component
 * Wraps content with scroll-based animation
 * 
 * @param {string} animation - Animation type: 'fade-in', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'zoom'
 * @param {boolean} once - Whether to animate only once (default: true)
 * @param {number} threshold - Percentage of element visible before animating (default: 0.1)
 * @param {string} speed - Animation speed: 'fast', 'normal', 'slow' (default: 'normal')
 * @param {number} delay - Delay in milliseconds before animation starts
 */
const AnimatedSection = ({ 
  children, 
  animation = 'slide-up',
  once = true,
  threshold = 0.1,
  speed = 'normal',
  delay = 0,
  className = '',
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation({ once, threshold });

  const animationClass = `animate-${animation}`;
  const speedClass = speed !== 'normal' ? `animate-${speed}` : '';
  const visibleClass = isVisible ? 'visible' : '';

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`${animationClass} ${speedClass} ${visibleClass} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
