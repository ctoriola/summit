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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg opacity-90">
            Latest news, stories, and insights about cancer awareness and prevention
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="border-b pb-8 last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image */}
                  {post.imageUrl && (
                    <div className="md:col-span-1">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className={post.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="text-sm font-medium text-blue-600 capitalize">
                        {post.category}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold transition"
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
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
