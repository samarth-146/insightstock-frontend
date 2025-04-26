export default function TopStocksWidget({ stocks }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-3 bg-gray-50">
        <h2 className="text-xl font-semibold">Previous Day Closing Price</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  ₹{stock.lastClosedPrice.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

