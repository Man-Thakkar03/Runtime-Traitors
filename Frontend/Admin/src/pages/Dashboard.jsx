import React from "react";
import { FaUsers, FaQuestionCircle, FaCommentDots, FaArrowUp, FaArrowDown, FaExclamationTriangle, FaBan } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  {
    label: "Total Users",
    value: 3842,
    icon: <FaUsers className="text-2xl text-blue-400" />,
    change: "+15.7%",
    color: "text-blue-400"
  },
  {
    label: "Total Questions",
    value: 1240,
    icon: <FaQuestionCircle className="text-2xl text-purple-400" />,
    change: "+8.2%",
    color: "text-purple-400"
  },
  {
    label: "Total Answers",
    value: 5678,
    icon: <FaCommentDots className="text-2xl text-green-400" />,
    change: "+12.4%",
    color: "text-green-400"
  },
  {
    label: "Votes Today",
    value: "↑ 320 / ↓ 45",
    icon: (
      <span className="flex gap-1">
        <FaArrowUp className="text-green-400" />
        <FaArrowDown className="text-red-400" />
      </span>
    ),
    change: "+2.1%",
    color: "text-yellow-400"
  },
  {
    label: "Pending Moderation",
    value: 12,
    icon: <FaExclamationTriangle className="text-2xl text-yellow-400" />,
    change: "-1.0%",
    color: "text-yellow-400"
  },
  {
    label: "Banned Users",
    value: 5,
    icon: <FaBan className="text-2xl text-red-400" />,
    change: "0%",
    color: "text-red-400"
  }
];

const data = [
  { name: "Mon", activity: 120 },
  { name: "Tue", activity: 210 },
  { name: "Wed", activity: 180 },
  { name: "Thu", activity: 250 },
  { name: "Fri", activity: 300 },
  { name: "Sat", activity: 200 },
  { name: "Sun", activity: 170 }
];

const Dashboard = () => (
  <div className="min-h-screen bg-[#181A20] p-4 lg:p-6">
    <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">Admin Dashboard</h1>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#23263A] rounded-xl p-4 lg:p-6 flex items-center gap-3 lg:gap-4 shadow hover:shadow-lg transition"
        >
          <div className="bg-[#181A20] p-2 lg:p-3 rounded-full flex-shrink-0">{stat.icon}</div>
          <div className="min-w-0 flex-1">
            <div className="text-lg lg:text-2xl font-bold text-white truncate">{stat.value}</div>
            <div className="text-xs lg:text-sm text-gray-400 truncate">{stat.label}</div>
            <div className={`text-xs font-semibold ${stat.color}`}>{stat.change}</div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Chart */}
    <div className="bg-[#23263A] rounded-xl p-4 lg:p-6 shadow">
      <h2 className="text-lg lg:text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <span>📈</span> Weekly Activity Chart
      </h2>
      <div className="w-full h-48 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#23263A" />
            <XAxis 
              dataKey="name" 
              stroke="#8884d8" 
              fontSize={12}
              tick={{ fill: '#8884d8' }}
            />
            <YAxis 
              stroke="#8884d8" 
              fontSize={12}
              tick={{ fill: '#8884d8' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#23263A", 
                border: "none", 
                color: "#fff",
                borderRadius: "8px",
                fontSize: "12px"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="activity" 
              stroke="#8884d8" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#8884d8" }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default Dashboard;