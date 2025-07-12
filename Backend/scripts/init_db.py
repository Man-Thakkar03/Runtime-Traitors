import asyncio
import sys
import os
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.config import settings
from app.db.session import Database
from app.models.user import UserCreate
from app.crud.crud_user import CRUDUser

async def init_db():
    """Initialize the database with default data"""
    # Initialize database connection
    await Database.connect_to_mongo()
    
    print("Database initialization completed successfully!")
    print("No admin users will be created as admin functionality has been removed.")

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run the initialization
    asyncio.run(init_db()) 