from typing import Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException, status
from app.models.user import UserInDB, UserCreate, UserUpdate, User
from app.db.session import get_collection

class CRUDUser:
    def __init__(self):
        self._collection = None
    
    @property
    def collection(self):
        if self._collection is None:
            self._collection = get_collection("users")
        return self._collection

    async def get_by_email(self, email: str) -> Optional[UserInDB]:
        user_data = await self.collection.find_one({"email": email})
        if user_data:
            # Convert ObjectId to string for JSON serialization
            if "_id" in user_data:
                user_data["_id"] = str(user_data["_id"])
            return UserInDB(**user_data)
        return None

    async def get(self, user_id: str) -> Optional[UserInDB]:
        if not ObjectId.is_valid(user_id):
            return None
        user_data = await self.collection.find_one({"_id": ObjectId(user_id)})
        if user_data:
            # Convert ObjectId to string for JSON serialization
            if "_id" in user_data:
                user_data["_id"] = str(user_data["_id"])
            return UserInDB(**user_data)
        return None

    async def get_multi(self, skip: int = 0, limit: int = 100) -> list[UserInDB]:
        """Get multiple users with pagination"""
        cursor = self.collection.find().skip(skip).limit(limit)
        users = []
        async for user_data in cursor:
            # Convert ObjectId to string for JSON serialization
            if "_id" in user_data:
                user_data["_id"] = str(user_data["_id"])
            users.append(UserInDB(**user_data))
        return users

    async def create(self, user_in: UserCreate) -> UserInDB:
        # Check if user with email already exists
        existing_user = await self.get_by_email(user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The user with this email already exists."
            )
        
        # Hash the password
        from app.core.security import get_password_hash
        hashed_password = get_password_hash(user_in.password)
        
        # Create user data
        user_data = user_in.dict(exclude={"password"}, exclude_unset=True)
        user_data["hashed_password"] = hashed_password
        user_data["created_at"] = datetime.utcnow()
        user_data["updated_at"] = datetime.utcnow()
        
        # Insert into database
        result = await self.collection.insert_one(user_data)
        
        # Return the created user
        created_user = await self.get(str(result.inserted_id))
        return created_user

    async def update(
        self, user_id: str, user_in: UserUpdate
    ) -> Optional[UserInDB]:
        if not ObjectId.is_valid(user_id):
            return None
            
        # Get existing user
        existing_user = await self.get(user_id)
        if not existing_user:
            return None
            
        # Prepare update data
        update_data = user_in.dict(exclude_unset=True)
        
        # If password is being updated, hash it
        if "password" in update_data:
            from app.core.security import get_password_hash
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        
        # Update the user
        update_data["updated_at"] = datetime.utcnow()
        
        # Perform the update
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 1:
            return await self.get(user_id)
        return None

    async def authenticate(self, email: str, password: str) -> Optional[UserInDB]:
        user = await self.get_by_email(email)
        if not user:
            return None
        from app.core.security import verify_password
        if not verify_password(password, user.hashed_password):
            return None
        return user

    async def delete(self, user_id: str) -> bool:
        if not ObjectId.is_valid(user_id):
            return False
            
        result = await self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0

    async def update_last_login(self, user_id: str) -> bool:
        """Update the last login timestamp for a user"""
        if not ObjectId.is_valid(user_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"last_login": datetime.utcnow()}}
        )
        return result.modified_count > 0

    async def increment_token_version(self, user_id: str) -> int:
        """Increment the token version to invalidate existing tokens"""
        if not ObjectId.is_valid(user_id):
            return -1
            
        result = await self.collection.find_one_and_update(
            {"_id": ObjectId(user_id)},
            {"$inc": {"token_version": 1}},
            return_document=True
        )
        return result.get("token_version", 1) if result else -1

    async def get_user_permissions(self, user_id: str) -> list[str]:
        """Get permissions for a specific user"""
        from app.core.security import get_user_permissions
        from app.models.enums import UserRole
        
        user = await self.get(user_id)
        if not user:
            return []
            
        return get_user_permissions(user.role)

    async def update_user_role(self, user_id: str, role: str) -> bool:
        """Update a user's role (admin only)"""
        if not ObjectId.is_valid(user_id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"role": role, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0

# Create a default instance for easy importing
user = CRUDUser()