"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };

type Ammunition = {
  Name: string;
  Type: string;
  Velocity?: string;
  Penetration?: string;
  Mass?: string;
  "Explosive Mass"?: string;
  "TNT Equivalent"?: string;
};

export default function HeavyForm() {
  // === Fixed blocks ===
  const [infos, setInfos] = useState<InfoField[]>([
    { label: "Name", value: "MT-12" },
    { label: "Type", value: "Anti-tank gun" },
    { label: "Manufacturer", value: "Yurga Machine-Building Plant" },
    { label: "Design Period", value: "1970" },
    { label: "Manufacturing Period", value: "1970 - Today" },
    { label: "Service Period", value: "1970 - Present" },
  ]);

  const [dimensions, setDimensions] = useState<InfoField[]>([
    { label: "Length", value: "9,65 m" },
    { label: "Barrel Length", value: "6.3 m" },
    { label: "Calibre", value: "100 x 910 mmR" },
    { label: "Width", value: "2,32 m" },
    { label: "Height", value: "1,6 m" },
    { label: "Mass", value: "3,72 kg" },
    { label: "Crew", value: "7" },
  ]);

  const [performances, setPerformances] = useState<InfoField[]>([
    { label: "Elevation", value: "-6° to +20°" },
    { label: "Traverse", value: "27° left and right" },
    { label: "Rate of Fire", value: "6-14 rpm" },
    { label: "Muzzle Velocity", value: "700 - 1,575 m/s" },
    { label: "Maximum Range", value: "3,000 m Direct, 8,2000 Indirect" },
  ]);

  // === Modular block ===
  const [ammunitions, setAmmunitions] = useState<Ammunition[]>([
    {
      Name: "3BM-2",
      Type: "APFSDS-T Tungsten",
      Velocity: "1,575 m/s",
      Penetration: "230 mm at 500 m",
      Mass: "19.34 kg",
      "Explosive Mass": "N/A",
      "TNT Equivalent": "N/A",
    },
  ]);

  // === Helpers (typed) ===
  const renderFields = (
    fields: InfoField[],
    setter: React.Dispatch<React.SetStateAction<InfoField[]>>
  ) =>
    fields.map((field, idx) => (
      <div key={idx} className="mb-2">
        <label className="block font-medium text-sm text-gray-200">{field.label}</label>
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

  const renderAmmos = (
    list: Ammunition[],
    setter: React.Dispatch<React.SetStateAction<Ammunition[]>>
  ) => (
    <>
      {list.map((ammo, idx) => (
        <div key={idx} className="border rounded p-3 mb-3 relative bg-gray-900 border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-gray-200">{ammo.Name || `Ammunition ${idx + 1}`}</div>
            <button
              type="button"
              onClick={() => setter(list.filter((_, i) => i !== idx))}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-300">Name</label>
              <input
                type="text"
                value={ammo.Name || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], Name: e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300">Type</label>
              <input
                type="text"
                value={ammo.Type || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], Type: e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300">Velocity</label>
              <input
                type="text"
                value={ammo.Velocity || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], Velocity: e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300">Penetration</label>
              <input
                type="text"
                value={ammo.Penetration || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], Penetration: e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300">Mass</label>
              <input
                type="text"
                value={ammo.Mass || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], Mass: e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-300">Explosive Mass</label>
              <input
                type="text"
                value={ammo["Explosive Mass"] || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], "Explosive Mass": e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-gray-300">TNT Equivalent</label>
              <input
                type="text"
                value={ammo["TNT Equivalent"] || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx] = { ...copy[idx], "TNT Equivalent": e.target.value };
                  setter(copy);
                }}
                className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setter([
            ...list,
            {
              Name: "",
              Type: "",
              Velocity: "",
              Penetration: "",
              Mass: "",
              "Explosive Mass": "",
              "TNT Equivalent": "",
            },
          ])
        }
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Add Ammunition
      </button>
    </>
  );

  // === Export JSON ===
  const exportJSON = (): void => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      PERFORMANCES: Object.fromEntries(performances.map((i) => [i.label, i.value])),
      "AVAILABLE AMMUNITION": ammunitions,
    };
    const out = JSON.stringify(json, null, 2);
    console.log(out);
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(out).catch(() => {});
    }
    alert("JSON printed to console (and copied to clipboard when possible).");
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Heavy / Towed & Artillery Form</h1>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        {renderFields(infos, setInfos)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
        {renderFields(dimensions, setDimensions)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Performances</h2>
        {renderFields(performances, setPerformances)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Available Ammunition</h2>
        {renderAmmos(ammunitions, setAmmunitions)}
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
