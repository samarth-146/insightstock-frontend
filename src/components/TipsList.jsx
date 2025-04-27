import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function TipsList({ tips, flag = true, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUserId = localStorage.getItem("userId");

  
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
                {new Date(tip.prediction_date).toLocaleDateString()}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-gray-700 mb-2">{tip.reason}</p>
              {flag && (
                <p className="text-sm text-gray-600 mb-2">
                  By:
                  <Link to={`/profile/${tip.user.user_id}`} className="text-blue-600 font-semibold hover:underline">
                    {tip.user.username || "Loading..."}
                  </Link>
                </p>
              )}
              <div className="flex justify-between items-center">
                <p className="text-blue-600 font-semibold">
                  Predicted: ₹{tip.predicted_price.toFixed(2)}
                </p>
                <p className={`font-semibold ${tip.exclusive ? "text-red-600" : "text-green-600"}`}>
                  {tip.stock_score ? "Model Price: " + tip.stock_score : tip.exclusive ? "Exclusive" : "Public"}
                </p>
              </div>
              {onDelete && (
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => {
                    onDelete(tip.id);
                  }}
                >
                  Delete
                </button>
              )}

              {/* {flag && tip.user.user_id === currentUserId && (
                <button
                  onClick={() => onDelete(tip.id)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
