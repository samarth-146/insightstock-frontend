import React, { useState } from "react"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authContext";
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let data = {
        email: email,
        password: password,
      };
      const response = await axios.post('http://localhost:8080/users/login', data);
      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      setCurrentUser(userId);
      setEmail("");
      setPassword("");
      toast.success("Logged in successfully", { position: "top-right" });
      navigate('/home');
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status == 401) {
          toast.error("Invalid Username or Password", { position: "top-right" })
        }
        else if (status == 404) {
          toast.error("User doesn't exist", { position: "top-right" })
        }
        else if (status == 500) {
          toast.error("Internal Server Error", { position: "top-right" })
        }
      } else {
        console.log("Network Error");
      }
    }
  };

  return (
    <div>
      <Header isSignIn={true} />
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-6 text-center font-bold text-gray-800">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

