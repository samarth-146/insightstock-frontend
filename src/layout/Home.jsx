import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import TipsList from "../components/TipsList";
import TopStocksWidget from "../components/TopStocksWidgets";

export default function Home() {
  const [tips, setTips] = useState([]);
  const [topStocks, setTopStocks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTips = async () => {
      if (!currentUser) return;

      try {
        
        let allTips = [];
        const tipsRes = await fetch(
            `https://insightstock-latest.onrender.com/tips`
        );
        const userTips = await tipsRes.json();
        
        allTips = [...allTips, ...userTips];
        console.log(allTips);
        let currentUser = localStorage.getItem("userId");
        allTips = allTips.filter((tip) => tip.user.user_id !== currentUser);
        // Sort tips by created_on (newest first)
        allTips.sort((a, b) => new Date(a.prediction_date) - new Date(b.prediction_date));

        setTips(allTips);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTips();
  }, [currentUser]);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        const res = await fetch("/api/stocks");
        const data = await res.json();
        console.log(data);
  
        const formatted = data.map((stock) => ({
          symbol: stock.stockName,
          name: stock.stockName, // you can customize this if full name is separate
          lastClosedPrice: stock.previousClosingPrice,
        }));
  
        setTopStocks(formatted);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
  
    fetchTopStocks();
  }, []);
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Second column: Scrollable list of tips */}
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
  );
}
