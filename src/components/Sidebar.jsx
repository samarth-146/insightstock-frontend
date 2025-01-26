export default function Sidebar() {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
        <ul className="space-y-2">
          {[1, 2, 3].map((i) => (
            <li key={i} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span>Contributor {i}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  