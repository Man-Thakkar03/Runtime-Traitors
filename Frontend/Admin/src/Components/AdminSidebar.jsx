import React from "react";
import { FaHome, FaUser, FaQuestionCircle, FaCommentDots, FaArrowUp, FaExclamationTriangle, FaBan, FaCog, FaSignOutAlt } from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
  { label: "Users", icon: <FaUser />, path: "/admin/users" },
  { label: "Questions", icon: <FaQuestionCircle />, path: "/admin/questions" },
  { label: "Answers", icon: <FaCommentDots />, path: "/admin/answers" },
  { label: "Votes", icon: <FaArrowUp />, path: "/admin/votes" },
  { label: "Moderation", icon: <FaExclamationTriangle />, path: "/admin/moderation" },
  { label: "Banned", icon: <FaBan />, path: "/admin/banned" },
  { label: "Settings", icon: <FaCog />, path: "/admin/settings" },
];

const AdminSidebar = ({ activePath }) => (
  <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col justify-between shadow-lg bg-[#1A1C23] z-40">
    <div>
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg p-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#7C3AED" />
            <path d="M8 16C12 10 20 22 24 16" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
        <span className="text-white text-2xl font-bold tracking-wide">Ripple†</span>
      </div>
      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-1">
        {menu.map((item) => (
          <a
            key={item.label}
            href={item.path}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 text-base font-medium transition
              ${activePath === item.path
                ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow"
                : "text-gray-300 hover:bg-[#23263A] hover:text-white"}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
    <div className="mb-6 px-6">
      <button className="w-full flex items-center gap-2 justify-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition">
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  </aside>
);

export default AdminSidebar;