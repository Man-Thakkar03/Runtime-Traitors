from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from bson import ObjectId

from app.core.security import get_current_active_user
from app.models.tag import Tag
from app.crud.crud_tag import tag as crud_tag
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
async def get_tags(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = Query(None)
):
    """
    Get all available tags
    """
    if search:
        tags = await crud_tag.search_tags(search, limit=limit)
    else:
        tags = await crud_tag.get_multi(skip=skip, limit=limit)
    
    total = await crud_tag.collection.count_documents({})
    
    return standard_response(
        True,
        data={"items": tags, "total": total, "skip": skip, "limit": limit},
        message="Tags retrieved successfully"
    )

@router.get("/popular", response_model=dict)
async def get_popular_tags(
    limit: int = Query(20, ge=1, le=50)
):
    """
    Get popular tags
    """
    tags = await crud_tag.get_popular_tags(limit=limit)
    
    return standard_response(
        True,
        data={"items": tags, "total": len(tags)},
        message="Popular tags retrieved successfully"
    )

@router.get("/{tag}/questions", response_model=dict)
async def get_questions_by_tag(
    tag: str,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Get all questions under a specific tag
    """
    questions = await crud_question.get_by_tag(tag, skip=skip, limit=limit)
    total = await crud_question.collection.count_documents({"tags": tag})
    
    return standard_response(
        True,
        data={"items": questions, "total": total, "skip": skip, "limit": limit, "tag": tag},
        message=f"Questions for tag '{tag}' retrieved successfully"
    ) 