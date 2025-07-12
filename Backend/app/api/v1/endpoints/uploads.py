import os
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from typing import Optional, List
from app.core.security import get_current_active_user
from app.core.config import settings
from app.services.storage import storage
from app.models.user import UserInDB
from datetime import datetime

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }

@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    folder: Optional[str] = None,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Upload a file to the storage
    """
    # Check file size
    file.file.seek(0, 2)  # Move to the end of the file
    file_size = file.file.tell()
    file.file.seek(0)  # Reset file pointer
    
    if file_size > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File too large. Maximum size is {settings.MAX_UPLOAD_SIZE} bytes"
        )
    
    # Read the file content (no MIME type detection)
    file_content = await file.read()
    
    # Upload the file
    try:
        from io import BytesIO
        file_obj = BytesIO(file_content)
        
        # Use the file's provided content_type or a default
        content_type = file.content_type or "application/octet-stream"
        
        result = await storage.upload_file(
            file_data=file_obj,
            filename=file.filename,
            content_type=content_type,
            folder=folder,
            metadata={
                "uploaded_by": current_user["user_id"],
                "original_filename": file.filename
            }
        )
        
        return standard_response(True, data=result, message="File uploaded successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )

@router.get("/")
async def list_files(
    folder: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    current_user: dict = Depends(get_current_active_user)
):
    """
    List all files in the storage
    """
    try:
        # In a real app, you would implement pagination with the Azure SDK
        # For now, we'll return a simplified response
        files = []
        async for blob in storage.container_client.list_blobs(name_starts_with=folder):
            file_info = await storage.get_file_info(blob.name)
            if file_info:
                files.append(file_info)
        
        # Apply pagination
        start = (page - 1) * limit
        end = start + limit
        paginated_files = files[start:end]
        
        return standard_response(
            True,
            data={
                "files": paginated_files,
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": len(files),
                    "pages": (len(files) + limit - 1) // limit
                }
            },
            message="Files listed successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error listing files: {str(e)}"
        )

@router.get("/{file_id}")
async def get_file(
    file_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get file information
    """
    try:
        file_info = await storage.get_file_info(file_id)
        if not file_info:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
            
        return standard_response(True, data=file_info, message="File info fetched successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error getting file: {str(e)}"
        )

@router.get("/{file_id}/download")
async def download_file(
    file_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Download a file
    """
    try:
        file_info = await storage.get_file_info(file_id)
        if not file_info:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
            
        # In a real app, you would stream the file directly from Azure Blob Storage
        # For now, we'll just return the download URL
        return standard_response(True, data={"download_url": file_info["url"]}, message="Download URL fetched successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error downloading file: {str(e)}"
        )

@router.delete("/{file_id}")
async def delete_file(
    file_id: str,
    current_user: dict = Depends(get_current_active_user)
):
    """
    Delete a file
    """
    try:
        # In a real app, you would check if the user has permission to delete this file
        success = await storage.delete_file(file_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
            
        return standard_response(True, message="File deleted successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting file: {str(e)}"
        ) 