"use client";

import Link from "next/link";

export default function HomePage() {
  const contentPages = [
    "air",
    "ground",
    "naval",
    "infantry",
    "heavy",
    "family",
  ];
  const dataPages = ["family", "model"];

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Domain Selector
        </h1>

        {/* === Content Generators === */}
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-300">
            Content Generators
          </h2>
          <div className="flex flex-col space-y-3">
            {contentPages.map((page) => (
              <Link
                key={page}
                href={`/content/${page}`}
                className="px-8 py-3 bg-[#1f1f1f] text-gray-200 rounded-lg 
                           hover:bg-green-700 hover:text-white transition font-medium text-lg text-center"
              >
                {page.toUpperCase()}
              </Link>
            ))}
          </div>
        </section>

        {/* === Data Generators === */}
        <section className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-300">
            Data Generators
          </h2>
          <div className="flex flex-col space-y-3">
            {dataPages.map((page) => (
              <Link
                key={page}
                href={`/data/${page}`}
                className="px-8 py-3 bg-[#1f1f1f] text-gray-200 rounded-lg 
                           hover:bg-blue-700 hover:text-white transition font-medium text-lg text-center"
              >
                {page.toUpperCase()}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
