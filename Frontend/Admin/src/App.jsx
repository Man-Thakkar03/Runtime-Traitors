import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Questions from "./pages/Questions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Notification from "./pages/Notification";
import AdminLayout from "./Components/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* All admin pages go inside AdminLayout */}
        <Route
          path="/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="questions" element={<Questions />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notification />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
