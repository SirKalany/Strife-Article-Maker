"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };

export default function InfantryForm() {
  const [infos, setInfos] = useState<InfoField[]>([
    { label: "Name", value: "" },
    { label: "Type", value: "" },
    { label: "Manufacturer", value: "" },
    { label: "Design Period", value: "" },
    { label: "Manufacturing Period", value: "" },
    { label: "Service Period", value: "" },
  ]);

  const [dimensions, setDimensions] = useState<InfoField[]>([
    { label: "Length", value: "" },
    { label: "Mass", value: "" },
    { label: "Barrel Length", value: "" },
  ]);

  const [mechanics, setMechanics] = useState<InfoField[]>([
    { label: "Action", value: "" },
    { label: "Feed System", value: "" },
  ]);

  const [performances, setPerformances] = useState<InfoField[]>([
    { label: "Calibre", value: "" },
    { label: "Rate of Fire", value: "" },
    { label: "Muzzle Velocity", value: "" },
    { label: "Firing Range", value: "" },
  ]);

  const renderFields = (fields: InfoField[], setter: any) =>
    fields.map((field, idx) => (
      <div key={idx} className="mb-2">
        <label className="block font-medium text-sm text-gray-200">
          {field.label}
        </label>
        <input
          type="text"
          value={field.value}
          onChange={(e) => {
            const copy = [...fields];
            copy[idx] = { ...copy[idx], value: e.target.value };
            setter(copy);
          }}
          className="border rounded p-2 w-full bg-gray-900 text-gray-100 border-gray-700"
        />
      </div>
    ));

  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      MECHANICS: Object.fromEntries(mechanics.map((i) => [i.label, i.value])),
      PERFORMANCES: Object.fromEntries(
        performances.map((i) => [i.label, i.value])
      ),
    };
    console.log(JSON.stringify(json, null, 2));
    alert("JSON printed to console (and copied to clipboard when possible).");
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Infantry Form</h1>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        {renderFields(infos, setInfos)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
        {renderFields(dimensions, setDimensions)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Mechanics</h2>
        {renderFields(mechanics, setMechanics)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Performances</h2>
        {renderFields(performances, setPerformances)}
      </section>

      <div className="text-center mt-6">
        <button
          type="button"
          onClick={exportJSON}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}
