import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Create Tip", href: "/create-tip" },
  { name: "Subscriptions", href: "/subscriptions" },
  { name: "Memberships", href: "/memberships" }, // New Membership Button
  { name: "Profile", href: "/profile" },
]

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false)
  const [showMembershipPopup, setShowMembershipPopup] = useState(false)
  const [subscribers, setSubscribers] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    if (showPopup) fetchSubscribers()
  }, [showPopup])

  useEffect(() => {
    if (showMembershipPopup) fetchMembers()
  }, [showMembershipPopup])

  // Fetch Subscribers List
  const fetchSubscribers = async () => {
    setLoading(true)
    setError(null)
    setSubscribers([])
    let userId = localStorage.getItem("userId")
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/subscriptions`)
      if (!response.ok) throw new Error("Failed to fetch subscribers")
      const ids = await response.json()
      fetchUserDetails(ids, setSubscribers)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Fetch Membership List
  const fetchMembers = async () => {
    setLoading(true)
    setError(null)
    setMembers([])
    let userId = localStorage.getItem("userId")
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/memberships`)
      if (!response.ok) throw new Error("Failed to fetch memberships")
      const ids = await response.json()
      fetchUserDetails(ids, setMembers)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  // Fetch user details from IDs
  const fetchUserDetails = async (ids, setUsers) => {
    try {
      const detailsPromises = ids.map(async (id) => {
        const res = await fetch(`http://localhost:8080/users/${id}`)
        if (!res.ok) throw new Error(`Failed to fetch user ${id}`)
        return res.json()
      })
      const details = await Promise.all(detailsPromises)
      setUsers(details)
    } catch (err) {
      setError("Failed to load user details")
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionClick = () => setShowPopup(true)
  const handleMembershipClick = () => setShowMembershipPopup(true)
  const handleUserClick = (id) => {
    navigate(`/profile/${id}`)
    setShowPopup(false)
    setShowMembershipPopup(false)
  }

  return (
    <nav className="flex flex-col h-full">
      <ul className="space-y-4 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            {item.name === "Subscriptions" ? (
              <button
                onClick={handleSubscriptionClick}
                className="w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded transition duration-200"
              >
                {item.name}
              </button>
            ) : item.name === "Memberships" ? (
              <button
                onClick={handleMembershipClick}
                className="w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded transition duration-200"
              >
                {item.name}
              </button>
            ) : (
              <Link to={item.href} className="block w-full">
                <button className="w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded transition duration-200">
                  {item.name}
                </button>
              </Link>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-lg text-white bg-red-500 hover:bg-red-600 rounded transition duration-200"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Subscriptions Popup */}
      {showPopup && (
        <Popup
          title="Subscribers"
          users={subscribers}
          loading={loading}
          error={error}
          onClose={() => setShowPopup(false)}
          onUserClick={handleUserClick}
        />
      )}

      {/* Memberships Popup */}
      {showMembershipPopup && (
        <Popup
          title="Memberships"
          users={members}
          loading={loading}
          error={error}
          onClose={() => setShowMembershipPopup(false)}
          onUserClick={handleUserClick}
        />
      )}
    </nav>
  )
}

// Reusable Popup Component
function Popup({ title, users, loading, error, onClose, onUserClick }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">{title}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="space-y-2">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => onUserClick(user.id)}
                    className="w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded transition duration-200"
                  >
                    {user.username}
                  </button>
                </li>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}
