import Link from "next/link";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 py-12 text-center sm:px-8">
      <div className="space-y-4">
        <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-gmg-gold-400 via-gmg-gold-500 to-gmg-gold-600 bg-clip-text text-transparent">404</h1>
        <p className="text-2xl font-bold text-gmg-white-50">Page Not Found</p>
        <p className="max-w-2xl text-lg text-gmg-white-300">
          We could not find the page you are looking for. Let&apos;s get you back to shopping.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg">Back to Home</Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="secondary">Browse Products</Button>
        </Link>
      </div>
    </main>
  );
}
