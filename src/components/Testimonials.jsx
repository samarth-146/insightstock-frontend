import React from 'react';

function Testimonials() {
  const testimonials = [
    { name: "John Doe", role: "Day Trader", quote: "InsightStocks has revolutionized my trading strategy. The community insights are invaluable!" },
    { name: "Jane Smith", role: "Investment Analyst", quote: "The predictive analytics feature is a game-changer. It's like having a crystal ball for the stock market." },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold text-gray-800">{testimonial.name}</div>
              <div className="text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

