from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.models.enums import UserRole

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: UserRole = UserRole.user

class UserCreate(UserBase):
    password: str
    terms_accepted: bool

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None

class UserResponse(UserBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    last_login: Optional[datetime] = None 