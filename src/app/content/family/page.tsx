"use client";

import React, { useState } from "react";

export default function ArticleGenerator() {
  const [kind, setKind] = useState("family");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [variants, setVariants] = useState([
    { slug: "", type: "", name: "", description: "" },
  ]);

  const handleVariantChange = (index: number, field: string, value: string) => {
    const updated = [...variants];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { slug: "", type: "", name: "", description: "" },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const exportJSON = () => {
    const json = {
      kind,
      title,
      description,
      history,
      variants: variants.filter(
        (v) => v.slug || v.type || v.name || v.description
      ),
    };

    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "article"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-100 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">Content Family Generator</h1>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm mb-1">Kind</label>
          <input
            type="text"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">History</label>
          <textarea
            value={history}
            onChange={(e) => setHistory(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100"
            rows={3}
          />
        </div>
      </div>

      {/* Variants Section */}
      <section className="border border-gray-700 rounded p-4 bg-[#0f1720]">
        <h2 className="text-lg font-semibold mb-3 text-yellow-400">Variants</h2>
        {variants.map((variant, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded p-3 mb-3 bg-gray-900"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-200">
                Variant {i + 1}
              </span>
              <button
                onClick={() => removeVariant(i)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["slug", "type", "name", "description"].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-300 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    value={(variant as any)[field]}
                    onChange={(e) =>
                      handleVariantChange(i, field, e.target.value)
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-gray-100"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={addVariant}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Add Variant
        </button>
      </section>

      <div className="text-center">
        <button
          onClick={exportJSON}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
