import React from "react";
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import AnswersPage from "./pages/AnswersPage";
import ModerationPage from "./pages/ModerationPage";

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
      {/* The actual routes are now defined in main.jsx */}
      {/* This component just renders the layout and children as needed */}
    </div>
  );
};

export default App;