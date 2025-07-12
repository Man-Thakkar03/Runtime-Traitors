from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from app.models.notification import NotificationInDB, NotificationCreate, NotificationUpdate, Notification
from app.db.session import get_collection

class CRUDNotification:
    def __init__(self):
        self._collection = None
    
    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_collection("notifications")
        return self._collection

    async def get(self, notification_id: str) -> Optional[NotificationInDB]:
        if not ObjectId.is_valid(notification_id):
            return None
        notification_data = await self.collection.find_one({"_id": ObjectId(notification_id)})
        if notification_data:
            return NotificationInDB(**notification_data)
        return None

    async def get_by_user(self, user_id: str, skip: int = 0, limit: int = 100) -> List[NotificationInDB]:
        if not ObjectId.is_valid(user_id):
            return []
        
        notifications = []
        cursor = self.collection.find({"user_id": ObjectId(user_id)}).sort("created_at", -1).skip(skip).limit(limit)
        
        async for notification_data in cursor:
            notifications.append(NotificationInDB(**notification_data))
        
        return notifications

    async def create(self, notification_in: NotificationCreate, user_id: str, question_id: Optional[str] = None, answer_id: Optional[str] = None) -> NotificationInDB:
        # Create notification data
        notification_data = notification_in.dict()
        notification_data["user_id"] = ObjectId(user_id)
        
        if question_id and ObjectId.is_valid(question_id):
            notification_data["related_question_id"] = ObjectId(question_id)
        
        if answer_id and ObjectId.is_valid(answer_id):
            notification_data["related_answer_id"] = ObjectId(answer_id)
        
        notification_data["created_at"] = datetime.utcnow()
        
        # Insert into database
        result = await self.collection.insert_one(notification_data)
        
        # Return the created notification
        created_notification = await self.get(str(result.inserted_id))
        return created_notification

    async def update(
        self, notification_id: str, notification_in: NotificationUpdate
    ) -> Optional[NotificationInDB]:
        if not ObjectId.is_valid(notification_id):
            return None
            
        # Get existing notification
        existing_notification = await self.get(notification_id)
        if not existing_notification:
            return None
            
        # Prepare update data
        update_data = notification_in.dict(exclude_unset=True)
        
        # Perform the update
        result = await self.collection.update_one(
            {"_id": ObjectId(notification_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            return await self.get(notification_id)
        return None

    async def mark_as_read(self, notification_id: str) -> bool:
        if not ObjectId.is_valid(notification_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(notification_id)},
            {"$set": {"is_read": True}}
        )
        return result.modified_count == 1

    async def mark_all_as_read(self, user_id: str) -> bool:
        if not ObjectId.is_valid(user_id):
            return False
            
        result = await self.collection.update_many(
            {"user_id": ObjectId(user_id), "is_read": False},
            {"$set": {"is_read": True}}
        )
        return result.modified_count > 0

    async def delete(self, notification_id: str) -> bool:
        if not ObjectId.is_valid(notification_id):
            return False
            
        result = await self.collection.delete_one({"_id": ObjectId(notification_id)})
        return result.deleted_count > 0

    async def get_unread_count(self, user_id: str) -> int:
        if not ObjectId.is_valid(user_id):
            return 0
        
        count = await self.collection.count_documents({
            "user_id": ObjectId(user_id),
            "is_read": False
        })
        return count

    async def delete_old_notifications(self, user_id: str, days_old: int = 30) -> bool:
        if not ObjectId.is_valid(user_id):
            return False
        
        cutoff_date = datetime.utcnow() - datetime.timedelta(days=days_old)
        
        result = await self.collection.delete_many({
            "user_id": ObjectId(user_id),
            "created_at": {"$lt": cutoff_date}
        })
        return result.deleted_count > 0

# Create a default instance for easy importing
notification = CRUDNotification() 