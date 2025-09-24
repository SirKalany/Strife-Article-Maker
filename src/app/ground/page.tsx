"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };
type Sensor = { Name: string; Type: string; Purpose: string };
type Armament = {
  Category: string;
  Name: string;
  Mount?: string;
  Ammunition: string;
  "Vertical Guidance"?: string;
  "Horizontal Guidance"?: string;
  Stabilizer?: string;
};
type Ammunition = {
  Name: string;
  Type: string;
  Velocity: string;
  Penetration?: string;
  Mass: string;
  "Explosive Mass"?: string;
  "TNT Equivalent"?: string;
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
    { label: "Protection Devices", value: "" },
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

  // === Handlers ===
  const handleFieldChange = (setter: any, idx: number, value: string) => {
    const copy = [...setter];
    copy[idx].value = value;
    setter(copy);
  };

  const renderFields = (fields: InfoField[], setter: any) =>
    fields.map((field, idx) => (
      <div key={idx} className="mb-2">
        <label className="block font-medium">{field.label}</label>
        <input
          type="text"
          value={field.value}
          onChange={(e) => {
            const copy = [...fields];
            copy[idx].value = e.target.value;
            setter(copy);
          }}
          className="border rounded p-1 w-full"
        />
      </div>
    ));

  const renderList = (
    list: any[],
    setter: any,
    fields: string[],
    emptyTemplate: any,
    title: string
  ) => (
    <>
      {list.map((item, idx) => (
        <div key={idx} className="border rounded p-2 mb-3 relative shadow-sm">
          {fields.map((field) => (
            <div key={field} className="mb-1">
              <label className="block font-medium">{field}</label>
              <input
                type="text"
                value={item[field] || ""}
                onChange={(e) => {
                  const copy = [...list];
                  copy[idx][field] = e.target.value;
                  setter(copy);
                }}
                className="border rounded p-1 w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setter(list.filter((_, i) => i !== idx))}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setter([...list, emptyTemplate])}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Add {title.slice(0, -1)}
      </button>
    </>
  );

  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      SENSORS: sensors,
      ARMAMENT: armaments,
      "AVAILABLE AMMUNITION": ammunitions,
      PROTECTION: Object.fromEntries(protection.map((i) => [i.label, i.value])),
      AUTOMOTIVE: Object.fromEntries(automotive.map((i) => [i.label, i.value])),
      PERFORMANCES: Object.fromEntries(performances.map((i) => [i.label, i.value])),
    };
    console.log(JSON.stringify(json, null, 2));
    alert("Check console for JSON output!");
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Ground Form</h1>

      {/* Blocks */}
      <section className="border rounded p-4 bg-gray-800">{renderFields(infos, setInfos)}</section>
      <section className="border rounded p-4 bg-gray-800">{renderFields(dimensions, setDimensions)}</section>
      <section className="border rounded p-4 bg-gray-800">{renderList(sensors, setSensors, ["Name", "Type", "Purpose"], { Name: "", Type: "", Purpose: "" }, "Sensors")}</section>
      <section className="border rounded p-4 bg-gray-800">
        {renderList(
          armaments,
          setArmaments,
          ["Category", "Name", "Mount", "Ammunition", "Vertical Guidance", "Horizontal Guidance", "Stabilizer"],
          { Category: "", Name: "", Mount: "", Ammunition: "", "Vertical Guidance": "", "Horizontal Guidance": "", Stabilizer: "" },
          "Armaments"
        )}
      </section>
      <section className="border rounded p-4 bg-gray-800">
        {renderList(
          ammunitions,
          setAmmunitions,
          ["Name", "Type", "Velocity", "Penetration", "Mass", "Explosive Mass", "TNT Equivalent"],
          { Name: "", Type: "", Velocity: "", Penetration: "", Mass: "", "Explosive Mass": "", "TNT Equivalent": "" },
          "Ammunition"
        )}
      </section>
      <section className="border rounded p-4 bg-gray-800">{renderFields(protection, setProtection)}</section>
      <section className="border rounded p-4 bg-gray-800">{renderFields(automotive, setAutomotive)}</section>
      <section className="border rounded p-4 bg-gray-800">{renderFields(performances, setPerformances)}</section>

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
