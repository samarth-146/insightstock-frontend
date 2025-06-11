import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import TipsList from "../components/TipsList";
import TopStocksWidget from "../components/TopStocksWidgets";

export default function ExclusiveTipsPage() {
  const [tips, setTips] = useState([]);
  const [topStocks, setTopStocks] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
      const fetchTips = async () => {
        if (!currentUser) return;
  
        try {
          
          let allTips = [];
          let currentUser = localStorage.getItem("userId");
          const tipsRes = await fetch(`https://insightstock-latest.onrender.com/tips/exclusive` , {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
              }
          );
          const userTips = await tipsRes.json();
          console.log(userTips)
          
          allTips = [...allTips, ...userTips];
          console.log(allTips);
          allTips = allTips.filter((tip) => tip.user !== currentUser);
          // Sort tips by created_on (newest first)
          allTips.sort((a, b) => new Date(b.created_on) - new Date(a.created_on));
  
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
      <div className="w-4/6 p-4 overflow-y-auto">
        {setTips ? (
          <TipsList tips={tips} />
        ) : (
          <div className="text-center text-gray-500 mt-10">
            You haven't been a member of any user.
          </div>
        )}
      </div>

      <div className="w-1/3 bg-white shadow-lg p-4 overflow-y-auto">
        <div className="mt-6">
          <TopStocksWidget stocks={topStocks} />
        </div>
      </div>
    </div>
  );
}
