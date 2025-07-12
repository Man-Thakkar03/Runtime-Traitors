// Centralized API utility for Admin Frontend
const API_BASE = "http://localhost:8000/api/v1";

// Helper for fetch with error handling
async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    credentials: 'include', // Always send cookies
    ...options,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || res.statusText);
  }
  return res.status === 204 ? null : res.json();
}

// --- USERS ---
export const getAllUsers = () => apiFetch('/admin/users/');
export const getUser = (userId) => apiFetch(`/admin/users/${userId}`);
export const updateUser = (userId, data) => apiFetch(`/admin/users/${userId}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteUser = (userId) => apiFetch(`/admin/users/${userId}`, { method: 'DELETE' });

// --- QUESTIONS (Moderation) ---
export const getAllQuestions = (params = '') => apiFetch(`/admin/questions/${params}`);
export const moderateQuestion = (questionId, data) => apiFetch(`/admin/questions/${questionId}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteQuestion = (questionId) => apiFetch(`/admin/questions/${questionId}`, { method: 'DELETE' });

// --- ANSWERS (Moderation) ---
export const getAllAnswers = (params = '') => apiFetch(`/admin/answers/${params}`);
export const moderateAnswer = (answerId, data) => apiFetch(`/admin/answers/${answerId}`, { method: 'PATCH', body: JSON.stringify(data) });
export const deleteAnswer = (answerId) => apiFetch(`/admin/answers/${answerId}`, { method: 'DELETE' });

// --- AUTH (if needed for admin actions) ---
export const adminLogin = (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) });
export const adminLogout = () => apiFetch('/auth/logout', { method: 'POST' });
export const adminRegister = (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }); 