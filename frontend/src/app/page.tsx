// app/page.tsx
import { Metadata } from "next";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Home Page | My Next.js App",
  description: "Welcome to my Next.js application",
};

// Example async data fetching function
async function getData() {
  // Simulated API call
  return {
    message: "Hello from Next.js!",
    timestamp: new Date().toISOString(),
  };
}

// Main page component
export default async function HomePage() {
  const data = await getData();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Header section */}
      <header className="mb-8">
        <h1 className="text-8xl font-bold text-center">
          Welcome to My Next.js App
        </h1>
        <p className="text-gray-600 mt-2">{data.message}</p>
        <p className="text-sm text-blue-500">Timestamp: {data.timestamp}</p>
      </header>

      {/* Text content */}
      <section className="mb-8">
        <p className="text-lg">
          This is a simple text-based page built with Next.js.
        </p>
        <p className="text-lg mt-2">
          It demonstrates basic text rendering and server-side data fetching.
        </p>
      </section>

      {/* Footer text */}
      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} My Next.js App. All rights reserved.
      </footer>
    </main>
  );
}
