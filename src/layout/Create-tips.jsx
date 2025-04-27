import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTip() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stockName: "",
    date: "",
    description: "",
    predictedPrice: "",
    exclusive: false,
  });

  const [stockList, setStockList] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMonetized, setIsMonetized] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const isMarketOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // return (hours < 8 || (hours === 8 && minutes < 45)) || (hours >= 17);
    return true;
  }
  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await axios.get("http://localhost:8080/stocks");
        setStockList(response.data);
        setFilteredStocks(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    }

    async function checkUserMembership() {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:8080/users/${userId}`
        );
        let data = await response.json()
        console.log(data)
        if (data && data.monetized) {
          setIsMonetized(true);
        } else {
          console.log("User is not monetized");
        }
      } catch (error) {
        console.error("Error fetching user membership:", error);
      }
    }

    fetchStocks();
    checkUserMembership();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStockSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setShowDropdown(true);

    if (query === "") {
      setFilteredStocks(stockList);
    } else {
      setFilteredStocks(
        stockList.filter((stock) =>
          stock.stockName.toLowerCase().includes(query)
        )
      );
    }

    setHighlightedIndex(0);
  };

  const handleStockSelect = (stockName) => {
    setFormData((prev) => ({ ...prev, stockName }));
    setSearchQuery(stockName);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || filteredStocks.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredStocks.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredStocks.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleStockSelect(filteredStocks[highlightedIndex].stockName);
    }
  };
  const handleExclusiveSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      exclusive: true, // Set exclusive to true
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      alert("Please select a future date.");
      return;
    }

    if (!isMarketOpen()) {
      toast.error("You cannot create a tip between 8:45 am to 5:00 pm");
      setFormData({
        stockName: "",
        date: "",
        description: "",
        predictedPrice: "",
        exclusive: false,
      });
      return;
    }
    const price = parseFloat(formData.predictedPrice);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid number for the predicted price.");
      return;
    }

    let stockname = {
      stock_name: formData.stockName,
    };

    console.log("Sending stock name:", stockname);

    let model_price;
    try {
      let response = await fetch("http://localhost:8080/proxy/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockname),
      });
      let ml_response = await response.json();
      model_price = parseFloat(ml_response.predicted_price).toFixed(2);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      return;
    }

    const tipData = {
      stock_name: formData.stockName,
      predicted_price: price,
      reason: formData.description,
      stock_score: model_price,
      prediction_date: formData.date,
      exclusive: formData.exclusive,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User is not authenticated.");
      return;
    }

    console.log("Submitting tip data:", tipData);

    try {
      const response = await fetch("http://localhost:8080/tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tipData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit tip.");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error submitting tip:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Tip</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Name
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleStockSearch}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search stock..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {showDropdown && filteredStocks.length > 0 && (
                <ul className="border border-gray-300 mt-1 max-h-40 overflow-auto bg-white rounded-md shadow-lg">
                  {filteredStocks.map((stock, index) => (
                    <li
                      key={stock.id}
                      onClick={() => handleStockSelect(stock.stockName)}
                      className={`px-3 py-2 cursor-pointer ${highlightedIndex === index
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      {stock.stockName}
                    </li>
                  ))}
                </ul>
              )}
              <input
                type="hidden"
                name="stockName"
                value={formData.stockName}
              />
            </div>

            {/* Future Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onClick={(e) => e.target.showPicker && e.target.showPicker()} // Open calendar on click
                required
                min={new Date().toISOString().split("T")[0]}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Predicted Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Predicted Price
              </label>
              <input
                type="number"
                step="0.01"
                name="predictedPrice"
                value={formData.predictedPrice}
                onChange={handleChange}
                onInput={(e) => {
                  if (!/^\d*\.?\d*$/.test(e.target.value)) {
                    e.target.value = e.target.value.slice(0, -1);
                  }
                }}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Create Tip
              </button>
            </div>
            {isMonetized && (
              <div className="mt-4">
                <button
                  type="submit"
                  onClick={() => setFormData((prev) => ({ ...prev, exclusive: true }))}
                  className="w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
                >
                  Create Exclusive Tips
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
