'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/blogService';
import { BlogPost } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPublishedPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter((post) => post.category === selectedCategory);

  const categories = ['all', ...new Set(posts.map((post) => post.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm text-gray-900 border-b border-gray-200 transition-shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center justify-between flex-1">
            <img src="/assets/img/logo.png" alt="Summit Medical Services Logo" className="h-20 w-auto" />
            <nav className="hidden md:flex flex-1 justify-center space-x-8 text-lg mx-8">
              <a href="/" className="hover:underline">Home</a>
              <a href="/blog" className="hover:underline font-semibold" style={{ color: '#1e3a8a' }}>Blog</a>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <a href="/appointment.html" className="hidden md:inline-block px-4 py-2 rounded-md font-semibold" style={{ backgroundColor: '#ffd24d', color: '#1e3a8a' }}>
              Book Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-12" style={{ background: 'linear-gradient(to right, #1e3a8a, #1e40af)', color: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-lg opacity-90">
            Latest news, stories, and insights about cancer awareness and prevention
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                selectedCategory === category
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              style={selectedCategory === category ? { backgroundColor: '#1e3a8a' } : {}}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="border-b pb-8 last:border-b-0 rounded-lg p-6 transition"
                style={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image */}
                  {post.imageUrl && (
                    <div className="md:col-span-1">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg transition"
                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x220?text=Blog';
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={post.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#c39de6', color: 'white' }}>
                        Published
                      </span>
                      <span className="text-sm" style={{ color: '#9ca3af' }}>
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="px-3 py-1 rounded text-xs font-semibold" style={{ backgroundColor: '#f3f4f6', color: '#1e3a8a' }}>
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                      <Link href={`/blog/${post.slug}`} className="hover:opacity-75 transition">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mb-4" style={{ color: '#6b7280' }}>
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm" style={{ color: '#6b7280' }}>
                        By <span style={{ fontWeight: '600', color: '#1e3a8a' }}>{post.author}</span>
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold transition hover:opacity-75"
                        style={{ color: '#1e3a8a' }}
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-lg" style={{ backgroundColor: '#f9fafb', border: '2px dashed #d1d5db' }}>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              {selectedCategory !== 'all'
                ? `No posts in the ${selectedCategory} category yet.`
                : 'No blog posts yet. Check back soon!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
