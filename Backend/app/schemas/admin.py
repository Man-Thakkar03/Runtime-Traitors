from typing import List, Optional, Generic, TypeVar, Any
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

class AdminUserResponse(BaseModel):
    id: str = Field(..., alias="_id")
    email: str
    first_name: str
    last_name: str
    is_active: bool
    is_verified: bool
    role: str
    created_at: datetime
    updated_at: datetime

    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True
        json_schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "email": "admin@example.com",
                "first_name": "Admin",
                "last_name": "User",
                "is_active": True,
                "is_verified": True,
                "role": "admin",
                "created_at": "2023-01-01T00:00:00Z",
                "updated_at": "2023-01-01T00:00:00Z"
            }
        }

class AdminUserListResponse(BaseModel):
    items: List[AdminUserResponse]
    total: int
    skip: int
    limit: int

    class Config:
        json_schema_extra = {
            "example": {
                "items": [
                    {
                        "id": "507f1f77bcf86cd799439011",
                        "email": "user1@example.com",
                        "first_name": "John",
                        "last_name": "Doe",
                        "is_active": True,
                        "is_verified": True,
                        "role": "user",
                        "created_at": "2023-01-01T00:00:00Z",
                        "updated_at": "2023-01-01T00:00:00Z"
                    }
                ],
                "total": 1,
                "skip": 0,
                "limit": 10
            }
        } 