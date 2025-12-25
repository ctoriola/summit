import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Hero Section */}
      <div className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#1e3a8a' }}>
            Cancer Awareness Blog Dashboard
          </h1>
          <p className="text-xl mb-12" style={{ color: '#6b7280' }}>
            Create, manage, and share important health information
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-lg"
              style={{ backgroundColor: '#ffd24d', color: '#1e3a8a' }}
            >
              Go to Dashboard
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 rounded-lg font-semibold transition hover:shadow-lg border-2"
              style={{ borderColor: '#1e3a8a', color: '#1e3a8a', backgroundColor: 'white' }}
            >
              View Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#1e3a8a' }}>
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div 
              className="p-8 rounded-lg transition hover:shadow-xl"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                Easy Management
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Create and edit blog posts with a simple, intuitive dashboard
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="p-8 rounded-lg transition hover:shadow-xl"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                Image Upload
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Add featured images to your posts for better engagement
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="p-8 rounded-lg transition hover:shadow-xl"
              style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1e3a8a' }}>
                Responsive Design
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Beautiful blog that works on all devices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16" style={{ backgroundColor: '#f9fafb' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div 
            className="p-12 rounded-lg"
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1e3a8a' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#6b7280' }}>
              Access your blog dashboard to create and manage your posts
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-10 py-4 rounded-lg font-bold text-lg transition hover:shadow-lg"
              style={{ backgroundColor: '#ffd24d', color: '#1e3a8a' }}
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 Cancer Awareness Blog. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
