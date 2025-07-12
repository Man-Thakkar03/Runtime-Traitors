from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.models.notification import Notification
from app.crud.crud_notification import notification as crud_notification

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/", response_model=dict)
async def get_notifications(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get all notifications for the current user
    """
    notifications = await crud_notification.get_by_user(
        user_id=current_user["user_id"],
        skip=skip,
        limit=limit
    )
    
    total = await crud_notification.collection.count_documents({"user_id": ObjectId(current_user["user_id"])})
    unread_count = await crud_notification.get_unread_count(current_user["user_id"])
    
    return standard_response(
        True,
        data={
            "items": notifications,
            "total": total,
            "unread_count": unread_count,
            "skip": skip,
            "limit": limit
        },
        message="Notifications retrieved successfully"
    )

@router.patch("/{notification_id}/mark-as-read", response_model=dict)
async def mark_notification_as_read(
    notification_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Mark a single notification as read
    """
    if not ObjectId.is_valid(notification_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid notification ID format"
        )
    
    notification = await crud_notification.get(notification_id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Check if notification belongs to the current user
    if str(notification.user_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to access this notification"
        )
    
    success = await crud_notification.mark_as_read(notification_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to mark notification as read"
        )
    
    return standard_response(
        True,
        message="Notification marked as read successfully"
    )

@router.patch("/mark-all-read", response_model=dict)
async def mark_all_notifications_as_read(
    current_user: dict = Depends(get_current_active_user)
):
    """
    Mark all notifications as read for the current user
    """
    success = await crud_notification.mark_all_as_read(current_user["user_id"])
    
    return standard_response(
        True,
        message="All notifications marked as read successfully"
    )

@router.delete("/{notification_id}", response_model=dict)
async def delete_notification(
    notification_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete a notification (owner only)
    """
    if not ObjectId.is_valid(notification_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid notification ID format"
        )
    
    notification = await crud_notification.get(notification_id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    
    # Check if notification belongs to the current user
    if str(notification.user_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this notification"
        )
    
    success = await crud_notification.delete(notification_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete notification"
        )
    
    return standard_response(
        True,
        message="Notification deleted successfully"
    ) 