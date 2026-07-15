import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold mt-4">
        Unauthorized Access
      </h2>

      <p className="text-gray-600 mt-2">
        You don't have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;