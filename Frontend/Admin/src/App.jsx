import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./pages/Dashboard";
// Import other admin pages as needed
// import UsersPage from "./pages/UsersPage";
// import QuestionsPage from "./pages/QuestionsPage";
// etc.

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        {/* Example: Add more admin routes here */}
        {/* 
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <AdminLayout>
              <QuestionsPage />
            </AdminLayout>
          }
        />
        */}

        {/* 404 fallback */}
        <Route path="*" element={<div className="text-white p-8">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;