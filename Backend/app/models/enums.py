from enum import Enum

class UserRole(str, Enum):
    admin = "admin"
    user = "user"
    guest = "guest"

class Permission(str, Enum):
    # User permissions
    USER_READ = "user:read"
    USER_UPDATE = "user:update"
    USER_DELETE = "user:delete"
    QUESTION_CREATE = "question:create"
    QUESTION_UPDATE = "question:update"
    QUESTION_DELETE = "question:delete"
    ANSWER_CREATE = "answer:create"
    ANSWER_UPDATE = "answer:update"
    ANSWER_DELETE = "answer:delete"
    
    # Admin permissions
    USER_MANAGE = "user:manage"
    QUESTION_MODERATE = "question:moderate"
    ANSWER_MODERATE = "answer:moderate"
    SYSTEM_CONFIG = "system:config"

class QuestionStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    flagged = "flagged"