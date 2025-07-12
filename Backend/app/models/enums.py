from enum import Enum

class UserRole(str, Enum):
    user = "user"
    admin = "admin"
    guest = "guest" 