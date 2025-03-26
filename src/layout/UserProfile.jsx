import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TipsList from "../components/TipsList";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

export default function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userTips, setUserTips] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    // Fetch current user info
    const fetchCurrentUser = async () => {
      try {
        let userId1 = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:8080/users/${userId1}`);
        const data = await response.json();
        setCurrentUser(data);
        console.log("Current user:", data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchUserTips = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${userId}/tips`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setUserTips(data);
      } catch (error) {
        console.error("Error fetching user tips:", error);
      }
    };

    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users/subscriptions",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setIsSubscribed(
          data.subscriptions.some((sub) => sub.user_id === userId)
        );
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchCurrentUser();
    fetchUserProfile();
    fetchSubscriptions();
    fetchUserTips();
  }, [userId]);

  // Check subscription status
  useEffect(() => {
    if (userProfile && currentUser && currentUser.subscriptions) {
      setIsSubscribed(
        currentUser.subscriptions.some(
          (subscription) => subscription.user_id === userProfile.id
        )
      );
    }
    if (userProfile && currentUser && currentUser.memberships) {
      setIsMember(
        currentUser.memberships.some(
          (membership) => membership.user.user_id === userProfile.id
        )
      );
    }
  }, [userProfile, currentUser]);

  // Handle subscribe action
  const handleSubscribe = async () => {
    try {
      await fetch(`http://localhost:8080/users/subscribe/${userProfile.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await fetch(`http://localhost:8080/users/unsubscribe/${userProfile.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsSubscribed(false);
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51R6njpRG0L0EXLHw3ouxNLWsqjyy6VtvISnrPsHBijdVTmX2nqoDamPQwEz64pJDIBegXFEZzzVVzGqlGHIo2zb400FBJMje8w"
  );

  async function handlePayment(targetUserId) {
    try {
      const response = await fetch(`http://localhost:8080/membership/create-checkout-session/${userId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
  
      // Redirect to Stripe Checkout with sessionId and targetUserId as query params
      await stripe.redirectToCheckout({ sessionId });
  
      // Attach targetUserId in the redirect URL
      window.location.href = `/success?session_id=${sessionId}&target_user_id=${targetUserId}`;
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  // Handle join membership action
  const handleJoin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/membership/register/${userProfile.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("Successfully joined membership!");
        setIsSubscribed(true);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Error joining membership:", errorData);
        alert("Failed to join membership. Please try again.");
      }
    } catch (error) {
      console.error("Error joining membership:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!userProfile) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.username}
              </dd>
            </div>
            {userProfile.bio && (
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userProfile.bio}
                </dd>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.email}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Subscribers</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.subscribersCount}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Subscribe Button */}
      {isSubscribed ? (
        <button
          onClick={handleUnsubscribe}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Subscribe
        </button>
      )}

      {/* Join Button for Membership */}
      {userProfile.monetized && !isMember && (
        <button
          onClick={handlePayment}
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
  );
}
