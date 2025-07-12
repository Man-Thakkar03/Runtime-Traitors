from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.crud.crud_user import user as crud_user
from app.models.user import UserUpdate

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/users/", response_model=dict)
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_active_user)
):
    """
    List all users (admin only)
    """
    # TODO: Add admin role check
    users = await crud_user.get_multi(skip=skip, limit=limit)
    total = await crud_user.collection.count_documents({})
    
    return standard_response(
        True,
        data={"items": users, "total": total, "skip": skip, "limit": limit},
        message="Users retrieved successfully"
    )

@router.get("/users/{user_id}", response_model=dict)
async def get_user(
    user_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get a specific user (admin only)
    """
    # TODO: Add admin role check
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
    
    return standard_response(
        True,
        data=user,
        message="User retrieved successfully"
    )

@router.patch("/users/{user_id}", response_model=dict)
async def update_user(
    user_id: str,
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Update a user (admin only)
    """
    # TODO: Add admin role check
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    user = await crud_user.update(user_id, user_update)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return standard_response(
        True,
        data=user,
        message="User updated successfully"
    )

@router.delete("/users/{user_id}", response_model=dict)
async def delete_user(
    user_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete a user (admin only)
    """
    # TODO: Add admin role check
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    
    success = await crud_user.delete(user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return standard_response(
        True,
        message="User deleted successfully"
    ) 