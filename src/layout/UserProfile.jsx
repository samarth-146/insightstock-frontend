import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TipsList from "../components/TipsList"

export default function UserProfile() {
  const { userId } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  // const [isFollowing, setIsFollowing] = useState(false)
  const [userTips, setUserTips] = useState([])

  useEffect(() => {
    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`)
        const data = await response.json()
        console.log(data);
        setUserProfile(data)
        // setIsFollowing(Math.random() < 0.5) // Randomly set following status (replace with real logic)
      } catch (error) {
        console.error("Error fetching user profile:", error)
      }
    }

    // Fetch user tips
    const fetchUserTips = async () => {
      try {
        const response = await fetch(`http://localhost:8080/tips/user/${userId}`)
        const data = await response.json()
        setUserTips(data)
      } catch (error) {
        console.error("Error fetching user tips:", error)
      }
    }

    fetchUserProfile()
    fetchUserTips()
  }, [userId])

  // const handleFollowToggle = async () => {
  //   try {
  //     // Call API to follow/unfollow the user (replace with real API)
  //     const response = await fetch(`http://localhost:8080/users/${username}/follow`, {
  //       method: isFollowing ? "DELETE" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     if (response.ok) {
  //       setIsFollowing(!isFollowing)
  //     }
  //   } catch (error) {
  //     console.error("Error toggling follow:", error)
  //   }
  // }

  if (!userProfile) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
            <p className="text-sm text-gray-500">@{userProfile.username}</p>
          </div>
          {/* <button
            onClick={handleFollowToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isFollowing ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button> */}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.bio}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Followers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.followers}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Following</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userProfile.following}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900">User's Tips</h2>
        </div>
        <div className="border-t border-gray-200">
          <TipsList tips={userTips} />
        </div>
      </div>
    </div>
  )
}
