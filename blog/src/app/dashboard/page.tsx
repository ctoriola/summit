'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/blogService';
import { BlogPost } from '@/lib/types';

export const dynamic = 'force-dynamic';

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(postId);
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fff', fontFamily }}>
        <div className="text-xl font-semibold" style={{ color: '#0b3b61' }}>Loading posts...</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', fontFamily, minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: '#0b3b61' }}>Blog Dashboard</h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>Manage and publish your blog posts</p>
          </div>
          <Link
            href="/dashboard/new"
            className="px-8 py-3 rounded-lg font-semibold text-white transition"
            style={{ 
              backgroundColor: '#0b3b61',
              boxShadow: '0 4px 14px rgba(11, 59, 97, 0.2)',
              transform: 'translateY(0)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(11, 59, 97, 0.35)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(11, 59, 97, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            + New Post
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem' }}>
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-xl overflow-hidden transition"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transform: 'translateY(0)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Card Image */}
                {post.imageUrl && (
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden', backgroundColor: '#f3f4f6', position: 'relative' }}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold transition"
                      style={{
                        backgroundColor: post.published ? '#c39de6' : '#ffd24d',
                        color: post.published ? '#fff' : '#0b3b61',
                        boxShadow: post.published ? '0 2px 6px rgba(195, 157, 230, 0.3)' : '0 2px 6px rgba(255, 210, 77, 0.3)',
                      }}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                      {new Date(post.createdAt).toISOString().split('T')[0]}
                    </span>
                  </div>

                  <h3 className="font-bold mb-2 transition" style={{ color: '#0b3b61', fontSize: '1.25rem', lineHeight: '1.4' }}>
                    {post.title}
                  </h3>

                  <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #e5e7eb' }}>
                    <div>
                      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        By <span style={{ fontWeight: '600', color: '#0b3b61' }}>{post.author}</span>
                      </p>
                      <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{post.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/edit/${post.id}`}
                        className="px-4 py-2 rounded-lg font-semibold text-white transition"
                        style={{ 
                          backgroundColor: '#0b3b61',
                          boxShadow: '0 2px 6px rgba(11, 59, 97, 0.15)',
                          transform: 'translateY(0)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(11, 59, 97, 0.25)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(11, 59, 97, 0.15)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        disabled={deleting === post.id}
                        className="px-4 py-2 rounded-lg font-semibold transition"
                        style={{ 
                          backgroundColor: deleting === post.id ? '#f0f0f0' : '#f3f4f6',
                          color: deleting === post.id ? '#999' : '#dc2626',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                          transform: 'translateY(0)',
                          cursor: deleting === post.id ? 'not-allowed' : 'pointer',
                          opacity: deleting === post.id ? 0.6 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (deleting !== post.id) {
                            e.currentTarget.style.backgroundColor = '#fee2e2';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.2)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (deleting !== post.id) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                      >
                        {deleting === post.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-xl p-12 text-center transition"
            style={{
              backgroundColor: '#f9fafb',
              border: '2px dashed #d1d5db',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              No posts yet. Create your first blog post to get started!
            </p>
            <Link
              href="/dashboard/new"
              className="px-6 py-3 rounded-lg font-semibold text-white transition inline-block"
              style={{ 
                backgroundColor: '#0b3b61',
                boxShadow: '0 4px 14px rgba(11, 59, 97, 0.2)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(11, 59, 97, 0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(11, 59, 97, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Create First Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
