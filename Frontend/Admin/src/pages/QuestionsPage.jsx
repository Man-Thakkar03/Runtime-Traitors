import React, { useState } from "react";
import { FaCheck, FaTimes, FaSearch } from "react-icons/fa";

// Dummy data
const initialQuestions = [
  {
    id: 1,
    title: "How to use JWT in React?",
    user: "@user123",
    tags: ["React", "JWT"],
    postedOn: "2025-07-12",
    status: "Pending",
  },
  {
    id: 2,
    title: "Best way to manage state in Redux?",
    user: "@admin",
    tags: ["Redux", "State"],
    postedOn: "2025-07-10",
    status: "Approved",
  },
  {
    id: 3,
    title: "How to deploy a Node.js app?",
    user: "@user456",
    tags: ["Node.js", "Deployment"],
    postedOn: "2025-07-11",
    status: "Rejected",
  },
];

const statusOptions = ["All", "Pending", "Approved", "Rejected"];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const QuestionsPage = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filtering logic
  const filteredQuestions = questions.filter((q) => {
    const statusMatch = statusFilter === "All" || q.status === statusFilter;
    const searchMatch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const date = new Date(q.postedOn);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    const dateMatch =
      (!from || date >= from) && (!to || date <= to);
    return statusMatch && searchMatch && dateMatch;
  });

  // Actions
  const handleApprove = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "Approved" } : q
      )
    );
  };
  const handleReject = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "Rejected" } : q
      )
    );
  };
  const handleView = (q) => {
    alert(`View question: ${q.title}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Moderate Questions</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="text-gray-300 mr-2">Status:</label>
          <select
            className="bg-[#23263A] text-white rounded px-3 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-gray-300 mr-2">From:</label>
          <input
            type="date"
            className="bg-[#23263A] text-white rounded px-3 py-1"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-300 mr-2">To:</label>
          <input
            type="date"
            className="bg-[#23263A] text-white rounded px-3 py-1"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by title or tag"
            className="bg-[#23263A] text-white rounded px-3 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="ml-2 text-gray-400" />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-[#23263A] text-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Question Title</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Tags</th>
              <th className="px-4 py-3 text-center">Posted On</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No questions found.
                </td>
              </tr>
            ) : (
              filteredQuestions.map((q) => (
                <tr key={q.id} className="border-t border-[#181A20]">
                  <td className="px-4 py-3">{q.title}</td>
                  <td className="px-4 py-3">{q.user}</td>
                  <td className="px-4 py-3">
                    {q.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-800 text-blue-200 text-xs px-2 py-1 rounded mr-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-center">{formatDate(q.postedOn)}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        q.status === "Pending"
                          ? "bg-yellow-700 text-yellow-200"
                          : q.status === "Approved"
                          ? "bg-green-700 text-green-200"
                          : "bg-red-700 text-red-200"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex gap-2 justify-center">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                      disabled={q.status === "Approved"}
                      onClick={() => handleApprove(q.id)}
                      title="Approve"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      disabled={q.status === "Rejected"}
                      onClick={() => handleReject(q.id)}
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      onClick={() => handleView(q)}
                      title="View"
                    >
                      <FaSearch />
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

export default QuestionsPage;