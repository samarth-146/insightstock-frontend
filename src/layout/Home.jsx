import React, { useState, useEffect } from "react"
import TipsList from "../components/TipsList"
import TopStocksWidget from "../components/TopStocksWidgets"

export default function Home() {
  const [tips, setTips] = useState([])
  const [topStocks, setTopStocks] = useState([])

  useEffect(() => {
    // Fetch tips
    const fetchTips = async () => {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setTips([
        {
          id: 1,
          userName: "JohnDoe",
          stockName: "AAPL",
          description: "Apple's new product launch could boost stock price",
          predictedPrice: 150.75,
          predictedModelPrice: 149.5,
          date: "2023-05-15",
        },
        {
          id: 2,
          userName: "JaneSmith",
          stockName: "GOOGL",
          description: "Google's AI advancements may lead to increased revenue",
          predictedPrice: 2800.5,
          predictedModelPrice: 2795.25,
          date: "2023-05-14",
        },
        {
          id: 3,
          userName: "MikeJohnson",
          stockName: "TSLA",
          description: "Tesla's new factory opening might improve production rates",
          predictedPrice: 900.25,
          predictedModelPrice: 905.75,
          date: "2023-05-13",
        },
        {
          id: 4,
          userName: "EmilyBrown",
          stockName: "AMZN",
          description: "Amazon's expansion into healthcare could be a game-changer",
          predictedPrice: 3500.0,
          predictedModelPrice: 3489.5,
          date: "2023-05-12",
        },
        {
          id: 5,
          userName: "DavidWilson",
          stockName: "MSFT",
          description: "Microsoft's cloud services growth may exceed expectations",
          predictedPrice: 300.75,
          predictedModelPrice: 298.25,
          date: "2023-05-11",
        },
      ])
    }

    // Fetch top stocks
    const fetchTopStocks = async () => {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setTopStocks([
        { symbol: "RELIANCE", name: "Reliance Industries", lastClosedPrice: 2500.75 },
        { symbol: "TCS", name: "Tata Consultancy Services", lastClosedPrice: 3200.5 },
        { symbol: "HDFCBANK", name: "HDFC Bank", lastClosedPrice: 1450.25 },
        { symbol: "INFY", name: "Infosys", lastClosedPrice: 1300.0 },
        { symbol: "HINDUNILVR", name: "Hindustan Unilever", lastClosedPrice: 2600.75 },
        { symbol: "ICICIBANK", name: "ICICI Bank", lastClosedPrice: 750.5 },
        { symbol: "SBIN", name: "State Bank of India", lastClosedPrice: 450.25 },
        { symbol: "BHARTIARTL", name: "Bharti Airtel", lastClosedPrice: 600.0 },
        { symbol: "ITC", name: "ITC", lastClosedPrice: 275.5 },
        { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", lastClosedPrice: 1800.25 },
      ])
    }

    fetchTips()
    fetchTopStocks()
  }, [])

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Second column: Scrollable list of tips with search bar */}
      <div className="w-4/6 p-4 overflow-y-auto">
        <TipsList tips={tips} />
      </div>

      {/* Third column: Nifty50 Widget and Top 10 stocks last day closed price */}
      <div className="w-1/3 bg-white shadow-lg p-4 overflow-y-auto">
        <div className="mt-6">
          <TopStocksWidget stocks={topStocks} />
        </div>
      </div>
    </div>
  )
}

