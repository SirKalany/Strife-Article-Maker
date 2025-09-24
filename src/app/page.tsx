"use client";

import Link from "next/link";

export default function HomePage() {
  const domains = ["air", "ground", "naval", "infantry", "heavy"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Domain Selector
        </h1>

        <div className="flex flex-col space-y-4">
          {domains.map((domain) => (
            <Link
              key={domain}
              href={`/${domain}`}
              className="px-8 py-3 bg-[#1f1f1f] text-gray-200 rounded-lg 
                         hover:bg-green-700 hover:text-white transition font-medium text-lg text-center"
            >
              {domain.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
