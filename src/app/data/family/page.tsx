"use client";

import React, { useState } from "react";

export default function VariantGenerator() {
  const [variants, setVariants] = useState([
    {
      id: "",
      name: "",
      slug: "",
      type: "",
      picture: "",
      caption: "",
    },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...variants];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: "", name: "", slug: "", type: "", picture: "", caption: "" },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const exportJSON = () => {
    const json = variants.filter(
      (v) => v.id || v.name || v.slug || v.type || v.picture || v.caption
    );
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "variants.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-100 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Variant Generator</h1>

      <section className="border border-gray-700 rounded p-4 bg-[#0f1720]">
        {variants.map((variant, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded p-3 mb-3 bg-gray-900"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-200">
                Entry {i + 1}
              </span>
              <button
                onClick={() => removeVariant(i)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["id", "name", "slug", "type", "picture", "caption"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-xs text-gray-300 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      value={(variant as any)[field]}
                      onChange={(e) => handleChange(i, field, e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded p-1 text-gray-100"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addVariant}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Add Entry
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
