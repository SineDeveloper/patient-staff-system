import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Patient Real-time Form System
      </h1>

      <div className="flex gap-4">
        <Link
          href="/patient"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Patient
        </Link>

        <Link
          href="/staff"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Go to Staff
        </Link>
      </div>
    </main>
  )
}
