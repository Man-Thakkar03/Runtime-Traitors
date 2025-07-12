from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, uploads, health, questions, answers, tags, notifications, search

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(uploads.router, prefix="/uploads", tags=["File Uploads"])
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(questions.router, prefix="/questions", tags=["Questions"])
api_router.include_router(answers.router, prefix="/answers", tags=["Answers"])
api_router.include_router(tags.router, prefix="/tags", tags=["Tags"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(search.router, prefix="/search", tags=["Search"])

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Welcome to the Runtime Traitors API",
        "version": "1.0.0",
        "docs": "/docs"
    } 