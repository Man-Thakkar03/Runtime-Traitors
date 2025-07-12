import React, { useEffect, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { getAllAnswers, moderateAnswer, deleteAnswer } from "../api";

const statusOptions = ["All", "Pending", "Approved", "Rejected"];

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

const AnswersPage = () => {
  const [answers, setAnswers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllAnswers()
      .then((res) => {
        const mapped = res.data.items.map((a) => ({
          id: a._id,
          snippet: a.content,
          questionTitle: a.question_id, // You can fetch the title if needed
          user: a.author_name,
          postedOn: a.created_at,
          status: a.status || (a.is_accepted ? "Approved" : "Pending"),
          ...a,
        }));
        setAnswers(mapped);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredAnswers = answers.filter((a) => {
    const statusMatch = statusFilter === "All" || a.status === statusFilter;
    const searchMatch =
      a.snippet.toLowerCase().includes(search.toLowerCase()) ||
      a.questionTitle.toLowerCase().includes(search.toLowerCase());
    const date = new Date(a.postedOn);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    const dateMatch =
      (!from || date >= from) && (!to || date <= to);
    return statusMatch && searchMatch && dateMatch;
  });

  const handleApprove = async (id) => {
    try {
      setLoading(true);
      await moderateAnswer(id, { status: "Approved" });
      setAnswers((prev) => prev.map((a) => a.id === id ? { ...a, status: "Approved" } : a));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async (id) => {
    try {
      setLoading(true);
      await moderateAnswer(id, { status: "Rejected" });
      setAnswers((prev) => prev.map((a) => a.id === id ? { ...a, status: "Rejected" } : a));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteAnswer(id);
      setAnswers((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleView = (a) => {
    alert(`View answer: ${a.snippet}\n\nQuestion: ${a.questionTitle}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Moderate Answers</h1>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : (
        <>
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
                placeholder="Search by answer or question"
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
                  <th className="px-4 py-3 text-left">Answer Snippet</th>
                  <th className="px-4 py-3 text-left">Question Title</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-center">Posted On</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnswers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400">
                      No answers found.
                    </td>
                  </tr>
                ) : (
                  filteredAnswers.map((a) => (
                    <tr key={a.id} className="border-t border-[#181A20]">
                      <td className="px-4 py-3 max-w-xs truncate" title={a.snippet}>{a.snippet}</td>
                      <td className="px-4 py-3">{a.questionTitle}</td>
                      <td className="px-4 py-3">{a.user}</td>
                      <td className="px-4 py-3 text-center">{formatDate(a.postedOn)}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            a.status === "Pending"
                              ? "bg-yellow-700 text-yellow-200"
                              : a.status === "Approved"
                              ? "bg-green-700 text-green-200"
                              : "bg-red-700 text-red-200"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center flex gap-2 justify-center">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                          onClick={() => handleView(a)}
                          title="View"
                        >
                          <FaSearch />
                        </button>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                          disabled={a.status === "Approved"}
                          onClick={() => handleApprove(a.id)}
                          title="Approve"
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                          disabled={a.status === "Rejected"}
                          onClick={() => handleReject(a.id)}
                          title="Reject"
                        >
                          Reject
                        </button>
                        <button
                          className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(a.id)}
                          title="Delete"
                        >
                          <FaTrash />
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

export default AnswersPage;