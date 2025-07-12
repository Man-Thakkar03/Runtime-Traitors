import { NextResponse } from 'next/server';
import { generateMockPosts, mockTrending } from '@/lib/mockDataServer';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;

    // Generate mock posts using our enhanced mock data
    const posts = generateMockPosts(limit, page);

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      posts,
      trending: mockTrending,
      hasMore: page < 8 // Increased to 8 pages for more scrolling content
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
