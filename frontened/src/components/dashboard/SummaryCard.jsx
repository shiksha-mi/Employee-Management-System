import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <div
        className={`${color} text-white flex items-center justify-center text-3xl px-6`}
      >
        {icon}
      </div>

      <div className="p-4">
        <p className="text-gray-500 font-semibold">{text}</p>
        <p className="text-3xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;