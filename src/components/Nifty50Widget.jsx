import { useState, useEffect } from 'react';

export default function Nifty50Widget() {
  const [niftyPrice, setNiftyPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // In a real application, you would fetch this data from a financial API
    const fetchNiftyPrice = () => {
      // Simulating API call with random price generation
      const mockPrice = 17000 + Math.random() * 1000;
      setNiftyPrice(mockPrice);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchNiftyPrice();
    const interval = setInterval(fetchNiftyPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">NIFTY50 Last Price</h2>
      {niftyPrice !== null ? (
        <div>
          <p className="text-3xl font-bold text-blue-600">₹{niftyPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
