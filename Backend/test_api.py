#!/usr/bin/env python3
"""
Simple API Test Script
Tests the main endpoints to ensure they're working correctly
"""

import asyncio
import aiohttp
import json

BASE_URL = "http://localhost:8000"

async def test_health():
    """Test health endpoint"""
    async with aiohttp.ClientSession() as session:
        async with session.get(f"{BASE_URL}/api/v1/health") as response:
            print(f"Health Check: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Health: {data.get('message', 'OK')}")

async def test_auth():
    """Test authentication endpoints"""
    async with aiohttp.ClientSession() as session:
        # Test login
        login_data = {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        
        async with session.post(
            f"{BASE_URL}/api/v1/auth/login",
            json=login_data
        ) as response:
            print(f"Login: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Login successful: {data.get('message')}")
                return data.get('data', {}).get('access_token')
            else:
                error_data = await response.json()
                print(f"❌ Login failed: {error_data}")
                return None

async def test_questions():
    """Test questions endpoints"""
    async with aiohttp.ClientSession() as session:
        # Test get questions
        async with session.get(f"{BASE_URL}/api/v1/questions/?limit=5") as response:
            print(f"Get Questions: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Questions: {len(data.get('data', {}).get('items', []))} questions found")
            else:
                print(f"❌ Get questions failed: {response.status}")

async def test_tags():
    """Test tags endpoints"""
    async with aiohttp.ClientSession() as session:
        # Test get tags
        async with session.get(f"{BASE_URL}/api/v1/tags/?limit=5") as response:
            print(f"Get Tags: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Tags: {len(data.get('data', {}).get('items', []))} tags found")
            else:
                print(f"❌ Get tags failed: {response.status}")

async def test_search():
    """Test search endpoint"""
    async with aiohttp.ClientSession() as session:
        # Test search
        async with session.get(f"{BASE_URL}/api/v1/search/?q=fastapi&limit=5") as response:
            print(f"Search: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Search: {len(data.get('data', {}).get('items', []))} results found")
            else:
                print(f"❌ Search failed: {response.status}")

async def test_authenticated_endpoints(token):
    """Test authenticated endpoints"""
    if not token:
        print("❌ No token available for authenticated tests")
        return
    
    headers = {"Authorization": f"Bearer {token}"}
    
    async with aiohttp.ClientSession() as session:
        # Test get current user
        async with session.get(f"{BASE_URL}/api/v1/users/me", headers=headers) as response:
            print(f"Get Current User: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Current User: {data.get('data', {}).get('first_name')} {data.get('data', {}).get('last_name')}")
            else:
                print(f"❌ Get current user failed: {response.status}")

        # Test get notifications
        async with session.get(f"{BASE_URL}/api/v1/notifications/?limit=5", headers=headers) as response:
            print(f"Get Notifications: {response.status}")
            if response.status == 200:
                data = await response.json()
                print(f"✅ Notifications: {len(data.get('data', {}).get('items', []))} notifications found")
            else:
                print(f"❌ Get notifications failed: {response.status}")

async def main():
    """Run all tests"""
    print("🚀 Starting API Tests...")
    print("=" * 50)
    
    # Test health
    await test_health()
    print()
    
    # Test questions
    await test_questions()
    print()
    
    # Test tags
    await test_tags()
    print()
    
    # Test search
    await test_search()
    print()
    
    # Test auth
    token = await test_auth()
    print()
    
    # Test authenticated endpoints
    await test_authenticated_endpoints(token)
    print()
    
    print("=" * 50)
    print("✅ API Tests Completed!")

if __name__ == "__main__":
    asyncio.run(main()) 