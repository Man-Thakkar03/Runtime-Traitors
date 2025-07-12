import os
from datetime import datetime, timedelta
from typing import Optional, BinaryIO, Dict, Any
from azure.storage.blob import BlobServiceClient, BlobSasPermissions, generate_blob_sas
from azure.core.exceptions import ResourceExistsError, ResourceNotFoundError
from app.core.config import settings

class AzureBlobStorage:
    def __init__(self):
        self.connection_string = (
            f"DefaultEndpointsProtocol=https;"
            f"AccountName={settings.AZURE_STORAGE_ACCOUNT_NAME};"
            f"AccountKey={settings.AZURE_STORAGE_ACCOUNT_KEY};"
            f"EndpointSuffix=core.windows.net"
        )
        self.container_name = settings.AZURE_STORAGE_CONTAINER
        self.blob_service_client = BlobServiceClient.from_connection_string(self.connection_string)
        self.container_client = self.blob_service_client.get_container_client(self.container_name)
        
        # Create container if it doesn't exist
        try:
            self.container_client.create_container()
        except ResourceExistsError:
            pass

    async def upload_file(
        self,
        file_data: BinaryIO,
        filename: str,
        content_type: str,
        folder: Optional[str] = None,
        metadata: Optional[Dict[str, str]] = None
    ) -> Dict[str, Any]:
        """
        Upload a file to Azure Blob Storage
        """
        # Generate a unique filename to avoid collisions
        file_extension = os.path.splitext(filename)[1].lower()
        unique_filename = f"{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{os.urandom(4).hex()}{file_extension}"
        
        # Construct the blob path
        if folder:
            blob_path = f"{folder}/{unique_filename}"
        else:
            blob_path = unique_filename
        
        # Upload the file
        blob_client = self.container_client.get_blob_client(blob_path)
        
        # Set content type and metadata
        blob_metadata = metadata or {}
        blob_metadata.update({
            "original_filename": filename,
            "content_type": content_type,
            "uploaded_at": datetime.utcnow().isoformat()
        })
        
        # Upload the file
        file_data.seek(0)
        blob_client.upload_blob(
            file_data,
            content_type=content_type,
            metadata=blob_metadata,
            overwrite=True
        )
        
        # Generate a SAS URL for the uploaded file (valid for 7 days)
        sas_token = generate_blob_sas(
            account_name=settings.AZURE_STORAGE_ACCOUNT_NAME,
            account_key=settings.AZURE_STORAGE_ACCOUNT_KEY,
            container_name=self.container_name,
            blob_name=blob_path,
            permission=BlobSasPermissions(read=True),
            expiry=datetime.utcnow() + timedelta(days=7)
        )
        
        # Construct the URL
        blob_url = f"https://{settings.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{self.container_name}/{blob_path}?{sas_token}"
        
        return {
            "file_id": blob_path,
            "filename": unique_filename,
            "original_filename": filename,
            "url": blob_url,
            "content_type": content_type,
            "size": file_data.tell(),
            "folder": folder,
            "metadata": blob_metadata
        }

    async def delete_file(self, file_id: str) -> bool:
        """
        Delete a file from Azure Blob Storage
        """
        try:
            blob_client = self.container_client.get_blob_client(file_id)
            blob_client.delete_blob()
            return True
        except ResourceNotFoundError:
            return False

    async def get_file_info(self, file_id: str) -> Optional[Dict[str, Any]]:
        """
        Get information about a file
        """
        try:
            blob_client = self.container_client.get_blob_client(file_id)
            properties = blob_client.get_blob_properties()
            
            # Generate a SAS URL for the file (valid for 1 hour)
            sas_token = generate_blob_sas(
                account_name=settings.AZURE_STORAGE_ACCOUNT_NAME,
                account_key=settings.AZURE_STORAGE_ACCOUNT_KEY,
                container_name=self.container_name,
                blob_name=file_id,
                permission=BlobSasPermissions(read=True),
                expiry=datetime.utcnow() + timedelta(hours=1)
            )
            
            return {
                "file_id": file_id,
                "filename": os.path.basename(file_id),
                "original_filename": properties.metadata.get("original_filename", ""),
                "url": f"https://{settings.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{self.container_name}/{file_id}?{sas_token}",
                "content_type": properties.content_settings.content_type,
                "size": properties.size,
                "created_at": properties.creation_time.isoformat() if properties.creation_time else None,
                "last_modified": properties.last_modified.isoformat() if properties.last_modified else None,
                "metadata": dict(properties.metadata)
            }
        except ResourceNotFoundError:
            return None

# Create a singleton instance
storage = AzureBlobStorage() 