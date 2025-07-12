import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import AnswersPage from "./pages/AnswersPage";
import ModerationPage from "./pages/ModerationPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
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

        {/* User Management */}
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <UsersPage />
            </AdminLayout>
          }
        />

        {/* Questions Moderation */}
        <Route
          path="/admin/questions"
          element={
            <AdminLayout>
              <QuestionsPage />
            </AdminLayout>
          }
        />

        {/* Answers Moderation */}
        <Route
          path="/admin/answers"
          element={
            <AdminLayout>
              <AnswersPage />
            </AdminLayout>
          }
        />

        {/* Moderation */}
        <Route
          path="/admin/moderation"
          element={
            <AdminLayout>
              <ModerationPage />
            </AdminLayout>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div className="text-white p-8">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;