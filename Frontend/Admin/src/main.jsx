import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import App from "./App";
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import AnswersPage from "./pages/AnswersPage";
import ModerationPage from "./pages/ModerationPage";
import { getAllUsers } from "./api";
import "./index.css";

function ProtectedRoute({ children }) {
  // TEMP: Auth check removed for demo/development
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <UsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <QuestionsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/answers"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AnswersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/moderation"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ModerationPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div className="text-white p-8">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
