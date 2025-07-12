import { Link, useLocation } from "react-router-dom";
import { FaHome, FaCog, FaBell, FaUsers, FaQuestion } from "react-icons/fa";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, to: "/dashboard" },
    { label: "Users", icon: <FaUsers />, to: "/users" },
    { label: "Questions", icon: <FaQuestion />, to: "/questions" },
    { label: "Notifications", icon: <FaBell />, to: "/notifications" },
    { label: "Settings", icon: <FaCog />, to: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0f0f1a] text-white px-4 py-6 flex flex-col justify-between font-rajdhani border-r border-[#1a1a2c]">
      <div>
        <h1 className="text-3xl font-bold text-purple-500 mb-10">Runtime</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-[#1c1c2e] ${
                location.pathname === item.to ? "bg-[#1c1c2e] text-purple-400" : "text-gray-300"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-md font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-4">
        <Link
          to="/profile"
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
