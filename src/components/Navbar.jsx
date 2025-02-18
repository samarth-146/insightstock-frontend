import { Link, useNavigate } from "react-router-dom"

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Create Tip", href: "/create-tip" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Profile", href: "/profile" },
]


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <nav className="flex flex-col h-full">
      <ul className="space-y-4 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.href} className="block w-full">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded transition duration-200">
                {item.name}
              </button>
            </Link>
          </li>
        ))}
        <li>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-lg text-white bg-red-500 hover:bg-red-600 rounded transition duration-200">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

