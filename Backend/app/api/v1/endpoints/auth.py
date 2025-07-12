from datetime import timedelta, datetime
from fastapi import APIRouter, HTTPException, status, Request
from typing import Any

from app.core.security import (
    create_access_token,
    create_refresh_token,
)
from app.core.config import settings
from app.crud.crud_user import user as crud_user
from app.schemas.token import (
    LoginRequest,
    RegisterRequest,
)
from app.models.user import UserCreate, UserInDB

router = APIRouter()

# In-memory token blacklist (for demo; use persistent storage in production)
blacklisted_tokens = set()

def is_token_blacklisted(token: str) -> bool:
    return token in blacklisted_tokens

def standard_response(success: bool, data: Any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.post("/login")
async def login(login_data: LoginRequest):
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # Authenticate user
    user = await crud_user.authenticate(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user",
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(str(user.id))
    
    # Prepare user data for response - convert to dict and handle ObjectId serialization
    user_data = user.model_dump(exclude={
        "hashed_password",
        "created_at",
        "updated_at"
    })
    # Ensure ObjectId is converted to string
    if "id" in user_data:
        user_data["id"] = str(user_data["id"])
    
    return standard_response(
        True,
        data={
            "access_token": access_token,
            "token_type": "bearer",
            "refresh_token": refresh_token,
            "user": user_data
        },
        message="Login successful"
    )

@router.post("/register")
async def register(user_in: RegisterRequest):
    """
    Create new user
    """
    # Create user data
    user_data = UserCreate(
        email=user_in.email,
        password=user_in.password,
        first_name=user_in.first_name,
        last_name=user_in.last_name,
    )
    
    try:
        # Create user in database
        user = await crud_user.create(user_data)
        
        # Create access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id)},
            expires_delta=access_token_expires
        )
        
        # Create refresh token
        refresh_token = create_refresh_token(str(user.id))
        
        # Prepare user data for response - convert to dict and handle ObjectId serialization
        user_data = user.model_dump(exclude={
            "hashed_password",
            "created_at",
            "updated_at"
        })
        # Ensure ObjectId is converted to string
        if "id" in user_data:
            user_data["id"] = str(user_data["id"])
        
        return standard_response(
            True,
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "refresh_token": refresh_token,
                "user": user_data
            },
            message="User registered successfully"
        )
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while creating the user.",
        )

@router.post("/logout")
async def logout(request: Request):
    """
    Logout user (invalidate token)
    """
    auth_header = request.headers.get("authorization")
    if not auth_header or not auth_header.lower().startswith("bearer "):
        return standard_response(False, message="No token provided", status_code=400)
    token = auth_header.split(" ", 1)[1]
    blacklisted_tokens.add(token)
    return standard_response(True, message="Successfully logged out") 