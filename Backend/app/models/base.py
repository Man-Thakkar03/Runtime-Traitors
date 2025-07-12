from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class BaseDBModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        allow_population_by_field_name = True 