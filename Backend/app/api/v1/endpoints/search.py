from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.crud.crud_question import question as crud_question

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.get("/", response_model=dict)
async def search_questions(
    q: str = Query(..., min_length=1, description="Search query"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Search questions by title and content
    """
    if not q.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Search query cannot be empty"
        )
    
    questions = await crud_question.search(q.strip(), skip=skip, limit=limit)
    total = await crud_question.collection.count_documents({
        "$or": [
            {"title": {"$regex": q.strip(), "$options": "i"}},
            {"content": {"$regex": q.strip(), "$options": "i"}}
        ]
    })
    
    return standard_response(
        True,
        data={
            "items": questions,
            "total": total,
            "query": q.strip(),
            "skip": skip,
            "limit": limit
        },
        message=f"Search results for '{q.strip()}' retrieved successfully"
    ) 