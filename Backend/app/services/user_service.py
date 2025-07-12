from app.models.user import User
from app.schemas.user import UserUpdate
from typing import Optional
from datetime import datetime

class UserService:
    @staticmethod
    async def get_user(user_id: str) -> Optional[User]:
        return await User.get(user_id)

    @staticmethod
    async def update_user(user: User, user_in: UserUpdate) -> User:
        update_data = user_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        user.updated_at = datetime.utcnow()
        await user.save()
        return user

    @staticmethod
    async def delete_user(user: User):
        await user.delete() 