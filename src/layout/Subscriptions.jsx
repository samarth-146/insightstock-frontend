import React from "react"

export default function Subscriptions() {
  const dummySubscriptions = [
    {
      id: 1,
      name: "Alice Johnson",
      email:"abc@gmail.com",
      tipCount: 15,
      topStocks: ["AAPL", "GOOGL", "MSFT"],
    },
    {
      id: 2,
      name: "Bob Smith",
      email:"abc@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 23,
      recentPerformance: -2.1,
      topStocks: ["TSLA", "AMZN", "NVDA"],
    },
    {
      id: 3,
      name: "Charlie Brown",
      email:"abc@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 7,
      recentPerformance: 12.3,
      topStocks: ["FB", "NFLX", "ADBE"],
    },
    {
      id: 4,
      name: "Diana Ross",
      email:"abc@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      tipCount: 31,
      recentPerformance: 5.7,
      topStocks: ["DIS", "PYPL", "CRM"],
    },
    {
      id: 5,
      name: "Ethan Hunt",
      email:"abc@gmail.com",
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
                <div>
                  <h2 className="text-xl font-semibold">{sub.name}</h2>
                  <p className="text-sm text-gray-500">{sub.tipCount} tips</p>
                </div>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {/* <h3 className="text-lg font-semibold mb-2">{sub.email}</h3> */}
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

