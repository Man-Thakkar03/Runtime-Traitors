from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from app.models.question import QuestionInDB, QuestionCreate, QuestionUpdate, Question
from app.db.session import get_collection

class CRUDQuestion:
    def __init__(self):
        self._collection = None
    
    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_collection("questions")
        return self._collection

    async def get(self, question_id: str) -> Optional[QuestionInDB]:
        if not ObjectId.is_valid(question_id):
            return None
        question_data = await self.collection.find_one({"_id": ObjectId(question_id)})
        if question_data:
            return QuestionInDB(**question_data)
        return None

    async def get_multi(
        self, 
        skip: int = 0, 
        limit: int = 100,
        tag: Optional[str] = None,
        search: Optional[str] = None
    ) -> List[QuestionInDB]:
        filter_query = {}
        
        if tag:
            filter_query["tags"] = tag
        
        if search:
            filter_query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}}
            ]
        
        questions = []
        cursor = self.collection.find(filter_query).sort("created_at", -1).skip(skip).limit(limit)
        
        async for question_data in cursor:
            questions.append(QuestionInDB(**question_data))
        
        return questions

    async def create(self, question_in: QuestionCreate, author_id: str, author_name: str) -> QuestionInDB:
        # Create question data
        question_data = question_in.dict()
        question_data["author_id"] = ObjectId(author_id)
        question_data["author_name"] = author_name
        question_data["created_at"] = datetime.utcnow()
        question_data["updated_at"] = datetime.utcnow()
        
        # Insert into database
        result = await self.collection.insert_one(question_data)
        
        # Return the created question
        created_question = await self.get(str(result.inserted_id))
        return created_question

    async def update(
        self, question_id: str, question_in: QuestionUpdate
    ) -> Optional[QuestionInDB]:
        if not ObjectId.is_valid(question_id):
            return None
            
        # Get existing question
        existing_question = await self.get(question_id)
        if not existing_question:
            return None
            
        # Prepare update data
        update_data = question_in.dict(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()
        
        # Perform the update
        result = await self.collection.update_one(
            {"_id": ObjectId(question_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            return await self.get(question_id)
        return None

    async def delete(self, question_id: str) -> bool:
        if not ObjectId.is_valid(question_id):
            return False
            
        result = await self.collection.delete_one({"_id": ObjectId(question_id)})
        return result.deleted_count > 0

    async def increment_views(self, question_id: str) -> bool:
        if not ObjectId.is_valid(question_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(question_id)},
            {"$inc": {"views": 1}}
        )
        return result.modified_count == 1

    async def update_answer_count(self, question_id: str, increment: bool = True) -> bool:
        if not ObjectId.is_valid(question_id):
            return False
            
        change = 1 if increment else -1
        result = await self.collection.update_one(
            {"_id": ObjectId(question_id)},
            {"$inc": {"answer_count": change}}
        )
        return result.modified_count == 1

    async def set_accepted_answer(self, question_id: str, answer_id: str) -> bool:
        if not ObjectId.is_valid(question_id) or not ObjectId.is_valid(answer_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(question_id)},
            {
                "$set": {
                    "accepted_answer_id": ObjectId(answer_id),
                    "is_answered": True,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        return result.modified_count == 1

    async def get_by_tag(self, tag: str, skip: int = 0, limit: int = 100) -> List[QuestionInDB]:
        questions = []
        cursor = self.collection.find({"tags": tag}).sort("created_at", -1).skip(skip).limit(limit)
        
        async for question_data in cursor:
            questions.append(QuestionInDB(**question_data))
        
        return questions

    async def search(self, query: str, skip: int = 0, limit: int = 100) -> List[QuestionInDB]:
        questions = []
        search_filter = {
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"content": {"$regex": query, "$options": "i"}}
            ]
        }
        
        cursor = self.collection.find(search_filter).sort("created_at", -1).skip(skip).limit(limit)
        
        async for question_data in cursor:
            questions.append(QuestionInDB(**question_data))
        
        return questions

# Create a default instance for easy importing
question = CRUDQuestion() 