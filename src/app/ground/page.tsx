"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };
type Sensor = { Name: string; Type: string; Purpose: string };
type Armament = {
  Name: string;
  Catagory: string;
  Mount?: string;
  Ammunition: string;
  "Rate of Fire": string;
  "Vertical Guidance"?: string;
  "Horizontal Guidance"?: string;
};
type Ammunition = {
  Name: string;
  Type: string;
  Caliber: string;
};

export default function AdminForm() {
  // === State for each block ===
  const [infos, setInfos] = useState<InfoField[]>([
    { label: "Name", value: "" },
    { label: "Type", value: "" },
    { label: "Manufacturer", value: "" },
    { label: "Design Period", value: "" },
    { label: "Manufacturing Period", value: "" },
    { label: "Service Period", value: "" },
  ]);

  const [dimensions, setDimensions] = useState<InfoField[]>([
    { label: "Mass", value: "" },
    { label: "Crew", value: "" },
    { label: "Ground Clearance", value: "" },
    { label: "Ground Pressure", value: "" },
    { label: "Length", value: "" },
    { label: "Barrel Overhang", value: "" },
    { label: "Width", value: "" },
    { label: "Height", value: "" },
  ]);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [armaments, setArmaments] = useState<Armament[]>([]);
  const [ammunitions, setAmmunitions] = useState<Ammunition[]>([]);
  const [protection, setProtection] = useState<InfoField[]>([
    { label: "Armor", value: "" },
    { label: "Appliqué Armor", value: "" },
    { label: "Passive Protection Devices", value: "" },
    { label: "Active Protection Devices", value: "" },
  ]);
  const [automotive, setAutomotive] = useState<InfoField[]>([
    { label: "Engine", value: "" },
    { label: "Horsepower", value: "" },
    { label: "Power/Weight Ratio", value: "" },
    { label: "Transmission", value: "" },
    { label: "Gearbox", value: "" },
    { label: "Suspension", value: "" },
    { label: "Fuel Type", value: "" },
    { label: "Fuel Capacity", value: "" },
  ]);
  const [performances, setPerformances] = useState<InfoField[]>([
    { label: "Operational Range", value: "" },
    { label: "On Road Speed", value: "" },
    { label: "Cross-Country Speed", value: "" },
    { label: "Amphibious", value: "" },
  ]);

  // === Render Helpers ===
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
            copy[idx].value = e.target.value;
            setter(copy);
          }}
          className="border rounded p-2 w-full bg-gray-900 text-gray-100 border-gray-700"
        />
      </div>
    ));

  const renderList = (
    list: any[],
    setter: any,
    fields: string[],
    emptyTemplate: any,
    title: string
  ) => {
    const baseLabel = title.endsWith("s") ? title.slice(0, -1) : title;

    return (
      <>
        {list.map((item, idx) => (
          <div
            key={idx}
            className="border rounded p-3 mb-3 relative bg-gray-900 border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-gray-200">
                {item.Name || `${baseLabel} ${idx + 1}`}
              </div>
              <button
                type="button"
                onClick={() => setter(list.filter((_, i) => i !== idx))}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-300">{field}</label>
                  <input
                    type="text"
                    value={item[field] || ""}
                    onChange={(e) => {
                      const copy = [...list];
                      copy[idx][field] = e.target.value;
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
          onClick={() => setter([...list, emptyTemplate])}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Add {baseLabel}
        </button>
      </>
    );
  };

  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      SENSORS: sensors,
      ARMAMENT: armaments,
      "AVAILABLE AMMUNITION": ammunitions,
      PROTECTION: Object.fromEntries(protection.map((i) => [i.label, i.value])),
      AUTOMOTIVE: Object.fromEntries(automotive.map((i) => [i.label, i.value])),
      PERFORMANCES: Object.fromEntries(
        performances.map((i) => [i.label, i.value])
      ),
    };
    console.log(JSON.stringify(json, null, 2));
    alert("Check console for JSON output!");
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Ground Form</h1>

      {/* Blocks */}
      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        {renderFields(infos, setInfos)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
        {renderFields(dimensions, setDimensions)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Sensors & Electronics</h2>
        {renderList(
          sensors,
          setSensors,
          ["Name", "Type", "Purpose"],
          { Name: "", Type: "", Purpose: "" },
          "Sensors"
        )}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Armaments</h2>
        {renderList(
          armaments,
          setArmaments,
          [
            "Name",
            "Category",
            "Mount",
            "Ammunition",
            "Rate of Fire",
            "Vertical Guidance",
            "Horizontal Guidance",
          ],
          {
            Name: "",
            Category: "",
            Mount: "",
            Ammunition: "",
            "Rate of Fire": "",
            "Vertical Guidance": "",
            "Horizontal Guidance": "",
          },
          "Armaments"
        )}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Available Ammunition</h2>
        {renderList(
          ammunitions,
          setAmmunitions,
          [
            "Name",
            "Type",
            "Caliber",
          ],
          {
            Name: "",
            Type: "",
            Caliber: "",
          },
          "Ammunition"
        )}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Protection</h2>
        {renderFields(protection, setProtection)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Automotive</h2>
        {renderFields(automotive, setAutomotive)}
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
