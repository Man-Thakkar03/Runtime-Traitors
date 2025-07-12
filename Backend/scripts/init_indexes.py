#!/usr/bin/env python3
"""
Script to initialize database indexes.
"""
import asyncio
import sys
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.config import settings
from app.db.session import Database, get_collection

async def create_indexes():
    """
    Create necessary database indexes
    """
    # Users collection indexes
    users = get_collection("users")
    
    # Create unique index on email
    await users.create_index("email", unique=True)
    
    # Create index on role for faster role-based queries
    await users.create_index("role")
    
    # Create index on is_active for faster filtering of active users
    await users.create_index("is_active")
    
    # Create text index for search
    await users.create_index([
        ("email", "text"),
        ("first_name", "text"),
        ("last_name", "text")
    ])
    
    # Add indexes for other collections as needed
    # files = get_collection("files")
    # await files.create_index("user_id")
    # await files.create_index("created_at")
    
    print("Database indexes created successfully")

async def main():
    """
    Main function to run the script
    """
    # Initialize database connection
    await Database.connect_to_mongo()
    
    try:
        # Create indexes
        await create_indexes()
    except Exception as e:
        print(f"Error creating indexes: {str(e)}")
        sys.exit(1)
    finally:
        # Close database connection
        await Database.close_mongo_connection()
    
    print("Database initialization completed successfully")
    sys.exit(0)

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run the async main function
    asyncio.run(main()) 