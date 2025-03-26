import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cancel() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const targetUserId = query.get("target_user_id");

  const [timer, setTimer] = useState(3);

  useEffect(() => {
    // Start countdown and redirection immediately
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate(`/profile/${targetUserId}`);
    }, 3000); // Redirect after 3 seconds

    return () => {
      clearInterval(intervalId);
      clearTimeout(redirectTimer);
    };
  }, [navigate, targetUserId]);

  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-bold text-red-600">Payment Canceled!</h2>
      <p className="text-gray-500 mt-4">
        Redirecting back to profile in <span className="font-bold">{timer}</span> seconds...
      </p>
    </div>
  );
}
