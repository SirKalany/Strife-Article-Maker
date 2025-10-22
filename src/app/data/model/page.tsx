"use client";

import React, { useState } from "react";

export default function ModelGenerator() {
  const [models, setModels] = useState([
    {
      id: "",
      name: "",
      slug: "",
      family: "",
      type: "",
      picture: "",
    },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...models];
    updated[index][field as keyof (typeof updated)[0]] = value;
    setModels(updated);
  };

  const addModel = () => {
    setModels([
      ...models,
      { id: "", name: "", slug: "", family: "", type: "", picture: "" },
    ]);
  };

  const removeModel = (index: number) => {
    setModels(models.filter((_, i) => i !== index));
  };

  const exportJSON = () => {
    const json = models.filter(
      (m) => m.id || m.name || m.slug || m.family || m.type || m.picture
    );
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "models.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-100 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Model Generator</h1>

      <section className="border border-gray-700 rounded p-4 bg-[#0f1720]">
        {models.map((model, i) => (
          <div
            key={i}
            className="border border-gray-700 rounded p-3 mb-3 bg-gray-900"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-200">
                Entry {i + 1}
              </span>
              <button
                onClick={() => removeModel(i)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["id", "name", "slug", "family", "type", "picture"].map(
                (field) => (
                  <div key={field}>
                    <label className="block text-xs text-gray-300 capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      value={(model as any)[field]}
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
          onClick={addModel}
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
