import React from 'react';

function Hero() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Empower Your Stock Market Decisions
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Join InsightStocks to access user-generated content, predictive analytics, and exclusive insights.
        </p>
        <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;

