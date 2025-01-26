import React from 'react';

function Features() {
  const features = [
    { title: "User-Generated Content", description: "Access and share stock tips from a community of enthusiasts." },
    { title: "Predictive Analytics", description: "Leverage LSTM for data-driven insights on tip accuracy." },
    { title: "Exclusive Insights", description: "Subscribe to top contributors for members-only tips." },
    { title: "Market Integrity", description: "Structured submission times ensure fair and transparent predictions." },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

