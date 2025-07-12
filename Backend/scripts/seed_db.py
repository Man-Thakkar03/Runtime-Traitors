import asyncio
import sys
from pathlib import Path
from datetime import datetime, timedelta
import random
import string

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.config import settings
from app.db.session import Database
from app.models.user import UserCreate
from app.crud.crud_user import CRUDUser

async def create_test_users(count=10):
    """Create test users"""
    crud_user = CRUDUser()
    
    # Create regular users
    for i in range(1, count + 1):
        email = f"user{i}@example.com"
        existing_user = await crud_user.get_by_email(email)
        
        if not existing_user:
            user_data = UserCreate(
                email=email,
                password="password123",
                first_name=f"User{i}",
                last_name="Test",
                role="user",
                is_active=True,
                is_verified=random.choice([True, False])
            )
            user = await crud_user.create(user_data)
            print(f"Created user: {user.email}")
        else:
            print(f"User already exists: {email}")

async def main():
    # Initialize database connection
    await Database.connect_to_mongo()
    
    try:
        # Create test data
        await create_test_users(10)
        print("\nDatabase seeding completed successfully!")
        print("\nUser credentials:")
        print("Email: user1@example.com")
        print("Password: password123")
        
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
    finally:
        # Close database connection
        await Database.close_mongo_connection()

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run the seeding
    asyncio.run(main()) 