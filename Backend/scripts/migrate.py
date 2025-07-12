import asyncio
import sys
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.db.session import Database
from app.core.config import settings

async def run_migrations():
    """Run database migrations"""
    # Initialize database connection
    await Database.connect_to_mongo()
    
    try:
        # Get the database
        db = Database.db
        
        # Example migration: Create indexes
        users_collection = db["users"]
        
        # Create index on email field (unique)
        await users_collection.create_index("email", unique=True)
        
        # Create index on created_at field
        await users_collection.create_index("created_at")
        
        print("Migrations completed successfully!")
        
    except Exception as e:
        print(f"Error running migrations: {str(e)}")
        raise
    finally:
        # Close database connection
        await Database.close_mongo_connection()

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run migrations
    asyncio.run(run_migrations()) 