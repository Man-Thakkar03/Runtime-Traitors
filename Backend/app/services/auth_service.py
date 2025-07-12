from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import verify_password, get_password_hash, create_access_token
from beanie import PydanticObjectId
from typing import Optional
from datetime import datetime, timedelta
from app.models.enums import UserRole

class AuthService:
    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[User]:
        user = await User.find_one(User.email == email)
        if user and verify_password(password, user.hashed_password):
            return user
        return None

    @staticmethod
    async def register_user(user_in: UserCreate) -> User:
        hashed_password = get_password_hash(user_in.password)
        user = User(
            email=user_in.email,
            hashed_password=hashed_password,
            first_name=user_in.first_name,
            last_name=user_in.last_name,
            role=UserRole.user,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        await user.insert()
        return user

    @staticmethod
    def create_token(user: User) -> str:
        return create_access_token({"sub": str(user.id), "role": user.role})

    @staticmethod
    async def logout_user(user: User):
        # Implement token blacklisting if needed
        pass 