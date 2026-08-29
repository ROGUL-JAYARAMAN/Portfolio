import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] dark:bg-[#0c0a09] text-[#0c0a09] dark:text-white">
      <div className="text-center">
        <h2 className="text-2xl font-display">404 — Not Found</h2>
        <p className="mt-2 text-[#777169]">The page you requested does not exist.</p>
        <Link href="/" className="mt-6 inline-flex bg-[#0c0a09] dark:bg-white text-white dark:text-[#0c0a09] rounded-full px-6 py-2 text-sm">Go Home</Link>
      </div>
    </div>
  );
}
