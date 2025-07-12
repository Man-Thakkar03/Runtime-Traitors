import React, { useEffect, useState } from "react";
import { FaBan, FaUndo, FaTrash } from "react-icons/fa";
import { getAllUsers, updateUser, deleteQuestion } from "../api";

const ModerationPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((res) => {
        const mapped = res.data.items.map((u) => ({
          id: u.id || u._id,
          username: u.username || u.first_name + ' ' + u.last_name,
          email: u.email,
          status: u.status || (u.is_active === false ? "Banned" : "Active"),
          questions: u.questions || [],
          ...u,
        }));
        setData(mapped);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleBan = async (userId, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === "Active" ? "Banned" : "Active";
      await updateUser(userId, { status: newStatus });
      setData((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (userId, questionId) => {
    try {
      setLoading(true);
      await deleteQuestion(questionId);
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
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Moderation Panel</h1>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : (
        <>
          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4">
            {data.length === 0 ? (
              <div className="text-center py-6 text-gray-400">No users found.</div>
            ) : (
              data.map((user) => (
                <div key={user.id} className="bg-[#23263A] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white">{user.username}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ml-2 flex-shrink-0 ${
                        user.status === "Active"
                          ? "bg-green-700 text-green-200"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Questions:</div>
                    {user.questions && user.questions.length === 0 ? (
                      <span className="text-gray-400 text-sm">No questions</span>
                    ) : (
                      <div className="space-y-2">
                        {user.questions && user.questions.map((q) => (
                          <div key={q.id} className="flex items-center justify-between bg-[#181A20] p-2 rounded">
                            <span className="text-sm text-gray-300 truncate">{q.title}</span>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs ml-2 flex-shrink-0"
                              onClick={() => handleDeleteQuestion(user.id, q.id)}
                              title="Delete Question"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <button
                      className={
                        user.status === "Active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                        + " text-white px-4 py-2 rounded font-semibold flex items-center gap-2 justify-center w-full"
                      }
                      onClick={() => handleToggleBan(user.id, user.status)}
                      title={user.status === "Active" ? "Ban User" : "Unban User"}
                    >
                      {user.status === "Active" ? (
                        <>
                          <FaBan /> Ban User
                        </>
                      ) : (
                        <>
                          <FaUndo /> Unban User
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto rounded-lg shadow">
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
                        {user.questions && user.questions.length === 0 ? (
                          <span className="text-gray-400 text-sm">No questions</span>
                        ) : (
                          <ul className="list-disc list-inside space-y-1">
                            {user.questions && user.questions.map((q) => (
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
                          className={
                            user.status === "Active"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                            + " text-white px-3 py-1 rounded font-semibold flex items-center gap-1 justify-center"
                          }
                          onClick={() => handleToggleBan(user.id, user.status)}
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
        </>
      )}
    </div>
  );
};

export default ModerationPage;