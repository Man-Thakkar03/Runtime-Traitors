from datetime import datetime
from typing import Optional, Annotated
from pydantic import BaseModel, Field, BeforeValidator
from bson import ObjectId

def validate_object_id(v):
    if isinstance(v, ObjectId):
        return v
    if isinstance(v, str) and ObjectId.is_valid(v):
        return ObjectId(v)
    raise ValueError("Invalid ObjectId")

PyObjectId = Annotated[ObjectId, BeforeValidator(validate_object_id)]

class AnswerBase(BaseModel):
    content: str = Field(..., min_length=10)
    votes: int = 0
    is_accepted: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AnswerCreate(AnswerBase):
    pass

class AnswerUpdate(BaseModel):
    content: Optional[str] = Field(None, min_length=10)

class AnswerInDB(AnswerBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    question_id: PyObjectId
    author_id: PyObjectId
    author_name: str

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }

class Answer(AnswerBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    question_id: PyObjectId
    author_id: PyObjectId
    author_name: str

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    } 