import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./layout/Landing";
import Signup from "./layout/Signup";
import Login from "./layout/Login";
import Home from "./layout/Home";
import CreateTip from "./layout/Create-tips";
import Subscriptions from "./layout/Subscriptions";
import Profile from "./layout/Profile";
import Layout from "./layout/Layout";
import UserProfile from "./layout/UserProfile";


function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       {/* Public Routes */}
  //       <Route path="/" element={<Landing />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/login" element={<Login />} />

  //       {/* Protected Routes with Layout */}
  //       <Route element={<Layout />}>
  //         <Route path="/home" element={<Home />} />
  //         <Route path="/create-tip" element={<CreateTip />} />
  //         <Route path="/subscriptions" element={<Subscriptions />} />
  //         <Route path="/profile" element={<Profile />} />
  //         <Route path="/user/:username" element={<UserProfile />} />
  //       </Route>
  //     </Routes>
  //   </Router>
  // );
}

export default App;
