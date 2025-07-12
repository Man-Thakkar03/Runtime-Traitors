from enum import Enum

class UserRole(str, Enum):
    user = "user"
    guest = "guest" 