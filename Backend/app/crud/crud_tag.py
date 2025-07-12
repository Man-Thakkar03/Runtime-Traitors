from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from app.models.tag import TagInDB, TagCreate, Tag
from app.db.session import get_collection

class CRUDTag:
    def __init__(self):
        self._collection = None
    
    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_collection("tags")
        return self._collection

    async def get(self, tag_name: str) -> Optional[TagInDB]:
        tag_data = await self.collection.find_one({"name": tag_name})
        if tag_data:
            return TagInDB(**tag_data)
        return None

    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[TagInDB]:
        tags = []
        cursor = self.collection.find().sort("question_count", -1).skip(skip).limit(limit)
        
        async for tag_data in cursor:
            tags.append(TagInDB(**tag_data))
        
        return tags

    async def create(self, tag_in: TagCreate) -> TagInDB:
        # Check if tag already exists
        existing_tag = await self.get(tag_in.name)
        if existing_tag:
            return existing_tag
        
        # Create tag data
        tag_data = tag_in.dict()
        tag_data["created_at"] = datetime.utcnow()
        
        # Insert into database
        result = await self.collection.insert_one(tag_data)
        
        # Return the created tag
        created_tag = await self.get(tag_in.name)
        return created_tag

    async def increment_question_count(self, tag_name: str) -> bool:
        result = await self.collection.update_one(
            {"name": tag_name},
            {"$inc": {"question_count": 1}}
        )
        return result.modified_count == 1

    async def decrement_question_count(self, tag_name: str) -> bool:
        result = await self.collection.update_one(
            {"name": tag_name},
            {"$inc": {"question_count": -1}}
        )
        return result.modified_count == 1

    async def get_popular_tags(self, limit: int = 20) -> List[TagInDB]:
        tags = []
        cursor = self.collection.find().sort("question_count", -1).limit(limit)
        
        async for tag_data in cursor:
            tags.append(TagInDB(**tag_data))
        
        return tags

    async def search_tags(self, query: str, limit: int = 10) -> List[TagInDB]:
        tags = []
        cursor = self.collection.find(
            {"name": {"$regex": query, "$options": "i"}}
        ).sort("question_count", -1).limit(limit)
        
        async for tag_data in cursor:
            tags.append(TagInDB(**tag_data))
        
        return tags

# Create a default instance for easy importing
tag = CRUDTag() 