import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Exam Prep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/test"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Test
          </span>
        </Link>
        <Link
          to="/add"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Add Posts
          </span>
        </Link>
        <Link
          to="/add-all"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Add All Posts
          </span>
        </Link>
      </div>
    </div>
  );
}
