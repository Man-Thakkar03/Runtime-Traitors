import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaQuestionCircle,
  FaCommentDots,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaHome />, path: "/admin/dashboard" },
  { label: "Questions", icon: <FaQuestionCircle />, path: "/admin/questions" },
  { label: "Answers", icon: <FaCommentDots />, path: "/admin/answers" },
  { label: "Moderation", icon: <FaExclamationTriangle />, path: "/admin/moderation" },
];

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleMenuClick = () => {
    if (onClose && typeof onClose === "function") {
      onClose(); // close sidebar on mobile
    }
  };

  return (
    <aside className="fixed top-0 bottom-0 left-0 h-screen w-64 flex flex-col justify-between shadow-lg bg-[#1A1C23] z-50">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 flex-shrink-0 pt-8 lg:pt-6 relative">
          <div className="flex items-center gap-2 mt-12 lg:mt-0">
            <span className="bg-gradient-to-r from-purple-500 to-blue-400 rounded-lg p-2">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#7C3AED" />
                <path d="M8 16C12 10 20 22 24 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-white text-2xl font-bold tracking-wide">StackIt</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden absolute top-2 left-2 text-white hover:text-gray-300 transition p-2 rounded-lg hover:bg-[#23263A]"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 flex flex-col gap-1 flex-1" role="navigation" aria-label="Main navigation">
          {menu.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleMenuClick}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-2 text-base font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                  : "text-gray-300 hover:bg-[#23263A] hover:text-white"
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="mb-6 px-6 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1A1C23]"
        >
          <FaSignOutAlt className="flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
