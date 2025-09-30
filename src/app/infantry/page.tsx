"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };
type Attachment = { Name: string; Type: string; Description: string };

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
    { label: "Effective Range", value: "" },
    { label: "Maximum Range", value: "" },
  ]);

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const renderFields = (fields: InfoField[], setter: any) =>
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

  const renderList = (
    list: Attachment[],
    setter: React.Dispatch<React.SetStateAction<Attachment[]>>,
  ) => (
    <>
      {list.map((item, idx) => (
        <div key={idx} className="border rounded p-3 mb-3 relative bg-gray-900 border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-gray-200">{item.Name || `Attachment ${idx + 1}`}</div>
            <button
              type="button"
              onClick={() => setter(list.filter((_, i) => i !== idx))}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {["Name", "Type", "Description"].map((field) => (
              <div key={field}>
                <label className="block text-xs text-gray-300">{field}</label>
                <input
                  type="text"
                  value={item[field as keyof Attachment] || ""}
                  onChange={(e) => {
                    const copy = [...list];
                    copy[idx] = { ...copy[idx], [field]: e.target.value };
                    setter(copy);
                  }}
                  className="border rounded p-1 w-full bg-gray-800 text-gray-100 border-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setter([
            ...list,
            { Name: "", Type: "", Description: "" },
          ])
        }
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Add Attachment
      </button>
    </>
  );

  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      MECHANICS: Object.fromEntries(mechanics.map((i) => [i.label, i.value])),
      PERFORMANCES: Object.fromEntries(performances.map((i) => [i.label, i.value])),
      ATTACHMENTS: attachments,
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

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Attachments</h2>
        {renderList(attachments, setAttachments)}
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
