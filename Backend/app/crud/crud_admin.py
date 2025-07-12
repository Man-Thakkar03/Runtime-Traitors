from app.models.user import User
from app.models.enums import UserRole
from app.crud.base import CRUDBase

class CRUDAdmin(CRUDBase):
    async def list_users(self, skip: int = 0, limit: int = 100, role: str = None) -> list:
        query = {}
        if role:
            query["role"] = role
        return await User.find(query).skip(skip).limit(limit).to_list()

    async def update_user_role(self, user_id: str, new_role: UserRole):
        user = await User.get(user_id)
        if user:
            user.role = new_role
            await user.save()
        return user

    async def delete_user(self, user_id: str):
        user = await User.get(user_id)
        if user:
            await user.delete()
        return user 