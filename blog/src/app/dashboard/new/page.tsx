'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/blogService';
import Link from 'next/link';

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    imageUrl: '',
    published: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPost({
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        imageUrl: formData.imageUrl,
        published: formData.published,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error creating post. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', fontFamily, minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center font-semibold mb-8 transition hover:opacity-75"
          style={{ color: '#0b3b61' }}
        >
          ← Back to Dashboard
        </Link>

        {/* Main Card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
          }}
        >
          {/* Header */}
          <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderBottom: '1px solid #e5e7eb' }}>
            <h1 className="text-3xl font-bold" style={{ color: '#0b3b61', marginBottom: '0.5rem' }}>
              Create New Post
            </h1>
            <p style={{ color: '#6b7280' }}>Fill in the details below to create a new blog post</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8" style={{ display: 'grid', gap: '2rem' }}>
            {/* Title & Slug - Two Column */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#e5e7eb',
                    color: '#0b3b61',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    focusRing: '#0b3b61'
                  }}
                  placeholder="Your post title"
                />
              </div>
              <div>
                <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                  Slug (URL)
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#e5e7eb',
                    color: '#0b3b61',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb'
                  }}
                  placeholder="auto-slug"
                />
              </div>
            </div>

            {/* Author & Category - Two Column */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#e5e7eb',
                    color: '#0b3b61',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb'
                  }}
                  placeholder="Author name"
                />
              </div>
              <div>
                <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                  style={{ 
                    borderColor: '#e5e7eb',
                    color: '#0b3b61',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <option value="">Select a category</option>
                  <option value="awareness">Awareness</option>
                  <option value="treatment">Treatment</option>
                  <option value="prevention">Prevention</option>
                  <option value="resources">Resources</option>
                  <option value="news">News</option>
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                Excerpt (Preview) *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                rows={2}
                className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#e5e7eb',
                  color: '#0b3b61',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb'
                }}
                placeholder="Short summary of your post"
              />
            </div>

            {/* Content */}
            <div>
              <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2 font-mono"
                style={{ 
                  borderColor: '#e5e7eb',
                  color: '#0b3b61',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.875rem'
                }}
                placeholder="Write your blog post content here... (Supports HTML)"
              />
            </div>

            {/* Featured Image URL */}
            <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
              <label style={{ color: '#0b3b61', fontWeight: '600', marginBottom: '0.5rem', display: 'block', fontSize: '0.95rem' }}>
                Featured Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg transition focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#e5e7eb',
                  color: '#0b3b61',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb'
                }}
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <div style={{ marginTop: '1rem' }}>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="rounded-lg" 
                    style={{
                      width: '100%',
                      maxHeight: '300px',
                      objectFit: 'cover',
                      border: '1px solid #e5e7eb'
                    }} 
                    onError={() => alert('Invalid image URL')} 
                  />
                </div>
              )}
            </div>

            {/* Publish Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
                style={{ accentColor: '#0b3b61', cursor: 'pointer' }}
              />
              <label style={{ color: '#0b3b61', fontWeight: '600', marginLeft: '0.75rem', cursor: 'pointer' }}>
                Publish immediately
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg font-semibold text-white transition hover:shadow-lg"
                style={{ 
                  backgroundColor: '#0b3b61',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-md"
                style={{ 
                  backgroundColor: '#f3f4f6',
                  color: '#0b3b61',
                  border: '1px solid #e5e7eb'
                }}
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
