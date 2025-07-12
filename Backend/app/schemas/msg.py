from pydantic import BaseModel
from typing import Optional

class Message(BaseModel):
    success: bool
    message: Optional[str] = None 