from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any, Union
from jose import JWTError, JOSEError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings
from app.models.user import UserInDB
from app.crud.crud_user import user as crud_user
from app.models.enums import UserRole, Permission

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# JWT token handling
def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_refresh_token(user_id: str) -> str:
    expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    return create_access_token(
        data={"sub": str(user_id), "type": "refresh"},
        expires_delta=expires
    )

def create_access_token_from_refresh_token(refresh_token: str) -> str:
    try:
        payload = jwt.decode(
            refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        # Create new access token
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return create_access_token(
            data={"sub": user_id}, expires_delta=access_token_expires
        )
    except JOSEError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Get the current authenticated user from the JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Check if token is blacklisted
        from app.api.v1.endpoints.auth import is_token_blacklisted
        if is_token_blacklisted(token):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been revoked",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        role: str = payload.get("role", UserRole.user)
        
        if user_id is None:
            raise credentials_exception
            
        # Get user from database
        user = await crud_user.get(user_id)
        if user is None:
            raise credentials_exception
            
        # Verify token version
        token_version = payload.get("version", 0)
        if hasattr(user, "token_version") and user.token_version > token_version:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been invalidated",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Return as dictionary format expected by endpoints
        return {
            "user_id": str(user.id),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": user.is_active,
            "is_verified": user.is_verified,
            "role": role,
            "permissions": get_user_permissions(role)
        }
        
    except JOSEError as e:
        raise credentials_exception

class RoleChecker:
    def __init__(self, allowed_roles):
        self.allowed_roles = allowed_roles

    async def __call__(self, current_user: dict = Depends(get_current_user)):
        if current_user["role"] not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return current_user

# Role-based dependencies
allow_guest = RoleChecker([UserRole.guest, UserRole.user, UserRole.admin])
allow_user = RoleChecker([UserRole.user, UserRole.admin])
allow_admin = RoleChecker([UserRole.admin])

def get_user_permissions(role: UserRole) -> list:
    """Get permissions based on user role"""
    if role == UserRole.admin:
        return [permission.value for permission in Permission]
    elif role == UserRole.user:
        return [
            Permission.USER_READ.value,
            Permission.USER_UPDATE.value,
            Permission.QUESTION_CREATE.value,
            Permission.QUESTION_UPDATE.value,
            Permission.QUESTION_DELETE.value,
            Permission.ANSWER_CREATE.value,
            Permission.ANSWER_UPDATE.value,
            Permission.ANSWER_DELETE.value,
        ]
    else:  # guest
        return [
            Permission.USER_READ.value,
            Permission.QUESTION_CREATE.value,
            Permission.ANSWER_CREATE.value,
        ]

async def get_current_active_user(current_user: dict = Depends(get_current_user)) -> dict:
    """
    Get the current active user
    """
    if not current_user["is_active"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

# Shortcut dependencies for easier use
current_user = get_current_active_user 