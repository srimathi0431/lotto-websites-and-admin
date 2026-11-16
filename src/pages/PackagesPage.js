import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Packages from '../components/Packages';
import './PackagesPage.css';

gsap.registerPlugin(ScrollTrigger);

const PackagesPage = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.packages-page-cta-btn', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 92%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.6)'
      });

      gsap.from('.packages-page-cta-secondary', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out'
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="packages-page">
      <Packages />
      <div className="packages-page-cta" ref={ctaRef}>
        <Link to="/register" className="packages-page-cta-btn">Get Started Now →</Link>
        <Link to="/prize" className="packages-page-cta-secondary">View Prize Distribution</Link>
      </div>
    </div>
  );
};

export default PackagesPage;
