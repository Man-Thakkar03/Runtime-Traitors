import os
import platform
import psutil
from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.db.session import Database
from app.services.storage import storage

router = APIRouter()

def standard_response(success: bool, data: any = None, message: str = "", status_code: int = 200):
    return {
        "success": success,
        "data": data,
        "message": message,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@router.get("")
async def health_check():
    """
    Basic health check endpoint
    """
    return standard_response(
        True,
        data={
            "status": "healthy",
            "version": settings.APP_VERSION,
            "environment": settings.ENVIRONMENT
        },
        message="Health check successful"
    )

@router.get("/db")
async def db_health_check():
    """
    Database health check
    """
    try:
        # Test database connection
        await Database.db.command('ping')
        
        return standard_response(
            True,
            data={
                "database": {
                    "connected": True,
                    "name": settings.DATABASE_NAME,
                    "server_info": "MongoDB"
                }
            },
            message="Database healthy"
        )
    except Exception as e:
        return standard_response(
            False,
            data={
                "database": {
                    "connected": False,
                    "error": str(e)
                }
            },
            message="Database unhealthy"
        )

@router.get("/storage")
async def storage_health_check():
    """
    Storage health check
    """
    try:
        # Test storage connection by listing containers
        
        # This will raise an exception if the connection fails
        await storage.container_client.get_container_properties()
        
        return standard_response(
            True,
            data={
                "storage": {
                    "connected": True,
                    "type": "Azure Blob Storage",
                    "container": settings.AZURE_STORAGE_CONTAINER
                }
            },
            message="Storage healthy"
        )
    except Exception as e:
        return standard_response(
            False,
            data={
                "storage": {
                    "connected": False,
                    "error": str(e)
                }
            },
            message="Storage unhealthy"
        )

@router.get("/system")
async def system_info():
    """
    System information and resource usage
    """
    # Get system information
    system_info = {
        "os": {
            "system": platform.system(),
            "release": platform.release(),
            "version": platform.version(),
            "machine": platform.machine(),
            "processor": platform.processor(),
            "python_version": platform.python_version()
        },
        "resources": {
            "cpu_percent": psutil.cpu_percent(interval=1),
            "cpu_count": psutil.cpu_count(),
            "memory_total": psutil.virtual_memory().total,
            "memory_available": psutil.virtual_memory().available,
            "memory_percent": psutil.virtual_memory().percent,
            "disk_usage": psutil.disk_usage('/')._asdict() if hasattr(psutil, 'disk_usage') else {}
        },
        "process": {
            "pid": os.getpid(),
            "name": psutil.Process().name(),
            "status": psutil.Process().status(),
            "create_time": datetime.fromtimestamp(psutil.Process().create_time()).isoformat(),
            "cpu_percent": psutil.Process().cpu_percent(interval=0.1),
            "memory_info": psutil.Process().memory_info()._asdict(),
            "open_files": len(psutil.Process().open_files()),
            "connections": len(psutil.Process().connections())
        }
    }
    
    return standard_response(True, data=system_info, message="System info fetched successfully") 