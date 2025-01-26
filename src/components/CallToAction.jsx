import React from 'react';

function CallToAction() {
  return (
    <section className="bg-blue-600 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Gain the InsightStocks Advantage?</h2>
        <p className="text-xl text-blue-100 mb-8">Join our community of savvy investors and start making informed decisions today.</p>
        <a href="#" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300">
          Sign Up Now
        </a>
      </div>
    </section>
  );
}

export default CallToAction;
