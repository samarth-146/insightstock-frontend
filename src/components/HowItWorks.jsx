import React from 'react';

function HowItWorks() {
  const steps = [
    { title: "Sign Up", description: "Create your account and set up your profile." },
    { title: "Explore Tips", description: "Browse and analyze stock tips from the community." },
    { title: "Submit Predictions", description: "Share your own insights before market open." },
    { title: "Track Performance", description: "Monitor the accuracy of tips and refine your strategy." },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 text-center mb-8 md:mb-0">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

