import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const activePath = window.location.pathname;
  return (
    <div>
      <AdminSidebar activePath={activePath} />
      <main className="ml-64 min-h-screen bg-[#181A20] p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;