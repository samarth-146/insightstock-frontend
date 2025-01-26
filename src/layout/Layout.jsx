import React from "react";
import { Outlet } from "react-router-dom";
import "../globals.css";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar or Navbar */}
      <div className="w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-4 flex flex-col h-full">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">InsightStock</h1>
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
