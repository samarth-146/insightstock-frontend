import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TipsList from "../components/TipsList"

export default function UserProfile() {
  const { userId } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [userTips, setUserTips] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    // Fetch current user info
    const fetchCurrentUser = async () => {
      try {
        let userId1 = localStorage.getItem("userId")
        const response = await fetch(`http://localhost:8080/users/${userId1}`)
        const data = await response.json()
        setCurrentUser(data)
        // console.log("Current User:", data)
      } catch (error) {
        console.error("Error fetching current user:", error)
      }
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`)
        const data = await response.json()
        setUserProfile(data)
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    }

    const fetchUserTips = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tips/user/${userId}`)
        const data = await response.json()
        setUserTips(data)
      } catch (error) {
        console.error("Error fetching user tips:", error)
      }
    }

    fetchCurrentUser()
    fetchUserProfile()
    fetchUserTips()
  }, [userId])

  // Check subscription status
  useEffect(() => {
    if (userProfile && currentUser && userProfile.subscription) {
      setIsSubscribed(userProfile.subscription.subscribers.includes(currentUser.id))
    }
  }, [userProfile, currentUser])

  // Handle subscribe action
  const handleSubscribe = async () => {
    try {
      let requestBody = {
        subscriberId: currentUser.id,
        targetUserId: userProfile.id,
      }
      console.log("Request Body:", requestBody)
      await fetch(`http://localhost:8080/subscriptions/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(requestBody),
      })
      setIsSubscribed(true)
      window.location.reload()
    } catch (error) {
      console.error("Error subscribing:", error)
      window.location.reload()
    }
  }

  // Handle join membership action
  const handleJoin = () => {
    alert("Join Membership - Coming Soon!")
  }

  if (!userProfile) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.username}</dd>
            </div>
            {userProfile.bio && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.bio}</dd>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.email}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Followers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.subscription ? userProfile.subscription.subscribers.length : 0}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Subscribe Button */}
      {!isSubscribed && (
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Subscribe
        </button>
      )}

      {/* Join Button for Membership */}
      {userProfile.monetized && (
        <button
          onClick={handleJoin}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 ml-4"
        >
          Join
        </button>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900">User's Tips</h2>
        </div>
        <div className="border-t border-gray-200">
          <TipsList tips={userTips} flag={false} />
        </div>
      </div>
    </div>
  )
}
