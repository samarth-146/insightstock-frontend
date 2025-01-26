import React from 'react';
import TipsList from '../components/TipsList';

export default function Profile() {
  const dummyProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate stock market analyst with 5 years of experience.",
    subscribersCount: 1200,
    isMonetized: true,
    membersCount: 50,
  };

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
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dummyProfile.name}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dummyProfile.email}</dd>
            </div>
            {dummyProfile.bio && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dummyProfile.bio}</dd>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Subscribers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {dummyProfile.subscribersCount}
                <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Subscribers
                </button>
              </dd>
            </div>
            {dummyProfile.subscribersCount >= 1000 && !dummyProfile.isMonetized && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Monetization</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Monetize Profile
                  </button>
                </dd>
              </div>
            )}
            {dummyProfile.isMonetized && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Members</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {dummyProfile.membersCount}
                  <button className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Members
                  </button>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900">My Tips</h2>
        </div>
        <div className="border-t border-gray-200">
          <TipsList tips={dummyUserTips} />
        </div>
      </div>
    </div>
  );
}
