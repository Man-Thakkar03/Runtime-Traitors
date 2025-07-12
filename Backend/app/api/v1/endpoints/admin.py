from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, status, Query, Body
from bson import ObjectId

from app.crud.crud_user import user as crud_user
from app.models.user import UserUpdate
from app.schemas.user import UserRoleUpdate
from app.crud.crud_notification import notification as crud_notification
from app.models.notification import NotificationCreate
from app.models.enums import UserRole, Permission
from app.crud.crud_question import question as crud_question
from app.models.enums import QuestionStatus
from app.crud.crud_answer import answer as crud_answer

router = APIRouter()  # No dependencies, open access

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/users/", response_model=dict)
async def list_users(
    query: Optional[str] = Query(None, description="Search by email or name"),
    role: Optional[UserRole] = Query(None, description="Filter by role"),
    is_active: Optional[bool] = Query(None, description="Filter by active status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    List all users with filtering and pagination (no auth)
    """
    # Fetch users with pagination only
    users = await crud_user.get_multi(skip=skip, limit=limit)
    
    # Prepare response data (exclude sensitive info)
    user_list = []
    for user in users:
        user_data = user.dict(exclude={"hashed_password", "token_version"})
        user_data["id"] = str(user.id)
        user_list.append(user_data)

    # Apply filters in Python (inefficient for large datasets, but matches current CRUDUser API)
    if query:
        user_list = [u for u in user_list if query.lower() in u.get("email", "").lower() or query.lower() in u.get("first_name", "").lower() or query.lower() in u.get("last_name", "").lower()]
    if role:
        user_list = [u for u in user_list if u.get("role") == role]
    if is_active is not None:
        user_list = [u for u in user_list if u.get("is_active") == is_active]

    total = len(user_list)
    # Paginate after filtering
    paginated_users = user_list[:limit]

    return standard_response(
        True,
        data={"items": paginated_users, "total": total, "skip": skip, "limit": limit},
        message="Users retrieved successfully"
    )

@router.get("/users/{user_id}", response_model=dict)
async def get_user(
    user_id: str
):
    """
    Get a specific user (no auth)
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
    return standard_response(
        True,
        data=user,
        message="User retrieved successfully"
    )

@router.patch("/users/{user_id}/role", response_model=dict)
async def update_user_role(
    user_id: str,
    role_update: UserRoleUpdate
):
    """
    Update a user's role (no auth)
    """
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    # Update the user's role
    success = await crud_user.update_user_role(user_id, role_update.role)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    # Invalidate all existing tokens for this user by incrementing token version
    await crud_user.increment_token_version(user_id)
    # Send notification to user
    notification_data = NotificationCreate(
        type="account",
        title="Account Role Updated",
        message=f"Your account role has been updated to {role_update.role} by an admin.",
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=user_id)
    return standard_response(
        True,
        message=f"User role updated to {role_update.role}"
    )

@router.patch("/users/{user_id}/status", response_model=dict)
async def update_user_status(
    user_id: str,
    is_active: bool = Body(..., embed=True)
):
    """
    Activate or deactivate a user account (no auth)
    """
    if not ObjectId.is_valid(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    # Update user status
    success = await crud_user.update(
        user_id,
        UserUpdate(is_active=is_active)
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    # Invalidate all existing tokens if deactivating
    if not is_active:
        await crud_user.increment_token_version(user_id)
    # Send notification to user
    status_text = "activated" if is_active else "deactivated"
    notification_data = NotificationCreate(
        type="account",
        title=f"Account {status_text.title()}",
        message=f"Your account has been {status_text} by an admin.",
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=user_id)
    return standard_response(
        True,
        message=f"User account {status_text}"
    )

@router.delete("/users/{user_id}", response_model=dict)
async def delete_user(
    user_id: str
):
    """
    Delete a user (no auth)
    """
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
    # Mention notification for user deletion by admin
    notification_data = NotificationCreate(
        type="mention",
        title="Mentioned by Admin",
        message="Your account was deleted by an admin.",
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=user_id)
    
    return standard_response(
        True,
        message="User deleted successfully"
    ) 

@router.get("/questions/", response_model=dict)
async def list_questions(
    status: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    List all questions (admin only, with optional status filter)
    """
    questions = await crud_question.get_multi(skip=skip, limit=limit)
    total = await crud_question.collection.count_documents({})
    return standard_response(
        True,
        data={"items": questions, "total": total, "skip": skip, "limit": limit},
        message="Questions retrieved successfully"
    )

@router.patch("/questions/{question_id}", response_model=dict)
async def moderate_question(
    question_id: str,
    action: str = Query(..., regex="^(approve|reject|flag)$")
):
    """
    Moderate a question (approve/reject/flag) (admin only)
    """
    question_obj = await crud_question.get(question_id)
    if not question_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    # Determine new status
    if action == "approve":
        new_status = QuestionStatus.approved
        notif_msg = "Your question was approved by an admin."
    elif action == "reject":
        new_status = QuestionStatus.rejected
        notif_msg = "Your question was rejected by an admin."
    elif action == "flag":
        new_status = QuestionStatus.flagged
        notif_msg = "Your question was flagged by an admin."
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid action")
    updated_question = await crud_question.update_status(question_id, new_status)
    if not updated_question:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update question status")
    # Mention notification for moderation
    notification_data = NotificationCreate(
        type="mention",
        title="Question Moderated",
        message=notif_msg,
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=str(question_obj.author_id))
    return standard_response(
        True,
        data=updated_question,
        message=f"Question {action}d successfully"
    )

@router.delete("/questions/{question_id}", response_model=dict)
async def delete_question_admin(
    question_id: str
):
    """
    Delete a question (admin only)
    """
    question_obj = await crud_question.get(question_id)
    if not question_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")
    success = await crud_question.delete(question_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete question")
    # Mention notification for deletion
    notification_data = NotificationCreate(
        type="mention",
        title="Question Deleted",
        message="Your question was deleted by an admin.",
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=str(question_obj.author_id))
    return standard_response(
        True,
        message="Question deleted successfully"
    ) 

@router.get("/answers/", response_model=dict)
async def list_answers(
    status: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    List all answers (admin only, with optional status filter)
    """
    if status:
        answers = await crud_answer.get_by_status(status, skip=skip, limit=limit)
        total = await crud_answer.collection.count_documents({"status": status})
    else:
        answers = await crud_answer.collection.find().sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
        total = await crud_answer.collection.count_documents({})

    # Convert ObjectId fields to strings for serialization
    answer_list = []
    for ans in answers:
        if isinstance(ans, dict):
            ans_dict = ans.copy()
        else:
            ans_dict = ans.dict(by_alias=True)
        for key in ["_id", "question_id", "author_id"]:
            if key in ans_dict and isinstance(ans_dict[key], ObjectId):
                ans_dict[key] = str(ans_dict[key])
        answer_list.append(ans_dict)

    return standard_response(
        True,
        data={"items": answer_list, "total": total, "skip": skip, "limit": limit},
        message="Answers retrieved successfully"
    )

@router.patch("/answers/{answer_id}", response_model=dict)
async def moderate_answer(
    answer_id: str,
    action: str = Query(..., regex="^(approve|reject|flag)$")
):
    """
    Moderate an answer (approve/reject/flag) (admin only)
    """
    answer_obj = await crud_answer.get(answer_id)
    if not answer_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")
    # Determine new status
    if action == "approve":
        new_status = QuestionStatus.approved
        notif_msg = "Your answer was approved by an admin."
    elif action == "reject":
        new_status = QuestionStatus.rejected
        notif_msg = "Your answer was rejected by an admin."
    elif action == "flag":
        new_status = QuestionStatus.flagged
        notif_msg = "Your answer was flagged by an admin."
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid action")
    updated_answer = await crud_answer.update_status(answer_id, new_status)
    if not updated_answer:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update answer status")
    # Mention notification for moderation
    notification_data = NotificationCreate(
        type="mention",
        title="Answer Moderated",
        message=notif_msg,
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=str(answer_obj.author_id))
    return standard_response(
        True,
        data=updated_answer,
        message=f"Answer {action}d successfully"
    )

@router.delete("/answers/{answer_id}", response_model=dict)
async def delete_answer_admin(
    answer_id: str
):
    """
    Delete an answer (admin only)
    """
    answer_obj = await crud_answer.get(answer_id)
    if not answer_obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")
    success = await crud_answer.delete(answer_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete answer")
    # Mention notification for deletion
    notification_data = NotificationCreate(
        type="mention",
        title="Answer Deleted",
        message="Your answer was deleted by an admin.",
        is_read=False
    )
    await crud_notification.create(notification_in=notification_data, user_id=str(answer_obj.author_id))
    return standard_response(
        True,
        message="Answer deleted successfully"
    ) 