# Scroll Animations Usage Guide

## Overview
The website now has smooth scroll-based animations. Elements will animate when they come into viewport while scrolling.

## Files Created
1. **`src/hooks/useScrollAnimation.js`** - Custom React hook for scroll detection
2. **`src/styles/animations.css`** - CSS animations and transitions
3. **`src/components/AnimatedSection.jsx`** - Reusable animation wrapper component

## How to Use

### Method 1: Using AnimatedSection Component (Recommended)

```jsx
import AnimatedSection from './components/AnimatedSection';

function MyComponent() {
  return (
    <AnimatedSection animation="slide-up">
      <div className="my-content">
        This content will slide up when scrolled into view
      </div>
    </AnimatedSection>
  );
}
```

### Available Animations

```jsx
// Fade in
<AnimatedSection animation="fade-in">...</AnimatedSection>

// Slide from bottom
<AnimatedSection animation="slide-up">...</AnimatedSection>

// Slide from top
<AnimatedSection animation="slide-down">...</AnimatedSection>

// Slide from right
<AnimatedSection animation="slide-left">...</AnimatedSection>

// Slide from left
<AnimatedSection animation="slide-right">...</AnimatedSection>

// Scale up
<AnimatedSection animation="scale">...</AnimatedSection>

// Zoom in
<AnimatedSection animation="zoom">...</AnimatedSection>
```

### Animation Options

```jsx
<AnimatedSection
  animation="slide-up"        // Animation type
  speed="slow"               // 'fast', 'normal', 'slow'
  once={true}               // Animate only once (true) or every time (false)
  threshold={0.1}           // % of element visible before animating (0-1)
  delay={200}              // Delay in milliseconds
>
  Content here
</AnimatedSection>
```

### Method 2: Using CSS Classes Directly

```jsx
function MyComponent() {
  const [ref, isVisible] = useScrollAnimation();
  
  return (
    <div 
      ref={ref} 
      className={`animate-slide-up ${isVisible ? 'visible' : ''}`}
    >
      Content here
    </div>
  );
}
```

### Staggered Animations (for lists)

```jsx
<div>
  <AnimatedSection animation="slide-up" delay={0}>Item 1</AnimatedSection>
  <AnimatedSection animation="slide-up" delay={100}>Item 2</AnimatedSection>
  <AnimatedSection animation="slide-up" delay={200}>Item 3</AnimatedSection>
</div>
```

## Examples

### Hero Section
```jsx
<AnimatedSection animation="fade-in" speed="slow">
  <h1>Welcome to Lotto Link</h1>
</AnimatedSection>
```

### Feature Cards
```jsx
{features.map((feature, index) => (
  <AnimatedSection 
    key={index}
    animation="slide-up"
    delay={index * 100}
  >
    <FeatureCard {...feature} />
  </AnimatedSection>
))}
```

### CTA Section
```jsx
<AnimatedSection animation="zoom">
  <button>Get Started</button>
</AnimatedSection>
```

## Current Status

✅ **Already Implemented:**
- Features section uses GSAP animations
- Smooth scroll behavior enabled globally

📋 **To Implement:**
Wrap these components with AnimatedSection:
- Hero section elements
- How It Works steps
- Packages cards
- Prize section
- FAQ items
- CTA sections
- Footer sections

## Performance
- Uses Intersection Observer API (efficient)
- Animations respect `prefers-reduced-motion`
- Only animates once by default (can be changed)
- GPU-accelerated transforms

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful fallback for older browsers
