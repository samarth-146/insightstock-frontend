import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function TipsList({ tips }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTips = tips.filter(
    (tip) =>
      tip.stockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col">
      <input
        type="text"
        placeholder="Search by stock name or user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-y-auto flex-grow">
        {filteredTips.map((tip) => (
          <div key={tip.id} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-4 py-3 bg-gray-50">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{tip.stockName}</h3>
                <span className="text-sm text-gray-500">{tip.date}</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-600 mb-2">
                by{" "}
                <Link to={`/user/${tip.userName}`} className="text-blue-600 hover:underline">
                  {tip.userName}
                </Link>
              </p>
              <p className="text-gray-700 mb-4">{tip.description}</p>
              <div className="flex justify-between">
                <p className="text-blue-600 font-semibold">Predicted: ${tip.predictedPrice.toFixed(2)}</p>
                <p className="text-green-600 font-semibold">Model: ${tip.predictedModelPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

