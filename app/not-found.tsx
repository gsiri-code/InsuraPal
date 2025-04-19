'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold">InsuraPalmain</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-indigo-600 text-7xl font-bold">404</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="pt-4">
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} InsuraPalmain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
