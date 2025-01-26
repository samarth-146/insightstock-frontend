import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Landing = ()=>{
    return (
        <div className="app">
          <Header />
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <FAQ />
          <CallToAction />
          <Footer />
        </div>
    );
}

export default Landing