// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Corrected: Pages inside src/pages/
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Questions from "./pages/Questions";
import Answers from "./pages/Answers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PlatformNotification from "./pages/PlatformNotification";

// Admin layout still inside src/admin/components
import AdminLayout from "./admin/components/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/questions" element={<Questions />} />
          <Route path="/admin/answers" element={<Answers />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/notifications" element={<Notification />} />
        </Route>

        <Route path="*" element={<div className="text-white p-10 text-xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
