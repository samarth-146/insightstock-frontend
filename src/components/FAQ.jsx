import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is InsightStocks a reliable platform for stock market insights?",
      answer: "Yes, InsightStocks is a trusted platform that combines community expertise with advanced analytics. We use LSTM for predictive analysis and maintain strict market integrity through structured submission times and performance tracking."
    },
    {
      question: "How long does it take to start using InsightStocks?",
      answer: "You can start using InsightStocks immediately after signing up. The registration process takes less than 5 minutes, and you'll have instant access to community insights and basic features."
    },
    {
      question: "What features are included in the premium membership?",
      answer: "Premium members get access to exclusive tips from top contributors (those with over 1,000 followers), advanced analytics features, and detailed performance metrics for better decision-making."
    },
    {
      question: "How does the tip verification system work?",
      answer: "Tips must be submitted before market opens at 8:45. Our algorithm evaluates each tip's accuracy at market close by comparing the predicted performance against actual market data, providing transparency and accountability."
    },
    {
      question: "How can I become a premium content creator?",
      answer: "To become a premium content creator, you need to build a following of 1,000+ subscribers and maintain a consistent track record of accurate predictions. Once qualified, you can start creating members-only content."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      padding: '4rem 0',
      background: 'linear-gradient(to right, #EBF4FF, #E0E7FF)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1F2937',
            marginBottom: '1rem'
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#4B5563'
          }}>
            Questions on your mind? We've got the answers you need!
          </p>
        </div>
        <div style={{
          maxWidth: '56rem',
          margin: '0 auto',
          background: 'white',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{
              borderBottom: index < faqs.length - 1 ? '1px solid #E5E7EB' : 'none',
              marginBottom: '0.5rem'
            }}>
              <button
                onClick={() => toggleAccordion(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  color: '#1F2937',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {faq.question}
                <span style={{
                  transition: 'transform 0.2s',
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)'
                }}>▼</span>
              </button>
              {openIndex === index && (
                <div style={{
                  padding: '0.5rem 1rem 1rem',
                  fontSize: '1rem',
                  color: '#4B5563'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;

