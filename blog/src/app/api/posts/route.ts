import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/blogService';

// Mark route as dynamic to prevent build-time evaluation
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category');
    let posts = await getPublishedPosts();

    if (category && category !== 'all') {
      posts = posts.filter((post) => post.category === category);
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch posts',
      },
      { status: 500 }
    );
  }
}
