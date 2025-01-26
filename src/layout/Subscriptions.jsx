import React from "react"

export default function Subscriptions() {
  const dummySubscriptions = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 15,
      recentPerformance: 8.5,
      topStocks: ["AAPL", "GOOGL", "MSFT"],
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 23,
      recentPerformance: -2.1,
      topStocks: ["TSLA", "AMZN", "NVDA"],
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 7,
      recentPerformance: 12.3,
      topStocks: ["FB", "NFLX", "ADBE"],
    },
    {
      id: 4,
      name: "Diana Ross",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 31,
      recentPerformance: 5.7,
      topStocks: ["DIS", "PYPL", "CRM"],
    },
    {
      id: 5,
      name: "Ethan Hunt",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 19,
      recentPerformance: -1.8,
      topStocks: ["INTC", "AMD", "CSCO"],
    },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Subscriptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummySubscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center space-x-4">
                {/* <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={sub.avatar || "/placeholder.svg"} alt={sub.name} />
                </div> */}
                <div>
                  <h2 className="text-xl font-semibold">{sub.name}</h2>
                  <p className="text-sm text-gray-500">{sub.tipCount} tips</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Recent Performance</h3>
                <div className="flex space-x-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sub.recentPerformance >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {sub.recentPerformance >= 0 ? "+" : ""}
                    {sub.recentPerformance}%
                  </span>
                  <span className="text-sm text-gray-500">Last 30 days</span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Top Stocks</h3>
                <div className="flex flex-wrap gap-2">
                  {sub.topStocks.map((stock, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {stock}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Unsubscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

