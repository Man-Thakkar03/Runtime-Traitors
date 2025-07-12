from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.models.question import QuestionCreate, QuestionUpdate, Question
from app.models.answer import Answer
from app.crud.crud_question import question as crud_question
from app.crud.crud_answer import answer as crud_answer
from app.crud.crud_tag import tag as crud_tag
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

@router.get("/", response_model=dict)
async def get_questions(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    tag: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    """
    Get all questions with optional filtering by tag or search
    """
    questions = await crud_question.get_multi(skip=skip, limit=limit, tag=tag, search=search)
    total = await crud_question.collection.count_documents({})
    
    return standard_response(
        True,
        data={"items": questions, "total": total, "skip": skip, "limit": limit},
        message="Questions retrieved successfully"
    )

@router.post("/", response_model=dict)
async def create_question(
    question_in: QuestionCreate,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Create a new question
    """
    # Get user details
    user = await crud_user.get(current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Create the question
    question = await crud_question.create(
        question_in=question_in,
        author_id=str(user.id),
        author_name=f"{user.first_name} {user.last_name}"
    )
    
    # Update tag question counts
    for tag_name in question_in.tags:
        await crud_tag.increment_question_count(tag_name)
    
    return standard_response(
        True,
        data=question,
        message="Question created successfully"
    )

@router.get("/{question_id}", response_model=dict)
async def get_question(
    question_id: str,
    current_user: Optional[dict] = Depends(get_current_active_user)
):
    """
    Get a specific question with its answers
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
    
    # Increment view count
    await crud_question.increment_views(question_id)
    
    # Get answers for this question
    answers = await crud_answer.get_by_question(question_id)
    
    return standard_response(
        True,
        data={"question": question, "answers": answers},
        message="Question retrieved successfully"
    )

@router.put("/{question_id}", response_model=dict)
async def update_question(
    question_id: str,
    question_in: QuestionUpdate,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Update a question (owner only)
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
    
    # Check if user is the author
    if str(question.author_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to update this question"
        )
    
    updated_question = await crud_question.update(question_id, question_in)
    if not updated_question:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update question"
        )
    
    return standard_response(
        True,
        data=updated_question,
        message="Question updated successfully"
    )

@router.delete("/{question_id}", response_model=dict)
async def delete_question(
    question_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete a question (owner only)
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
    
    # Check if user is the author
    if str(question.author_id) != current_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions to delete this question"
        )
    
    # Decrement tag question counts
    for tag_name in question.tags:
        await crud_tag.decrement_question_count(tag_name)
    
    success = await crud_question.delete(question_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete question"
        )
    
    return standard_response(
        True,
        message="Question deleted successfully"
    )

@router.post("/{question_id}/vote", response_model=dict)
async def vote_question(
    question_id: str,
    vote_value: int = Query(..., ge=-1, le=1),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Vote on a question (upvote: 1, downvote: -1)
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
    
    # Update question votes
    success = await crud_question.collection.update_one(
        {"_id": ObjectId(question_id)},
        {"$inc": {"votes": vote_value}}
    )
    
    if not success.modified_count:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to vote on question"
        )
    
    return standard_response(
        True,
        message="Vote recorded successfully"
    ) 