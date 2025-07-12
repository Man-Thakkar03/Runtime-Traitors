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
from app.core.logging_config import get_logger
from app.core.security import get_user_permissions

router = APIRouter()

logger = get_logger(__name__)

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
    try:
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
                detail="Account is deactivated. Please contact support.",
            )
        
        # Get token version for invalidation
        token_version = getattr(user, "token_version", 0)
        
        # Create access token with additional claims
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": str(user.id),
                "role": user.role,
                "version": token_version
            },
            expires_delta=access_token_expires
        )
        
        # Create refresh token
        refresh_token = create_refresh_token(str(user.id))
        
        # Update last login time
        await crud_user.update_last_login(str(user.id))
        
        # Prepare user data for response
        user_data = {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "role": user.role,
            "permissions": get_user_permissions(user.role)
        }
        
        return standard_response(
            True,
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "expires_in": int(access_token_expires.total_seconds()),
                "refresh_token": refresh_token,
                "user": user_data
            },
            message="Login successful"
        )
        
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during login. Please try again."
        )

@router.post("/register")
async def register(user_in: RegisterRequest):
    """
    Create new user
    """
    try:
        # Check if registration is open to public or needs admin approval
        if not settings.REGISTRATION_OPEN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="New user registration is currently closed."
            )
            
        # Validate email domain if needed
        if settings.ALLOWED_EMAIL_DOMAINS:
            domain = user_in.email.split('@')[-1]
            if domain not in settings.ALLOWED_EMAIL_DOMAINS:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Email domain must be one of: {', '.join(settings.ALLOWED_EMAIL_DOMAINS)}"
                )
        
        # Create user data
        user_data = UserCreate(
            email=user_in.email.lower().strip(),
            password=user_in.password,
            first_name=user_in.first_name.strip(),
            last_name=user_in.last_name.strip(),
            is_active=not settings.REQUIRE_EMAIL_VERIFICATION,
            is_verified=False,
            role=UserRole.user  # Default role
        )
        
        # Create user in database
        user = await crud_user.create(user_data)
        
        # If email verification is required, send verification email
        if settings.REQUIRE_EMAIL_VERIFICATION:
            # Generate verification token
            verification_token = create_access_token(
                data={"sub": str(user.id), "type": "verify_email"},
                expires_delta=timedelta(days=1)
            )
            
            # Send verification email (implement this function)
            await send_verification_email(user.email, verification_token)
            
            return standard_response(
                True,
                data={"email": user.email},
                message="Registration successful! Please check your email to verify your account.",
                status_code=status.HTTP_201_CREATED
            )
        
        # If no email verification required, log the user in
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "sub": str(user.id),
                "role": user.role,
                "version": 0
            },
            expires_delta=access_token_expires
        )
        
        refresh_token = create_refresh_token(str(user.id))
        
        # Prepare user data for response
        user_data = {
            "id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "role": user.role,
            "permissions": get_user_permissions(user.role)
        }
        
        return standard_response(
            True,
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "expires_in": int(access_token_expires.total_seconds()),
                "refresh_token": refresh_token,
                "user": user_data
            },
            message="Registration successful!",
            status_code=status.HTTP_201_CREATED
        )
        
    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred during registration. Please try again."
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