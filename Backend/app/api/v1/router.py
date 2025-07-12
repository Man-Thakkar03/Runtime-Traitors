from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, uploads, health, admin

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(uploads.router, prefix="/uploads", tags=["File Uploads"])
api_router.include_router(health.router, prefix="/health", tags=["Health"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "Welcome to the Runtime Traitors API",
        "version": "1.0.0",
        "docs": "/docs"
    } 