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
          const tipsRes = await fetch(
              `http://localhost:8080/tips/user/exclusive/${currentUser}`
          );
          const userTips = await tipsRes.json();
          
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
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTopStocks([
          {
            symbol: "RELIANCE",
            name: "Reliance Industries",
            lastClosedPrice: 2500.75,
          },
          {
            symbol: "TCS",
            name: "Tata Consultancy Services",
            lastClosedPrice: 3200.5,
          },
          { symbol: "HDFCBANK", name: "HDFC Bank", lastClosedPrice: 1450.25 },
          { symbol: "INFY", name: "Infosys", lastClosedPrice: 1300.0 },
          {
            symbol: "HINDUNILVR",
            name: "Hindustan Unilever",
            lastClosedPrice: 2600.75,
          },
          { symbol: "ICICIBANK", name: "ICICI Bank", lastClosedPrice: 750.5 },
          {
            symbol: "SBIN",
            name: "State Bank of India",
            lastClosedPrice: 450.25,
          },
          { symbol: "BHARTIARTL", name: "Bharti Airtel", lastClosedPrice: 600.0 },
          { symbol: "ITC", name: "ITC", lastClosedPrice: 275.5 },
          {
            symbol: "KOTAKBANK",
            name: "Kotak Mahindra Bank",
            lastClosedPrice: 1800.25,
          },
        ]);
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
