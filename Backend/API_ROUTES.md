# Runtime-Traitors Backend API Reference

This document lists all available API routes for the backend, grouped by resource.

---

## Authentication

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| POST   | /api/v1/auth/login    | Login and get access/refresh token |
| POST   | /api/v1/auth/register | Register a new user                |
| POST   | /api/v1/auth/logout   | Logout (invalidate token)          |

---

## Users

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| GET    | /api/v1/users/me     | Get current user profile           |
| PUT    | /api/v1/users/me     | Update current user profile        |
| DELETE | /api/v1/users/me     | Delete current user                |

---

## Admin (User Management)

| Method | Endpoint                        | Description                       |
|--------|----------------------------------|-----------------------------------|
| GET    | /api/v1/admin/users/             | List all users (admin only)        |
| GET    | /api/v1/admin/users/{user_id}    | Get a specific user (admin only)   |
| PATCH  | /api/v1/admin/users/{user_id}    | Update a user (admin only)         |
| DELETE | /api/v1/admin/users/{user_id}    | Delete a user (admin only)         |

---

## Admin (Question Moderation)

| Method | Endpoint                                 | Description                                 |
|--------|-------------------------------------------|---------------------------------------------|
| GET    | /api/v1/admin/questions/                  | List all questions (filter by status)        |
| PATCH  | /api/v1/admin/questions/{question_id}     | Moderate question (approve/reject/flag)     |
| DELETE | /api/v1/admin/questions/{question_id}     | Delete question (admin only)                |

---

## Admin (Answer Moderation)

| Method | Endpoint                                 | Description                                 |
|--------|-------------------------------------------|---------------------------------------------|
| GET    | /api/v1/admin/answers/                    | List all answers (filter by status)         |
| PATCH  | /api/v1/admin/answers/{answer_id}         | Moderate answer (approve/reject/flag)       |
| DELETE | /api/v1/admin/answers/{answer_id}         | Delete answer (admin only)                  |

---

## Questions

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /api/v1/questions/               | List all questions (with filters)           |
| POST   | /api/v1/questions/               | Create a new question                       |
| GET    | /api/v1/questions/{question_id}  | Get a specific question and its answers     |
| PUT    | /api/v1/questions/{question_id}  | Update a question (owner only)              |
| DELETE | /api/v1/questions/{question_id}  | Delete a question (owner only)              |
| POST   | /api/v1/questions/{question_id}/vote | Vote on a question (upvote/downvote)   |

---

## Answers

| Method | Endpoint                                 | Description                                 |
|--------|-------------------------------------------|---------------------------------------------|
| GET    | /api/v1/answers/{question_id}/answers     | List all answers for a question             |
| POST   | /api/v1/answers/{question_id}/answers     | Create a new answer for a question          |
| PATCH  | /api/v1/answers/{answer_id}/accept        | Accept an answer (question owner only)      |
| DELETE | /api/v1/answers/{answer_id}               | Delete an answer (owner only)               |
| POST   | /api/v1/answers/{answer_id}/vote          | Vote on an answer (upvote/downvote)         |

---

## Tags

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /api/v1/tags/                    | List all tags                               |
| GET    | /api/v1/tags/popular             | List popular tags                           |
| GET    | /api/v1/tags/{tag}/questions     | List questions for a specific tag           |

---

## Notifications

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /api/v1/notifications/           | List all notifications for current user     |
| PATCH  | /api/v1/notifications/{notification_id}/mark-as-read | Mark notification as read |
| PATCH  | /api/v1/notifications/mark-all-read | Mark all notifications as read           |
| DELETE | /api/v1/notifications/{notification_id} | Delete a notification                  |

---

## Search

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /api/v1/search/                  | Search questions by title/content           |

---

## Uploads

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| POST   | /api/v1/uploads/                 | Upload a file                               |
| GET    | /api/v1/uploads/                 | List all files                              |
| GET    | /api/v1/uploads/{file_id}        | Get file information                        |
| GET    | /api/v1/uploads/{file_id}/download | Download a file                          |
| DELETE | /api/v1/uploads/{file_id}        | Delete a file                               |

---

## Health

| Method | Endpoint                        | Description                                 |
|--------|----------------------------------|---------------------------------------------|
| GET    | /api/v1/health                   | Basic health check                          |
| GET    | /api/v1/health/db                | Database health check                       |
| GET    | /api/v1/health/storage           | Storage health check                        |
| GET    | /api/v1/health/system            | System info and resource usage              | 