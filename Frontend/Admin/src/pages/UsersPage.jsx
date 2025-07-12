import React, { useEffect, useState } from "react";
import { FaBan, FaSearch } from "react-icons/fa";
import { getAllUsers, updateUser, deleteUser } from "../api";

const roles = ["All", "User", "Admin"];
const statuses = ["All", "Active", "Banned"];

const UsersPage = () => {
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((res) => setUsers(res.data.items))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter === "All" || user.role === roleFilter;
    const statusMatch = statusFilter === "All" || user.status === statusFilter;
    return roleMatch && statusMatch;
  });

  const handleBan = async (userId) => {
    try {
      setLoading(true);
      await updateUser(userId, { status: "Banned" });
      setUsers((prev) => prev.map((user) => user.id === userId ? { ...user, status: "Banned" } : user));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (userId) => {
    alert(`View profile for user ID: ${userId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">User Management</h1>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <label className="text-gray-300 mr-2">Role:</label>
              <select
                className="bg-[#23263A] text-white rounded px-3 py-1"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-300 mr-2">Status:</label>
              <select
                className="bg-[#23263A] text-white rounded px-3 py-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-[#23263A] text-white">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-center">Questions</th>
                  <th className="px-4 py-3 text-center">Answers</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-[#181A20]">
                      <td className="px-4 py-3">{user.username}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">{user.role}</td>
                      <td className="px-4 py-3 text-center">{user.questions}</td>
                      <td className="px-4 py-3 text-center">{user.answers}</td>
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
                      <td className="px-4 py-3 text-center flex gap-2 justify-center">
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                          disabled={user.status === "Banned"}
                          onClick={() => handleBan(user.id)}
                          title="Ban"
                        >
                          <FaBan />
                        </button>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                          onClick={() => handleViewProfile(user.id)}
                          title="View Profile"
                        >
                          <FaSearch />
                        </button>
                        <button
                          className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(user.id)}
                          title="Delete User"
                        >
                          <span>Delete</span>
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

export default UsersPage;