from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status


from app.core.security import get_current_active_user
from app.models.user import  UserUpdate
from app.crud.crud_user import user as crud_user

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/me")
async def read_user_me(current_user: dict = Depends(get_current_active_user)):
    """
    Get current user
    """
    user = await crud_user.get(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return standard_response(True, data=user, message="User profile fetched successfully")

@router.put("/me")
async def update_user_me(
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Update current user
    """
    user = await crud_user.update(current_user["user_id"], user_update)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return standard_response(True, data=user, message="User profile updated successfully")

@router.delete("/me")
async def delete_user_me(
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete current user
    """
    success = await crud_user.delete(current_user["user_id"])
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return standard_response(True, message="User deleted successfully") 