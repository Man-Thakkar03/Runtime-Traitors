from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect_to_mongo(cls):
        try:
            # Configure connection options for MongoDB Atlas
            connection_params = {
                "serverSelectionTimeoutMS": 30000,
                "connectTimeoutMS": 30000,
                "socketTimeoutMS": 30000,
                "retryWrites": True,
                "w": "majority",
                "tls": True,
                "tlsAllowInvalidCertificates": True
            }
            
            cls.client = AsyncIOMotorClient(settings.MONGODB_URL, **connection_params)
            cls.db = cls.client[settings.DATABASE_NAME]
            
            # Test the connection with a timeout
            await cls.db.command('ping')
            print("Connected to MongoDB successfully!")
            
        except Exception as e:
            print(f"Failed to connect to MongoDB: {str(e)}")
            # Try simplified connection approach
            try:
                print("Attempting simplified connection...")
                cls.client = AsyncIOMotorClient(
                    settings.MONGODB_URL,
                    serverSelectionTimeoutMS=30000,
                    connectTimeoutMS=30000,
                    socketTimeoutMS=30000
                )
                cls.db = cls.client[settings.DATABASE_NAME]
                await cls.db.command('ping')
                print("Connected to MongoDB with simplified method!")
            except Exception as e2:
                print(f"Simplified connection also failed: {str(e2)}")
                # Try basic connection without any SSL parameters
                try:
                    print("Attempting basic connection...")
                    cls.client = AsyncIOMotorClient(settings.MONGODB_URL)
                    cls.db = cls.client[settings.DATABASE_NAME]
                    await cls.db.command('ping')
                    print("Connected to MongoDB with basic method!")
                except Exception as e3:
                    print(f"All connection attempts failed: {str(e3)}")
                    raise e3

    @classmethod
    async def close_mongo_connection(cls):
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed.")

    @classmethod
    def get_collection(cls, collection_name: str):
        if cls.db is None:
            raise RuntimeError("Database is not initialized. Call connect_to_mongo() first.")
        return cls.db[collection_name]

# Initialize database connection
async def init_db():
    await Database.connect_to_mongo()

# Close database connection
async def close_db():
    await Database.close_mongo_connection()

# Dependency to get database collection
def get_collection(collection_name: str):
    return Database.get_collection(collection_name) 