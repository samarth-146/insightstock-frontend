import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");
  const targetUserId = query.get("target_user_id");

  const [message, setMessage] = useState(
    "Processing your membership... Please wait."
  );
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(3); // Countdown timer state
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const handleJoinMembership = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/membership/register/${targetUserId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          setMessage("Successfully joined membership!");
        } else {
          setIsError(true);
          setMessage("Failed to join membership. Please try again.");
        }
      } catch (error) {
        setIsError(true);
        setMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Stop loading when the process is finished
      }
    };

    if (sessionId) {
      handleJoinMembership();
    }
  }, [sessionId, targetUserId]);

  useEffect(() => {
    if (!loading) {
      // Start the countdown after loading is finished
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        navigate(`/profile/${targetUserId}`);
      }, 3000);

      return () => {
        clearInterval(intervalId); // Cleanup timer interval
        clearTimeout(redirectTimer); // Cleanup redirect timeout
      };
    }
  }, [loading, navigate, targetUserId]);

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold text-green-600">Payment Successful!</h2>

      {loading ? (
        // Show loader while processing membership
        <div className="mt-4 flex justify-center items-center flex-col">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-2">{message}</p>
        </div>
      ) : (
        // Show message and timer after processing is complete
        <>
          <p className={isError ? "text-red-600" : "text-green-600"}>
            {message}
          </p>
          <p className="text-gray-500 mt-4">
            Redirecting in <span className="font-bold">{timer}</span> seconds...
          </p>
        </>
      )}
    </div>
  );
}
