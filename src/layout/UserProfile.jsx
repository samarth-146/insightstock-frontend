import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import TipsList from "../components/TipsList"

export default function UserProfile() {
  const { username } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [userTips, setUserTips] = useState([])

  useEffect(() => {
    // Fetch user profile data
    // This is a mock API call, replace with actual API call in production
    const fetchUserProfile = async () => {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUserProfile({
        username: username,
        name: `${username}'s Full Name`,
        bio: `This is ${username}'s bio. They are a passionate stock market enthusiast.`,
        followers: 1234,
        following: 567,
      })
      setIsFollowing(Math.random() < 0.5) // Randomly set following status
    }

    // Fetch user tips
    // This is a mock API call, replace with actual API call in production
    const fetchUserTips = async () => {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUserTips([
        {
          id: 1,
          userName: username,
          stockName: "AAPL",
          description: "Apple's new product launch could boost stock price",
          predictedPrice: 150.75,
          predictedModelPrice: 149.5,
          date: "2023-05-15",
        },
        {
          id: 2,
          userName: username,
          stockName: "GOOGL",
          description: "Google's AI advancements may lead to increased revenue",
          predictedPrice: 2800.5,
          predictedModelPrice: 2795.25,
          date: "2023-05-14",
        },
        {
          id: 3,
          userName: username,
          stockName: "TSLA",
          description: "Tesla's new factory opening might improve production rates",
          predictedPrice: 900.25,
          predictedModelPrice: 905.75,
          date: "2023-05-13",
        },
      ])
    }

    fetchUserProfile()
    fetchUserTips()
  }, [username])

  const handleFollowToggle = () => {
    // This is where you'd make an API call to follow/unfollow the user
    setIsFollowing(!isFollowing)
  }

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
          <button
            onClick={handleFollowToggle}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isFollowing ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
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

