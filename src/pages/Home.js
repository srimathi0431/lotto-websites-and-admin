import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutLottoLink from '../components/AboutLottoLink';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import { initScrollReveal, cleanupScrollReveal } from '../utils/scrollReveal';

const Home = () => {
  useEffect(() => {
    const observer = initScrollReveal();
    return () => { cleanupScrollReveal(observer); };
  }, []);

  return (
    <main>
      <Hero />
      <AboutLottoLink />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTA />
    </main>
  );
};

export default Home;
