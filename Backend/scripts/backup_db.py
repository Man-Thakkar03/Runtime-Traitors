import asyncio
import sys
import os
from pathlib import Path
from datetime import datetime
import subprocess
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

# Configuration
BACKUP_DIR = Path("backups")
TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
BACKUP_FILENAME = f"backup_{TIMESTAMP}.gz"
BACKUP_PATH = BACKUP_DIR / BACKUP_FILENAME

# Create backups directory if it doesn't exist
BACKUP_DIR.mkdir(exist_ok=True, parents=True)

async def backup_mongodb():
    """Backup MongoDB database using mongodump"""
    mongodb_uri = os.getenv("MONGODB_URL")
    if not mongodb_uri:
        print("Error: MONGODB_URL not found in environment variables")
        return False
    
    # Extract database name from URI or use default
    db_name = os.getenv("DATABASE_NAME", "runtime_traitors")
    
    try:
        # Build the mongodump command
        cmd = [
            "mongodump",
            "--uri", mongodb_uri,
            "--db", db_name,
            "--archive",
            "--gzip"
        ]
        
        # Execute the command and write output to file
        with open(BACKUP_PATH, "wb") as f:
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=f,
                stderr=asyncio.subprocess.PIPE
            )
            
            # Wait for the process to complete
            _, stderr = await process.communicate()
            
            if process.returncode != 0:
                print(f"Error during backup: {stderr.decode()}")
                return False
            
            print(f"Backup created successfully: {BACKUP_PATH}")
            return True
            
    except Exception as e:
        print(f"Error during backup: {str(e)}")
        return False

async def cleanup_old_backups(max_backups=5):
    """Remove old backup files, keeping only the most recent ones"""
    try:
        # Get all backup files
        backups = sorted(BACKUP_DIR.glob("backup_*.gz"), key=os.path.getmtime)
        
        # Remove old backups if we have more than max_backups
        if len(backups) > max_backups:
            for backup in backups[:-max_backups]:
                backup.unlink()
                print(f"Removed old backup: {backup}")
                
    except Exception as e:
        print(f"Error during backup cleanup: {str(e)}")

async def main():
    """Main function to run the backup"""
    print(f"Starting database backup at {datetime.now().isoformat()}")
    
    # Run the backup
    success = await backup_mongodb()
    
    # Clean up old backups if this one was successful
    if success:
        await cleanup_old_backups()
    
    print(f"Backup process completed at {datetime.now().isoformat()}")

if __name__ == "__main__":
    asyncio.run(main()) 