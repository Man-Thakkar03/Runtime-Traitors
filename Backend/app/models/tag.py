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

class TagBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    description: Optional[str] = None
    question_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TagCreate(TagBase):
    pass

class TagInDB(TagBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }

class Tag(TagBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    } 