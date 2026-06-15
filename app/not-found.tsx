import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6 py-12 text-center bg-white">
      <div className="space-y-4">
        <h1 className="text-8xl md:text-9xl font-black text-[#F5C400]">404</h1>
        <p className="text-2xl font-bold text-gray-900">Page Not Found</p>
        <p className="max-w-md text-gray-500">
          We couldn&apos;t find the page you&apos;re looking for. Let&apos;s get you back to shopping.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="btn-yellow px-8 py-3.5 rounded-xl text-base font-black"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="btn-outline px-8 py-3.5 rounded-xl text-base"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
