from typing import Any, Dict, Generic, List, Optional, TypeVar, Union
from pydantic import BaseModel, Field
from datetime import datetime
from bson import ObjectId

T = TypeVar('T')

class ResponseModel(BaseModel, Generic[T]):
    """Base response model for all API responses"""
    success: bool = True
    data: Optional[T] = None
    message: str = "Operation completed successfully"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {},
                "message": "Operation completed successfully",
                "timestamp": "2023-01-01T00:00:00Z"
            }
        }

class ListResponse(ResponseModel[T], Generic[T]):
    """Response model for paginated lists"""
    data: Dict[str, Any] = Field(
        default_factory=lambda: {
            "items": [],
            "total": 0,
            "skip": 0,
            "limit": 10
        }
    )

    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "data": {
                    "items": [],
                    "total": 0,
                    "skip": 0,
                    "limit": 10
                },
                "message": "Data retrieved successfully",
                "timestamp": "2023-01-01T00:00:00Z"
            }
        } 