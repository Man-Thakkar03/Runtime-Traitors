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
    
    # Create CRUD instance
    crud_user = CRUDUser()
    
    # Check if admin user already exists
    admin_email = "admin@example.com"
    existing_admin = await crud_user.get_by_email(admin_email)
    
    if existing_admin:
        print(f"Admin user already exists with email: {admin_email}")
        return
    
    # Create admin user
    admin_user = UserCreate(
        email=admin_email,
        password="admin123",  # In production, use a secure password from environment variables
        first_name="Admin",
        last_name="User",
        role="admin",
        is_active=True,
        is_verified=True
    )
    
    try:
        # Create admin user
        admin = await crud_user.create(admin_user)
        print(f"Admin user created successfully with ID: {admin.id}")
        print(f"Email: {admin.email}")
        print("Password: admin123")  # In production, don't log passwords
        print("\nIMPORTANT: Change the default password after first login!")
    except Exception as e:
        print(f"Error creating admin user: {str(e)}")

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run the initialization
    asyncio.run(init_db()) 