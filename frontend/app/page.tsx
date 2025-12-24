import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Favorite Shortlist
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A modern full-stack application built with Next.js and NestJS
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/users"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Users
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-200"
            >
              API Documentation
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Next.js 16
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Latest Next.js with App Router for optimal performance and
              developer experience
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tailwind CSS
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Beautiful, responsive UI with utility-first CSS framework
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              NestJS Backend
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Powerful TypeScript backend with PostgreSQL database
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Frontend
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ Next.js 16 (App Router)</li>
                <li>✓ React 19</li>
                <li>✓ TypeScript</li>
                <li>✓ Tailwind CSS 4</li>
                <li>✓ Docker Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Backend
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ NestJS</li>
                <li>✓ TypeORM</li>
                <li>✓ PostgreSQL 18</li>
                <li>✓ Swagger API Docs</li>
                <li>✓ Docker Compose</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-600 dark:text-gray-400">
          <p>Built with ❤️ using modern web technologies</p>
        </footer>
      </main>
    </div>
  );
}
