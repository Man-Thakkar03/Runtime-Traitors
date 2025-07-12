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

class NotificationBase(BaseModel):
    type: str = Field(..., description="Type of notification: answer, vote, accept, etc.")
    title: str = Field(..., max_length=200)
    message: str = Field(..., max_length=500)
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None

class NotificationInDB(NotificationBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId
    related_question_id: Optional[PyObjectId] = None
    related_answer_id: Optional[PyObjectId] = None

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    }

class Notification(NotificationBase):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    user_id: PyObjectId
    related_question_id: Optional[PyObjectId] = None
    related_answer_id: Optional[PyObjectId] = None

    model_config = {
        "json_encoders": {ObjectId: str},
        "populate_by_name": True,
        "arbitrary_types_allowed": True
    } 