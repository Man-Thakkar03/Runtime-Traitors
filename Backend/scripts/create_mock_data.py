#!/usr/bin/env python3
"""
Mock Data Creation Script for Runtime Traitors Q&A Platform

This script creates a MongoDB database with all necessary collections and populates them
with realistic mock data for testing the Q&A platform API.

Collections created:
- users: User accounts and authentication data
- questions: Q&A questions with metadata
- answers: Answers to questions
- tags: Question tags and categories
- notifications: User notifications
- uploads: File upload metadata

Usage:
    python create_mock_data.py
"""

import asyncio
import sys
import os
from datetime import datetime, timedelta
from typing import List, Dict, Any
from bson import ObjectId
import random
import string

# Add the parent directory to the path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import Database, init_db
from app.core.security import get_password_hash
from app.models.enums import UserRole


class MockDataCreator:
    def __init__(self):
        self.db = None
        self.users = []
        self.questions = []
        self.answers = []
        self.tags = []
        self.notifications = []
        self.uploads = []

    async def connect(self):
        """Connect to MongoDB database"""
        try:
            await init_db()
            self.db = Database.db
            print("✅ Connected to MongoDB database")
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            print("💡 Make sure MongoDB is running locally on port 27017")
            print("💡 Or set up your MONGODB_URL environment variable")
            raise e

    async def create_database_and_collections(self):
        """Create database and all collections"""
        # Create collections by inserting a dummy document and then deleting it
        collections = ['users', 'questions', 'answers', 'tags', 'notifications', 'uploads']
        
        for collection_name in collections:
            collection = self.db[collection_name]
            # Insert and immediately delete a dummy document to create the collection
            await collection.insert_one({"__dummy__": True})
            await collection.delete_one({"__dummy__": True})
            print(f"✅ Created collection: {collection_name}")

    def generate_random_string(self, length: int = 10) -> str:
        """Generate a random string"""
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

    def generate_random_email(self, first_name: str, last_name: str) -> str:
        """Generate a random email based on name"""
        domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com']
        domain = random.choice(domains)
        return f"{first_name.lower()}.{last_name.lower()}@{domain}"

    async def create_users(self):
        """Create mock users"""
        user_data = [
            {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "role": UserRole.user,
                "is_active": True,
                "is_verified": True
            },
            {
                "first_name": "Jane",
                "last_name": "Smith",
                "email": "jane.smith@example.com",
                "role": UserRole.user,
                "is_active": True,
                "is_verified": True
            },
            {
                "first_name": "Mike",
                "last_name": "Johnson",
                "email": "mike.johnson@example.com",
                "role": UserRole.user,
                "is_active": True,
                "is_verified": False
            },
            {
                "first_name": "Sarah",
                "last_name": "Wilson",
                "email": "sarah.wilson@example.com",
                "role": UserRole.user,
                "is_active": True,
                "is_verified": True
            },
            {
                "first_name": "David",
                "last_name": "Brown",
                "email": "david.brown@example.com",
                "role": UserRole.user,
                "is_active": False,
                "is_verified": True
            }
        ]

        users_collection = self.db['users']
        
        for user_info in user_data:
            # Hash the password
            hashed_password = get_password_hash("password123")
            
            user_doc = {
                "_id": ObjectId(),
                "email": user_info["email"],
                "first_name": user_info["first_name"],
                "last_name": user_info["last_name"],
                "hashed_password": hashed_password,
                "is_active": user_info["is_active"],
                "is_verified": user_info["is_verified"],
                "role": user_info["role"],
                "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 30)),
                "updated_at": datetime.utcnow()
            }
            
            result = await users_collection.insert_one(user_doc)
            user_doc["_id"] = result.inserted_id
            self.users.append(user_doc)
            print(f"✅ Created user: {user_info['first_name']} {user_info['last_name']}")

    async def create_tags(self):
        """Create mock tags"""
        tag_data = [
            {"name": "python", "description": "Python programming language"},
            {"name": "javascript", "description": "JavaScript programming language"},
            {"name": "react", "description": "React.js framework"},
            {"name": "mongodb", "description": "MongoDB database"},
            {"name": "fastapi", "description": "FastAPI web framework"},
            {"name": "docker", "description": "Docker containerization"},
            {"name": "aws", "description": "Amazon Web Services"},
            {"name": "git", "description": "Git version control"},
            {"name": "sql", "description": "SQL databases"},
            {"name": "api", "description": "Application Programming Interfaces"}
        ]

        tags_collection = self.db['tags']
        
        for tag_info in tag_data:
            tag_doc = {
                "_id": ObjectId(),
                "name": tag_info["name"],
                "description": tag_info["description"],
                "question_count": random.randint(0, 15),
                "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 60))
            }
            
            result = await tags_collection.insert_one(tag_doc)
            tag_doc["_id"] = result.inserted_id
            self.tags.append(tag_doc)
            print(f"✅ Created tag: {tag_info['name']}")

    async def create_questions(self):
        """Create mock questions"""
        question_data = [
            {
                "title": "How to implement authentication in FastAPI?",
                "content": "I'm building a FastAPI application and need to implement user authentication. What's the best way to handle JWT tokens and user sessions? I'm using MongoDB as my database.",
                "tags": ["fastapi", "python", "mongodb", "api"]
            },
            {
                "title": "React hooks vs class components - which to use?",
                "content": "I'm new to React and confused about when to use hooks vs class components. Can someone explain the differences and when to use each approach?",
                "tags": ["react", "javascript"]
            },
            {
                "title": "Docker container not starting - permission denied",
                "content": "I'm getting a permission denied error when trying to start my Docker container. The error says 'cannot connect to the Docker daemon'. How can I fix this?",
                "tags": ["docker"]
            },
            {
                "title": "MongoDB aggregation pipeline examples",
                "content": "I need help understanding MongoDB aggregation pipelines. Can someone provide some practical examples of common use cases like grouping, filtering, and transforming data?",
                "tags": ["mongodb", "sql"]
            },
            {
                "title": "AWS Lambda function timeout issues",
                "content": "My AWS Lambda function is timing out after 15 seconds. The function processes large files and needs more time. How can I increase the timeout and optimize performance?",
                "tags": ["aws", "api"]
            }
        ]

        questions_collection = self.db['questions']
        
        for i, question_info in enumerate(question_data):
            # Select a random user as the author
            author = random.choice(self.users)
            
            question_doc = {
                "_id": ObjectId(),
                "title": question_info["title"],
                "content": question_info["content"],
                "tags": question_info["tags"],
                "author_id": author["_id"],
                "author_name": f"{author['first_name']} {author['last_name']}",
                "is_answered": random.choice([True, False]),
                "views": random.randint(10, 500),
                "votes": random.randint(-5, 25),
                "answer_count": random.randint(0, 8),
                "accepted_answer_id": None,
                "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 20)),
                "updated_at": datetime.utcnow() - timedelta(days=random.randint(0, 10))
            }
            
            result = await questions_collection.insert_one(question_doc)
            question_doc["_id"] = result.inserted_id
            self.questions.append(question_doc)
            print(f"✅ Created question: {question_info['title'][:50]}...")

    async def create_answers(self):
        """Create mock answers"""
        answer_data = [
            {
                "content": "For FastAPI authentication, I recommend using FastAPI's built-in security utilities with JWT tokens. Here's a basic implementation using python-jose for JWT handling and passlib for password hashing.",
                "votes": 15
            },
            {
                "content": "You can use FastAPI's Depends with HTTPBearer for token validation. Here's a complete example with user authentication and protected routes.",
                "votes": 8
            },
            {
                "content": "React hooks are the modern way to write React components. They provide better performance and cleaner code. Use functional components with hooks for new projects.",
                "votes": 12
            },
            {
                "content": "Class components are legacy. Hooks provide the same functionality with less boilerplate. Use useState for state and useEffect for side effects.",
                "votes": 6
            },
            {
                "content": "The permission denied error usually means your user isn't in the docker group. Run 'sudo usermod -aG docker $USER' and restart your session.",
                "votes": 20
            },
            {
                "content": "You can also try running Docker commands with sudo, but adding your user to the docker group is the recommended approach.",
                "votes": 3
            },
            {
                "content": "MongoDB aggregation is powerful! Here's a basic example: db.collection.aggregate([{ $match: { status: 'active' } }, { $group: { _id: '$category', total: { $sum: '$amount' } } }])",
                "votes": 18
            },
            {
                "content": "For Lambda timeout, increase the timeout in the function configuration. You can set it up to 15 minutes. Also consider using S3 for large file processing.",
                "votes": 10
            }
        ]

        answers_collection = self.db['answers']
        
        # Distribute answers across questions
        for i, answer_info in enumerate(answer_data):
            # Select a random question and user
            question = random.choice(self.questions)
            author = random.choice(self.users)
            
            answer_doc = {
                "_id": ObjectId(),
                "question_id": question["_id"],
                "author_id": author["_id"],
                "author_name": f"{author['first_name']} {author['last_name']}",
                "content": answer_info["content"],
                "votes": answer_info["votes"],
                "is_accepted": random.choice([True, False]) if question["is_answered"] else False,
                "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 15)),
                "updated_at": datetime.utcnow() - timedelta(days=random.randint(0, 5))
            }
            
            result = await answers_collection.insert_one(answer_doc)
            answer_doc["_id"] = result.inserted_id
            self.answers.append(answer_doc)
            print(f"✅ Created answer by {author['first_name']} {author['last_name']}")

    async def create_notifications(self):
        """Create mock notifications"""
        notification_types = [
            {"type": "answer", "title": "New Answer", "message": "Someone answered your question"},
            {"type": "vote", "title": "Vote Received", "message": "Your question received a vote"},
            {"type": "accept", "title": "Answer Accepted", "message": "Your answer was accepted"},
            {"type": "mention", "title": "Mentioned", "message": "You were mentioned in a question"}
        ]

        notifications_collection = self.db['notifications']
        
        for user in self.users:
            # Create 1-3 notifications per user
            num_notifications = random.randint(1, 3)
            
            for _ in range(num_notifications):
                notification_type = random.choice(notification_types)
                
                # Select a random question and answer for context
                question = random.choice(self.questions) if self.questions else None
                answer = random.choice(self.answers) if self.answers else None
                
                notification_doc = {
                    "_id": ObjectId(),
                    "user_id": user["_id"],
                    "type": notification_type["type"],
                    "title": notification_type["title"],
                    "message": notification_type["message"],
                    "is_read": random.choice([True, False]),
                    "related_question_id": question["_id"] if question else None,
                    "related_answer_id": answer["_id"] if answer else None,
                    "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 7))
                }
                
                result = await notifications_collection.insert_one(notification_doc)
                notification_doc["_id"] = result.inserted_id
                self.notifications.append(notification_doc)
            
            print(f"✅ Created {num_notifications} notifications for {user['first_name']} {user['last_name']}")

    async def create_uploads(self):
        """Create mock file upload metadata"""
        file_types = [
            {"name": "document.pdf", "type": "application/pdf", "size": 1024000},
            {"name": "image.jpg", "type": "image/jpeg", "size": 512000},
            {"name": "code.py", "type": "text/plain", "size": 2048},
            {"name": "data.json", "type": "application/json", "size": 15360},
            {"name": "screenshot.png", "type": "image/png", "size": 256000}
        ]

        uploads_collection = self.db['uploads']
        
        for user in self.users:
            # Create 1-2 uploads per user
            num_uploads = random.randint(1, 2)
            
            for _ in range(num_uploads):
                file_info = random.choice(file_types)
                uploader = user
                
                upload_doc = {
                    "_id": ObjectId(),
                    "filename": file_info["name"],
                    "original_filename": file_info["name"],
                    "content_type": file_info["type"],
                    "size": file_info["size"],
                    "uploaded_by": uploader["_id"],
                    "folder": random.choice(["documents", "images", "code", None]),
                    "url": f"https://storage.example.com/files/{self.generate_random_string(10)}/{file_info['name']}",
                    "metadata": {
                        "uploaded_by": str(uploader["_id"]),
                        "original_filename": file_info["name"]
                    },
                    "created_at": datetime.utcnow() - timedelta(days=random.randint(1, 10))
                }
                
                result = await uploads_collection.insert_one(upload_doc)
                upload_doc["_id"] = result.inserted_id
                self.uploads.append(upload_doc)
            
            print(f"✅ Created {num_uploads} uploads for {user['first_name']} {user['last_name']}")

    async def update_question_answer_counts(self):
        """Update question answer counts based on actual answers"""
        questions_collection = self.db['questions']
        
        for question in self.questions:
            # Count actual answers for this question
            answers_collection = self.db['answers']
            answer_count = await answers_collection.count_documents({"question_id": question["_id"]})
            
            # Update the question with actual answer count
            await questions_collection.update_one(
                {"_id": question["_id"]},
                {"$set": {"answer_count": answer_count}}
            )
        
        print("✅ Updated question answer counts")

    async def update_tag_question_counts(self):
        """Update tag question counts based on actual questions"""
        tags_collection = self.db['tags']
        
        for tag in self.tags:
            # Count actual questions with this tag
            questions_collection = self.db['questions']
            question_count = await questions_collection.count_documents({"tags": tag["name"]})
            
            # Update the tag with actual question count
            await tags_collection.update_one(
                {"_id": tag["_id"]},
                {"$set": {"question_count": question_count}}
            )
        
        print("✅ Updated tag question counts")

    async def create_mock_data(self):
        """Create all mock data"""
        print("🚀 Starting mock data creation...")
        
        await self.connect()
        await self.create_database_and_collections()
        
        print("\n📝 Creating users...")
        await self.create_users()
        
        print("\n🏷️ Creating tags...")
        await self.create_tags()
        
        print("\n❓ Creating questions...")
        await self.create_questions()
        
        print("\n💬 Creating answers...")
        await self.create_answers()
        
        print("\n🔔 Creating notifications...")
        await self.create_notifications()
        
        print("\n📁 Creating uploads...")
        await self.create_uploads()
        
        print("\n🔄 Updating counts...")
        await self.update_question_answer_counts()
        await self.update_tag_question_counts()
        
        print("\n✅ Mock data creation completed successfully!")
        print(f"\n📊 Summary:")
        print(f"   - Users: {len(self.users)}")
        print(f"   - Questions: {len(self.questions)}")
        print(f"   - Answers: {len(self.answers)}")
        print(f"   - Tags: {len(self.tags)}")
        print(f"   - Notifications: {len(self.notifications)}")
        print(f"   - Uploads: {len(self.uploads)}")


async def main():
    """Main function to run the mock data creation"""
    try:
        creator = MockDataCreator()
        await creator.create_mock_data()
    except Exception as e:
        print(f"❌ Error creating mock data: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main()) 