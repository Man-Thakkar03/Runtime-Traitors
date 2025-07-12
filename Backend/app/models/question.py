from datetime import datetime
from typing import Optional, List, Annotated
from pydantic import BaseModel, Field, BeforeValidator
from bson import ObjectId
from app.models.enums import UserRole

def validate_object_id(v):
    if isinstance(v, ObjectId):
        return v
    if isinstance(v, str) and ObjectId.is_valid(v):
        return ObjectId(v)
    raise ValueError("Invalid ObjectId")

PyObjectId = Annotated[ObjectId, BeforeValidator(validate_object_id)]

class QuestionBase(BaseModel):
    title: str = Field(..., min_length=10, max_length=200)
    content: str = Field(..., min_length=20)
    tags: List[str] = Field(default_factory=list)
    is_answered: bool = False
    views: int = 0
    votes: int = 0
    status: str = Field(default="pending")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class QuestionCreate(QuestionBase):
    pass

class QuestionUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=10, max_length=200)
    content: Optional[str] = Field(None, min_length=20)
    tags: Optional[List[str]] = None
    status: Optional[str] = None

class QuestionInDB(QuestionBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    author_id: PyObjectId
    author_name: str
    answer_count: int = 0
    accepted_answer_id: Optional[PyObjectId] = None

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }

class Question(QuestionBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    author_id: PyObjectId
    author_name: str
    answer_count: int = 0
    accepted_answer_id: Optional[PyObjectId] = None

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    } 