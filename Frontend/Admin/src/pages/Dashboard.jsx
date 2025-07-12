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
  <div className="min-h-screen bg-[#181A20] p-6">
    <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#23263A] rounded-xl p-6 flex items-center gap-4 shadow hover:shadow-lg transition"
        >
          <div className="bg-[#181A20] p-3 rounded-full">{stat.icon}</div>
          <div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
            <div className={`text-xs font-semibold ${stat.color}`}>{stat.change}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="bg-[#23263A] rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <span>📈</span> Weekly Activity Chart
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#23263A" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip contentStyle={{ background: "#23263A", border: "none", color: "#fff" }} />
          <Line type="monotone" dataKey="activity" stroke="#8884d8" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Dashboard;