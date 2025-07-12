from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.models.answer import AnswerCreate, AnswerUpdate, Answer
from app.crud.crud_answer import answer as crud_answer
from app.crud.crud_question import question as crud_question
from app.crud.crud_notification import notification as crud_notification
from app.crud.crud_user import user as crud_user

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/{question_id}/answers", response_model=dict)
async def get_answers(
    question_id: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get all answers for a specific question
    """
    if not ObjectId.is_valid(question_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid question ID format"
        )
    
    question = await crud_question.get(question_id)
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    
    answers = await crud_answer.get_by_question(question_id, skip=skip, limit=limit)
    total = await crud_answer.collection.count_documents({"question_id": ObjectId(question_id)})
    
    return standard_response(
        True,
        data={"items": answers, "total": total, "skip": skip, "limit": limit},
        message="Answers retrieved successfully"
    )

@router.post("/{question_id}/answers", response_model=dict)
async def create_answer(
    question_id: str,
    answer_in: AnswerCreate,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Create a new answer for a question
    """
    if not ObjectId.is_valid(question_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid question ID format"
        )
    
    question = await crud_question.get(question_id)
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    
    # Get user details
    user = await crud_user.get(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Create the answer
    answer = await crud_answer.create(
        answer_in=answer_in,
        question_id=question_id,
        author_id=str(user.id),
        author_name=f"{user.first_name} {user.last_name}"
    )
    
    # Update question answer count
    await crud_question.update_answer_count(question_id, increment=True)
    
    # Create notification for question author
    if str(question.author_id) != current_user["user_id"]:
        notification_data = {
            "type": "answer",
            "title": "New Answer",
            "message": f"Someone answered your question: {question.title[:50]}...",
            "is_read": False
        }
        
        await crud_notification.create(
            notification_in=notification_data,
            user_id=str(question.author_id),
            question_id=question_id,
            answer_id=str(answer.id)
        )
    
    return standard_response(
        True,
        data=answer,
        message="Answer created successfully"
    )

@router.patch("/{answer_id}/accept", response_model=dict)
async def accept_answer(
    answer_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Accept an answer (question owner only)
    """
    if not ObjectId.is_valid(answer_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid answer ID format"
        )
    
    answer = await crud_answer.get(answer_id)
    if not answer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found"
        )
    
    question = await crud_question.get(str(answer.question_id))
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not found"
        )
    
    # Check if user is the question author
    if str(question.author_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the question author can accept answers"
        )
    
    # Accept the answer
    success = await crud_answer.accept_answer(answer_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to accept answer"
        )
    
    # Update question to mark as answered
    await crud_question.set_accepted_answer(str(answer.question_id), answer_id)
    
    # Create notification for answer author
    notification_data = {
        "type": "accept",
        "title": "Answer Accepted",
        "message": f"Your answer was accepted for: {question.title[:50]}...",
        "is_read": False
    }
    
    await crud_notification.create(
        notification_in=notification_data,
        user_id=str(answer.author_id),
        question_id=str(answer.question_id),
        answer_id=answer_id
    )
    
    return standard_response(
        True,
        message="Answer accepted successfully"
    )

@router.delete("/{answer_id}", response_model=dict)
async def delete_answer(
    answer_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete an answer (owner only)
    """
    if not ObjectId.is_valid(answer_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid answer ID format"
        )
    
    answer = await crud_answer.get(answer_id)
    if not answer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found"
        )
    
    # Check if user is the answer author
    if str(answer.author_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this answer"
        )
    
    # Update question answer count
    await crud_question.update_answer_count(str(answer.question_id), increment=False)
    
    success = await crud_answer.delete(answer_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete answer"
        )
    
    return standard_response(
        True,
        message="Answer deleted successfully"
    )

@router.post("/{answer_id}/vote", response_model=dict)
async def vote_answer(
    answer_id: str,
    vote_value: int = Query(..., ge=-1, le=1),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Vote on an answer (upvote: 1, downvote: -1)
    """
    if not ObjectId.is_valid(answer_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid answer ID format"
        )
    
    answer = await crud_answer.get(answer_id)
    if not answer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Answer not found"
        )
    
    # Update answer votes
    success = await crud_answer.vote_answer(answer_id, vote_value)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to vote on answer"
        )
    
    return standard_response(
        True,
        message="Vote recorded successfully"
    ) 