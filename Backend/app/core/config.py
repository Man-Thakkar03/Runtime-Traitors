from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # Application settings
    APP_NAME: str = "Runtime Traitors Backend"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "production"
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database
    MONGODB_URL: str
    DATABASE_NAME: str = "runtime_traitors"
    
    # Azure Blob Storage
    AZURE_STORAGE_ACCOUNT_NAME: str
    AZURE_STORAGE_ACCOUNT_KEY: str
    AZURE_STORAGE_CONTAINER: str = "uploads"
    
    # File upload settings
    MAX_UPLOAD_SIZE: int = 50 * 1024 * 1024  # 50MB
    
    # Rate limiting
    RATE_LIMIT: int = 60
    RATE_LIMIT_PER: int = 60  # seconds
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    
    @property
    def database_url(self) -> str:
        return f"{self.MONGODB_URL}/{self.DATABASE_NAME}?retryWrites=true&w=majority"

# Create settings instance
settings = Settings() 