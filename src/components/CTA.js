import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const formRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const text = textRef.current;
    const buttons = buttonsRef.current;
    const features = featuresRef.current;

    // Form animation - from left
    gsap.fromTo(
      form,
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    // Text animation - from right
    gsap.fromTo(
      text,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    // Buttons animation
    gsap.fromTo(
      buttons.children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    // Features stagger animation
    gsap.fromTo(
      features,
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    alert('Form submitted! We will contact you soon.');
  };

  return (
    <section className="cta" ref={sectionRef}>
      <div className="container">
        <div className="cta-two-column">
          <div className="cta-gradient-blob blob-1"></div>
          <div className="cta-gradient-blob blob-2"></div>
          <div className="cta-gradient-blob blob-3"></div>

          {/* LEFT SIDE - FORM */}
          <div className="cta-form-container" ref={formRef}>
            <h3>Get Started Today</h3>
            <p className="form-subtitle">Fill in your details and we'll get you started on your lottery journey!</p>
            
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your.email@example.com"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="+1 (555) 000-0000"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="package">Preferred Package</label>
                <select id="package" name="package" required>
                  <option value="">Select a package</option>
                  <option value="daily">Daily Package</option>
                  <option value="weekly">Weekly Package</option>
                  <option value="monthly">Monthly Package</option>
                  <option value="premium">Premium Package</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-large form-submit-btn">
                Submit & Get Started
              </button>
            </form>
          </div>

          {/* RIGHT SIDE - CTA CONTENT */}
          <div className="cta-content-right">
            <div className="cta-text" ref={textRef}>
              <h2>
                Ready to Start Your <span className="text-gradient">Lottery Journey</span>?
              </h2>
              <p>Join thousands of satisfied users who trust Lotto Link for their lottery information needs. Get instant access to premium packages and expert insights today.</p>
            </div>

            <div className="cta-buttons" ref={buttonsRef}>
              <Link to="/register" className="btn btn-outline btn-large">
                Create Account
              </Link>
              <a href="#packages" className="btn btn-secondary btn-large">
                View Packages
              </a>
            </div>

            <div className="cta-features">
              <div className="cta-feature" ref={(el) => (featuresRef.current[0] = el)}>
                <span className="cta-feature-dot"></span>
                <span>Instant Access</span>
              </div>
              <div className="cta-feature" ref={(el) => (featuresRef.current[1] = el)}>
                <span className="cta-feature-dot"></span>
                <span>Premium Content</span>
              </div>
              <div className="cta-feature" ref={(el) => (featuresRef.current[2] = el)}>
                <span className="cta-feature-dot"></span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-particle particle-1"></div>
      <div className="cta-particle particle-2"></div>
      <div className="cta-particle particle-3"></div>
      <div className="cta-particle particle-4"></div>
    </section>
  );
};

export default CTA;
