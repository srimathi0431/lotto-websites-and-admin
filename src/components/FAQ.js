import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);
  const supportRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const items = itemsRef.current;
    const support = supportRef.current;

    // Header animation
    gsap.fromTo(
      header,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // FAQ items stagger animation
    gsap.fromTo(
      items,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    );

    // Support card animation
    if (support) {
      gsap.fromTo(
        support,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: support,
            start: 'top 85%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const faqs = [
    {
      question: 'What is Lotto Link?',
      answer: 'Lotto Link is a premium platform that provides comprehensive lottery information, strategies, and downloadable packages to help lottery enthusiasts make informed decisions. We offer curated content, expert analysis, and valuable insights.',
    },
    {
      question: 'How do I download packages?',
      answer: 'Simply browse our packages section, select the package that suits your needs, and click the "Download Package" button. Your selected package will be downloaded immediately in PDF format to your device.',
    },
    {
      question: 'Are the packages updated regularly?',
      answer: 'Yes! We regularly update our packages with the latest lottery information, trends, and strategies. Premium members receive automatic notifications when new content is available.',
    },
    {
      question: 'What formats are the packages available in?',
      answer: 'All our packages are available in PDF format, which is universally compatible with all devices including computers, tablets, and smartphones. PDFs can be easily viewed, printed, and stored for future reference.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use industry-standard encryption and security measures to protect your personal information and payment details. Your privacy and security are our top priorities.',
    },
    {
      question: 'Can I access packages on multiple devices?',
      answer: 'Yes, once you download a package, you can access it on any device. Simply transfer the PDF file to your other devices or re-download from your account dashboard.',
    },
    {
      question: 'Do you offer customer support?',
      answer: 'We offer 24/7 customer support to assist you with any questions or issues. You can reach our support team through email, live chat, or our contact form.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, PayPal, and other secure payment methods. All transactions are processed through encrypted, secure payment gateways.',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq" ref={sectionRef}>
      <div className="container">
        <div className="faq-header" ref={headerRef}>
          <div className="section-label">FAQ</div>

          <h2>
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>

          <p>Find answers to common questions about Lotto Link, our packages, and how to get started.</p>
        </div>

        <div className="faq-container">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button className="faq-question" onClick={() => toggleAccordion(index)} aria-expanded={activeIndex === index}>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                </button>

                <div className="faq-answer">
                  <div className="faq-answer-content">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-support" ref={supportRef}>
            <div className="support-card">
              <div className="support-glow"></div>
              <h3>Still have questions?</h3>
              <p>Can't find the answer you're looking for? Our support team is here to help.</p>
              <a href="#contact" className="btn btn-primary">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-decoration decoration-1"></div>
      <div className="faq-decoration decoration-2"></div>
      <div className="faq-decoration decoration-3"></div>
    </section>
  );
};

export default FAQ;
