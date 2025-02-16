// import React, { useState, useEffect } from "react"
// import TipsList from "../components/TipsList"
// import EditProfile from "../layout/EditProfile"

// export default function Profile() {
//   const [profile, setProfile] = useState(null)
//   const [userTips, setUserTips] = useState([])
//   const [isEditing, setIsEditing] = useState(false)

//   useEffect(() => {
//     fetchProfile()
//     fetchUserTips()
//   }, [])

//   const fetchProfile = async () => {
//     // Simulating API call
//     const dummyProfile = {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       bio: "Passionate stock market analyst with 5 years of experience.",
//       subscribersCount: 1000,
//       isMonetized: false,
//       membersCount: 50,
//       membershipPrice: 59,
//     }
//     setProfile(dummyProfile)
//   }

//   const fetchUserTips = async () => {
//     // Simulating API call
//     const dummyUserTips = [
//       {
//         id: 1,
//         userName: "John Doe",
//         stockName: "AAPL",
//         description: "Apple's new product launch could boost stock price",
//         predictedPrice: 150.75,
//         predictedModelPrice: 149.5,
//         date: "2023-05-15",
//       },
//       {
//         id: 2,
//         userName: "John Doe",
//         stockName: "GOOGL",
//         description: "Google's AI advancements may lead to increased revenue",
//         predictedPrice: 2800.5,
//         predictedModelPrice: 2795.25,
//         date: "2023-05-14",
//       },
//       {
//         id: 3,
//         userName: "John Doe",
//         stockName: "TSLA",
//         description: "Tesla's new factory opening might improve production rates",
//         predictedPrice: 900.25,
//         predictedModelPrice: 905.75,
//         date: "2023-05-13",
//       },
//     ]
//     setUserTips(dummyUserTips)
//   }

//   const handleProfileUpdate = (updatedProfile) => {
//     setProfile(updatedProfile)
//     setIsEditing(false)
//     // Here you would typically make an API call to update the profile
//     console.log("Profile updated:", updatedProfile)
//   }

//   if (!profile) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {isEditing ? (
//         <EditProfile profile={profile} onSave={handleProfileUpdate} onCancel={() => setIsEditing(false)} />
//       ) : (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
//           <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Edit Profile
//             </button>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
//             <dl className="sm:divide-y sm:divide-gray-200">
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Name</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.name}</dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Email</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.email}</dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Bio</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.bio}</dd>
//               </div>
//               <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Subscribers</dt>
//                 <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                   {profile.subscribersCount}
//                   <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                     View Subscribers
//                   </button>
//                 </dd>
//               </div>
//               {profile.isMonetized && (
//                 <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Members</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {profile.membersCount}
//                     <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                       View Members
//                     </button>
//                   </dd>
//                 </div>
//               )}
//               {profile.isMonetized && (
//                 <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                   <dt className="text-sm font-medium text-gray-500">Membership Price</dt>
//                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                     {profile.membershipPrice.toFixed(2)} {"\u20B9"} / month
//                   </dd>
//                 </div>
//               )}
//             </dl>
//           </div>
//         </div>
//       )}

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6">
//           <h2 className="text-xl font-bold text-gray-900">My Tips</h2>
//         </div>
//         <div className="border-t border-gray-200">
//           <TipsList tips={userTips} />
//         </div>
//       </div>
//     </div>
//   )
// }

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
    // Simulating API call
    const dummyProfile = {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Passionate stock market analyst with 5 years of experience.",
      subscribersCount: 1000,
      isMonetized: true,
      membersCount: 0,
      membershipPrice: 0,
    }
    setProfile(dummyProfile)
  }

  const fetchUserTips = async () => {
    // Simulating API call
    const dummyUserTips = [
      {
        id: 1,
        userName: "John Doe",
        stockName: "AAPL",
        description: "Apple's new product launch could boost stock price",
        predictedPrice: 150.75,
        predictedModelPrice: 149.5,
        date: "2023-05-15",
      },
      {
        id: 2,
        userName: "John Doe",
        stockName: "GOOGL",
        description: "Google's AI advancements may lead to increased revenue",
        predictedPrice: 2800.5,
        predictedModelPrice: 2795.25,
        date: "2023-05-14",
      },
      {
        id: 3,
        userName: "John Doe",
        stockName: "TSLA",
        description: "Tesla's new factory opening might improve production rates",
        predictedPrice: 900.25,
        predictedModelPrice: 905.75,
        date: "2023-05-13",
      },
    ]
    setUserTips(dummyUserTips)
  }

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile)
    setIsEditing(false)
    // Here you would typically make an API call to update the profile
    console.log("Profile updated:", updatedProfile)
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
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{profile.name}</dd>
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
                  <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Subscribers
                  </button>
                </dd>
              </div>
              {profile.subscribersCount >= 1000 && !profile.isMonetized && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Monetization</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <button
                      onClick={() => {
                        // Here you would typically make an API call to enable monetization
                        console.log("Monetize profile")
                        setProfile({ ...profile, isMonetized: true })
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Monetize Profile
                    </button>
                  </dd>
                </div>
              )}
              {profile.isMonetized && (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Members</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.membersCount}
                    <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Members
                    </button>
                  </dd>
                </div>
              )}
              {profile.isMonetized && (
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
          <TipsList tips={userTips} />
        </div>
      </div>
    </div>
  )
}

