import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function TipsList({ tips }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchUsernames = async () => {
      const newUsernames = {};
      for (const tip of tips) {
        if (!tip.user) continue;
        try {
          const response = await fetch(`http://localhost:8080/users/${tip.user}`);
          const data = await response.json();
          newUsernames[tip.user] = data.username;
        } catch (error) {
          console.error(`Error fetching user ${tip.user}:`, error);
          newUsernames[tip.user] = "Unknown User";
        }
      }
      setUsernames(newUsernames);
    };

    fetchUsernames();
  }, [tips]);

  const filteredTips = tips.filter((tip) =>
    tip.stock_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col p-4">
      <input
        type="text"
        placeholder="Search by stock name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-y-auto flex-grow">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{tip.stock_name}</h3>
              <span className="text-sm text-gray-500">
                {new Date(tip.created_on).toLocaleDateString()}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-gray-700 mb-2">{tip.reason}</p>
              <p className="text-sm text-gray-600 mb-2">
                By: 
                <Link to={`/profile/${tip.user}`} className="text-blue-600 font-semibold hover:underline">
                  {usernames[tip.user] || "Loading..."}
                </Link>
              </p>
              <div className="flex justify-between">
                <p className="text-blue-600 font-semibold">
                  Predicted: ₹{tip.predicted_price.toFixed(2)}
                </p>
                <p className={`font-semibold ${tip.exclusive ? "text-red-600" : "text-green-600"}`}>
                  {tip.exclusive ? "Exclusive" : "Public"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
