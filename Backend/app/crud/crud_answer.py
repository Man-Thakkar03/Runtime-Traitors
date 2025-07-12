from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from app.models.answer import AnswerInDB, AnswerCreate, AnswerUpdate, Answer
from app.db.session import get_collection

class CRUDAnswer:
    def __init__(self):
        self._collection = None
    
    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_collection("answers")
        return self._collection

    async def get(self, answer_id: str) -> Optional[AnswerInDB]:
        if not ObjectId.is_valid(answer_id):
            return None
        answer_data = await self.collection.find_one({"_id": ObjectId(answer_id)})
        if answer_data:
            return AnswerInDB(**answer_data)
        return None

    async def get_by_question(self, question_id: str, skip: int = 0, limit: int = 100) -> List[AnswerInDB]:
        if not ObjectId.is_valid(question_id):
            return []
        
        answers = []
        cursor = self.collection.find({"question_id": ObjectId(question_id)}).sort("votes", -1).skip(skip).limit(limit)
        
        async for answer_data in cursor:
            answers.append(AnswerInDB(**answer_data))
        
        return answers

    async def create(self, answer_in: AnswerCreate, question_id: str, author_id: str, author_name: str) -> AnswerInDB:
        # Create answer data
        answer_data = answer_in.dict()
        answer_data["question_id"] = ObjectId(question_id)
        answer_data["author_id"] = ObjectId(author_id)
        answer_data["author_name"] = author_name
        answer_data["created_at"] = datetime.utcnow()
        answer_data["updated_at"] = datetime.utcnow()
        
        # Insert into database
        result = await self.collection.insert_one(answer_data)
        
        # Return the created answer
        created_answer = await self.get(str(result.inserted_id))
        return created_answer

    async def update(
        self, answer_id: str, answer_in: AnswerUpdate
    ) -> Optional[AnswerInDB]:
        if not ObjectId.is_valid(answer_id):
            return None
            
        # Get existing answer
        existing_answer = await self.get(answer_id)
        if not existing_answer:
            return None
            
        # Prepare update data
        update_data = answer_in.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        # Perform the update
        result = await self.collection.update_one(
            {"_id": ObjectId(answer_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            return await self.get(answer_id)
        return None

    async def delete(self, answer_id: str) -> bool:
        if not ObjectId.is_valid(answer_id):
            return False
            
        result = await self.collection.delete_one({"_id": ObjectId(answer_id)})
        return result.deleted_count > 0

    async def accept_answer(self, answer_id: str) -> bool:
        if not ObjectId.is_valid(answer_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(answer_id)},
            {
                "$set": {
                    "is_accepted": True,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count == 1

    async def vote_answer(self, answer_id: str, vote_value: int) -> bool:
        if not ObjectId.is_valid(answer_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(answer_id)},
            {"$inc": {"votes": vote_value}}
        )
        return result.modified_count == 1

    async def get_by_author(self, author_id: str, skip: int = 0, limit: int = 100) -> List[AnswerInDB]:
        if not ObjectId.is_valid(author_id):
            return []
        
        answers = []
        cursor = self.collection.find({"author_id": ObjectId(author_id)}).sort("created_at", -1).skip(skip).limit(limit)
        
        async for answer_data in cursor:
            answers.append(AnswerInDB(**answer_data))
        
        return answers

# Create a default instance for easy importing
answer = CRUDAnswer() 