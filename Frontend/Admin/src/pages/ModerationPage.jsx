import React, { useState } from "react";
import { FaBan, FaUndo, FaTrash } from "react-icons/fa";

// Dummy data for users and their questions
const initialModerationData = [
  {
    id: 1,
    username: "@meetpatel",
    email: "meet@xyz.com",
    status: "Active",
    questions: [
      { id: 101, title: "How to use JWT in React?" },
      { id: 102, title: "What is useEffect hook?" },
    ],
  },
  {
    id: 2,
    username: "@banneduser",
    email: "banned@xyz.com",
    status: "Banned",
    questions: [
      { id: 103, title: "How to deploy a Node.js app?" },
    ],
  },
  {
    id: 3,
    username: "@admin",
    email: "admin@xyz.com",
    status: "Active",
    questions: [],
  },
];

const ModerationPage = () => {
  const [data, setData] = useState(initialModerationData);

  // Ban or unban user
  const handleToggleBan = (userId) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Banned" : "Active",
            }
          : user
      )
    );
  };

  // Delete a question
  const handleDeleteQuestion = (userId, questionId) => {
    setData((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              questions: user.questions.filter((q) => q.id !== questionId),
            }
          : user
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Moderation Panel</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-[#23263A] text-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-left">Questions</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              data.map((user) => (
                <tr key={user.id} className="border-t border-[#181A20] align-top">
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-700 text-green-200"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.questions.length === 0 ? (
                      <span className="text-gray-400 text-sm">No questions</span>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {user.questions.map((q) => (
                          <li key={q.id} className="flex items-center justify-between">
                            <span>{q.title}</span>
                            <button
                              className="ml-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs"
                              onClick={() => handleDeleteQuestion(user.id, q.id)}
                              title="Delete Question"
                            >
                              <FaTrash />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className={`${
                        user.status === "Active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white px-3 py-1 rounded font-semibold flex items-center gap-1 justify-center`}
                      onClick={() => handleToggleBan(user.id)}
                      title={user.status === "Active" ? "Ban User" : "Unban User"}
                    >
                      {user.status === "Active" ? (
                        <>
                          <FaBan /> Ban
                        </>
                      ) : (
                        <>
                          <FaUndo /> Unban
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModerationPage;