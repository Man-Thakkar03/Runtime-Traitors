import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Users, MessageSquare, FileText, Bell, Settings 
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
  { label: "Users", icon: <Users size={18} />, path: "/admin/users" },
  { label: "Questions", icon: <MessageSquare size={18} />, path: "/admin/questions" },
  { label: "Answers", icon: <FileText size={18} />, path: "/admin/answers" },
  { label: "Notifications", icon: <Bell size={18} />, path: "/admin/notifications" },
  { label: "Reports", icon: <FileText size={18} />, path: "/admin/reports" },
  { label: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-[#101010] border-r border-[#1f1f1f] h-full p-6">
      <div className="text-2xl font-bold text-white mb-8 tracking-wide">
        <span className="text-purple-500">StackIt</span> Admin
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${isActive
                ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
