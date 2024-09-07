import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Exam Prep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/idioms"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Idioms and Phrases
          </span>
        </Link>
        <Link
          to="/one-word"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            One Word
          </span>
        </Link>
        <Link
          to="/vocab"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Vocab
          </span>
        </Link>
        <Link
          to="/current"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Current
          </span>
        </Link>
        <Link
          to="/display-all"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Display All
          </span>
        </Link>
        <Link
          to="/test"
          className="group bg-gray-800 p-6 rounded-lg shadow-lg flex justify-center items-center transition-transform transform hover:scale-105"
        >
          <span className="text-xl font-semibold text-gray-100 group-hover:text-blue-400">
            Test
          </span>
        </Link>
      </div>
    </div>
  );
}
