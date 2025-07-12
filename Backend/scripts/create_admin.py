#!/usr/bin/env python3
"""
Script to create an admin user.
Usage: python -m scripts.create_admin <email> <password> [--first-name FIRST_NAME] [--last-name LAST_NAME]
"""
import argparse
import asyncio
import sys
from pathlib import Path

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.config import settings
from app.db.session import Database
from app.models.user import UserCreate
from app.crud.crud_user import user as crud_user

async def create_admin_user(email: str, password: str, first_name: str = "Admin", last_name: str = "User") -> bool:
    """
    Create an admin user if it doesn't exist
    """
    # Check if user already exists
    existing_user = await crud_user.get_by_email(email)
    if existing_user:
        print(f"User with email {email} already exists")
        if existing_user.role == "admin":
            print("User is already an admin")
            return False
        else:
            # Update existing user to admin
            from app.models.user import UserUpdate
            update_data = UserUpdate(
                role="admin",
                is_active=True,
                is_verified=True
            )
            updated_user = await crud_user.update(str(existing_user.id), update_data)
            if updated_user:
                print(f"Updated user {email} to admin")
                return True
            else:
                print(f"Failed to update user {email} to admin")
                return False
    
    # Create new admin user
    user_data = UserCreate(
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name,
        role="admin",
        is_active=True,
        is_verified=True
    )
    
    try:
        user = await crud_user.create(user_data)
        if user:
            print(f"Admin user created successfully: {email}")
            return True
        else:
            print("Failed to create admin user")
            return False
    except Exception as e:
        print(f"Error creating admin user: {str(e)}")
        return False

async def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="Create an admin user")
    parser.add_argument("email", help="Email address for the admin user")
    parser.add_argument("password", help="Password for the admin user")
    parser.add_argument("--first-name", default="Admin", help="First name of the admin user")
    parser.add_argument("--last-name", default="User", help="Last name of the admin user")
    
    args = parser.parse_args()
    
    # Initialize database connection
    await Database.connect_to_mongo()
    
    # Create admin user
    success = await create_admin_user(
        email=args.email,
        password=args.password,
        first_name=args.first_name,
        last_name=args.last_name
    )
    
    # Close database connection
    await Database.close_mongo_connection()
    
    # Exit with appropriate status code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    # Run the async main function
    asyncio.run(main()) 