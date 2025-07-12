from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from app.core.security import get_current_active_user, get_current_admin_user
from app.models.user import User, UserInDB, UserUpdate
from app.crud.crud_user import user as crud_user
from app.schemas.base import ResponseModel, ListResponse
from app.schemas.user import UserResponse

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/users/", response_model=ListResponse)
async def admin_list_users(
    skip: int = 0,
    limit: int = 100,
    current_user: UserInDB = Depends(get_current_admin_user),
):
    """
    Retrieve all users (admin only)
    """
    users = []
    total = await crud_user.collection.count_documents({})
    
    async for user_data in crud_user.collection.find().skip(skip).limit(limit):
        users.append(UserInDB(**user_data))
    
    return standard_response(
        True,
        data={"items": users, "total": total, "skip": skip, "limit": limit},
        message="Users retrieved successfully"
    )

@router.get("/users/{user_id}", response_model=UserResponse)
async def admin_get_user(
    user_id: str,
    current_user: UserInDB = Depends(get_current_admin_user),
):
    """
    Get a specific user by ID (admin only)
    """
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    user = await crud_user.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return standard_response(True, data=user, message="User retrieved successfully")

@router.patch("/users/{user_id}", response_model=UserResponse)
async def admin_update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: UserInDB = Depends(get_current_admin_user),
):
    """
    Update a user (admin only)
    """
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    user = await crud_user.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    updated_user = await crud_user.update(user_id, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user"
        )
    
    return standard_response(True, data=updated_user, message="User updated successfully")

@router.delete("/users/{user_id}", response_model=ResponseModel)
async def admin_delete_user(
    user_id: str,
    current_user: UserInDB = Depends(get_current_admin_user),
):
    """
    Delete a user (admin only)
    """
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    if user_id == str(current_user.id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    user = await crud_user.get(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    deleted = await crud_user.delete(user_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete user"
        )
    
    return standard_response(True, message="User deleted successfully") 