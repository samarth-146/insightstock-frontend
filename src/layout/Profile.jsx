import React, { useState, useEffect } from "react"
import TipsList from "../components/TipsList"
import EditProfile from "../layout/EditProfile"

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [userTips, setUserTips] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProfile()
    fetchUserTips()
  }, [])

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const response = await fetch(`http://localhost:8080/users/${userId}`) // replace {userId} with the actual user ID
      const data = await response.json()
      setProfile({
        username: data.username,
        email: data.email,
        bio: data.bio || "No bio provided",
        subscribersCount: data.subscribersCount,
        monetized: data.monetized,
        membersCount: data.membersCount,
        membershipPrice: data.membershipPrice,
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const fetchUserTips = async () => {
    try {
      let userId = localStorage.getItem("userId")
      const response = await fetch(`http://localhost:8080/tips/user/${userId}`) // replace with your tips API endpoint
      const data = await response.json()
      // console.log("Fetched tips:", data);
      setUserTips(data || [])
    } catch (error) {
      console.error("Error fetching user tips:", error)
    }
  }

  const handleProfileUpdate = (updatedProfile) => {
    console.log("Profile updated:", updatedProfile)
    setIsEditing(false)
    
    let userId = localStorage.getItem("userId")
    
    const requestBody = {}
    if (updatedProfile.username) requestBody.username = updatedProfile.username
    if (updatedProfile.bio) requestBody.bio = updatedProfile.bio
    if (profile.subscribersCount>=1000 && updatedProfile.monetized != undefined) {
      requestBody.monetized = updatedProfile.monetized
      if (updatedProfile.monetized) {
        if (updatedProfile.membershipPrice) requestBody.membershipPrice = updatedProfile.membershipPrice
      }
    }
    console.log("Request body:", requestBody)
    fetch(`http://localhost:8080/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then((data) => {
      console.log("API Success:", data)
      fetchProfile()
      setProfile(updatedProfile)
      })
      .catch((error) => {
        console.error("API Error:", error)
        fetchProfile()
      })
  }
  

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <EditProfile profile={profile} onSave={handleProfileUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.username}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.bio}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Subscribers</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {profile.subscribersCount}
                </dd>
              </div>
              {profile.subscribersCount >= 1000 && !profile.monetized && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Monetization</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Monetize Profile
                    </button>
                  </dd>
                </div>
              )}
              {profile.monetized && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Members</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.membersCount}
                  </dd>
                </div>
              )}
              {profile.monetized && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Membership Price</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ${profile.membershipPrice.toFixed(2)} / month
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900">My Tips</h2>
        </div>
        <div className="border-t border-gray-200">
          <TipsList tips={userTips} flag={false} />
        </div>
      </div>
    </div>
  )
}
