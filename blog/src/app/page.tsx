import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Cancer Awareness Blog Dashboard</h1>
        <p className="text-xl mb-8 opacity-90">
          Create, manage, and share important health information
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/blog"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition border border-white"
          >
            View Blog
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
            <h3 className="text-xl font-bold mb-2">📝 Easy Management</h3>
            <p>Create and edit blog posts with a simple, intuitive dashboard</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
            <h3 className="text-xl font-bold mb-2">🖼️ Image Upload</h3>
            <p>Add featured images to your posts for better engagement</p>
          </div>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur">
            <h3 className="text-xl font-bold mb-2">📱 Responsive Design</h3>
            <p>Beautiful blog that works on all devices</p>
          </div>
        </div>
      </div>
    </main>
  );
}
