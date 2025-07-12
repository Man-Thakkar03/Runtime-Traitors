// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon: Icon, iconColor = "text-white" }) => {
  return (
    <div className="bg-[#1c1f2a] rounded-2xl p-5 shadow-md hover:shadow-lg transition-all border border-[#292c36]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="text-2xl font-semibold mt-1">{value}</h2>
        </div>
        {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
      </div>
    </div>
  );
};

export default StatCard;
