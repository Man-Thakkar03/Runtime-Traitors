import asyncio
import sys
import os
from pathlib import Path
import subprocess
from dotenv import load_dotenv

# Add the project root to the Python path
sys.path.append(str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

# Configuration
BACKUP_DIR = Path("backups")

async def list_backups():
    """List all available backups"""
    backups = sorted(BACKUP_DIR.glob("backup_*.gz"), key=os.path.getmtime, reverse=True)
    
    if not backups:
        print("No backup files found in the 'backups' directory.")
        return None
    
    print("\nAvailable backups:")
    for i, backup in enumerate(backups, 1):
        print(f"{i}. {backup.name} ({backup.stat().st_size / (1024 * 1024):.2f} MB)")
    
    return backups

def select_backup(backups):
    """Prompt user to select a backup"""
    while True:
        try:
            choice = input("\nSelect a backup to restore (or 'q' to quit): ")
            if choice.lower() == 'q':
                return None
                
            choice_idx = int(choice) - 1
            if 0 <= choice_idx < len(backups):
                return backups[choice_idx]
            print("Invalid selection. Please try again.")
        except ValueError:
            print("Please enter a valid number.")

async def restore_mongodb(backup_path):
    """Restore MongoDB database from a backup"""
    mongodb_uri = os.getenv("MONGODB_URL")
    if not mongodb_uri:
        print("Error: MONGODB_URL not found in environment variables")
        return False
    
    # Extract database name from URI or use default
    db_name = os.getenv("DATABASE_NAME", "runtime_traitors")
    
    # Ask for confirmation
    confirm = input(f"\nWARNING: This will overwrite the '{db_name}' database. Continue? (y/N): ")
    if confirm.lower() != 'y':
        print("Restore cancelled.")
        return False
    
    try:
        # Build the mongorestore command
        cmd = [
            "mongorestore",
            "--uri", mongodb_uri,
            "--db", db_name,
            "--archive",
            "--gzip",
            "--drop"  # Drop the database before restoring
        ]
        
        # Execute the command with input from the backup file
        with open(backup_path, "rb") as f:
            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdin=f,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            # Wait for the process to complete
            stdout, stderr = await process.communicate()
            
            if process.returncode != 0:
                print(f"Error during restore: {stderr.decode()}")
                return False
            
            print("\nDatabase restored successfully!")
            return True
            
    except Exception as e:
        print(f"Error during restore: {str(e)}")
        return False

async def main():
    """Main function to run the restore"""
    print("Database Restore Utility")
    print("=======================")
    
    # List available backups
    backups = await list_backups()
    if not backups:
        return
    
    # Let user select a backup
    selected_backup = select_backup(backups)
    if not selected_backup:
        return
    
    print(f"\nSelected backup: {selected_backup.name}")
    
    # Perform the restore
    await restore_mongodb(selected_backup)

if __name__ == "__main__":
    asyncio.run(main()) 