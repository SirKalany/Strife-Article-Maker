"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };

export default function NavalForm() {
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
    { label: "Complement", value: "" },
    { label: "Displacement Normal", value: "" },
    { label: "Displacement Full Load", value: "" },
    { label: "Length", value: "" },
    { label: "Beam", value: "" },
    { label: "Draught", value: "" },
  ]);

  const [protection, setProtection] = useState<InfoField[]>([
    { label: "Belt Armor", value: "" },
    { label: "Main Deck", value: "" },
    { label: "Turret Armor", value: "" },
    { label: "Bulkheads", value: "" },
  ]);

  const [automotive, setAutomotive] = useState<InfoField[]>([
    { label: "Installed Power", value: "" },
    { label: "Propulsion", value: "" },
    { label: "Fuel Type", value: "" },
    { label: "Fuel Capacity", value: "" },
  ]);

  const [sensors, setSensors] = useState<
    { Name: string; Type: string; Functions: string }[]
  >([]);

  const [aviationFacilities, setAviationFacilities] = useState<InfoField[]>([
    { label: "Facilities", value: "" },
    { label: "Aircraft Carried", value: "" },
  ]);

  const [performances, setPerformances] = useState<InfoField[]>([
    { label: "Maximum Speed", value: "" },
    { label: "Range", value: "" },
  ]);

  // === Armament categories ===
  const [guns, setGuns] = useState<any[]>([]);
  const [rockets, setRockets] = useState<any[]>([]);
  const [missiles, setMissiles] = useState<any[]>([]);
  const [others, setOthers] = useState<any[]>([]);

  // === Helper: generic input fields ===
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
    return (
      <>
        {list.map((item, idx) => (
          <div
            key={idx}
            className="border rounded p-3 mb-3 relative bg-gray-900 border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold text-gray-200">
                {item.Name || `${title.slice(0, -1)} ${idx + 1}`}
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
          Add {title.slice(0, -1)}
        </button>
      </>
    );
  };

  // === Export ===
  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      DIMENSIONS: Object.fromEntries(dimensions.map((i) => [i.label, i.value])),
      ARMAMENT: {
        Guns: guns,
        Rockets: rockets,
        Missiles: missiles,
        Others: others,
      },
      PROTECTION: Object.fromEntries(protection.map((i) => [i.label, i.value])),
      AUTOMOTIVE: Object.fromEntries(automotive.map((i) => [i.label, i.value])),
      SENSORS: sensors,
      "AVIATION FACILITIES": Object.fromEntries(
        aviationFacilities.map((i) => [i.label, i.value])
      ),
      PERFORMANCES: Object.fromEntries(
        performances.map((i) => [i.label, i.value])
      ),
    };

    console.log(JSON.stringify(json, null, 2));
    alert("Check console for JSON output!");
  };

  // === Field presets ===
  const gunFields = [
    "Name",
    "Type",
    "Caliber",
    "Reserve",
    "Muzzle Velocity",
    "Rate Of Fire",
    "Effective Range",
    "Feed System",
  ];

  const rocketFields = [
    "Name",
    "Type",
    "Launcher",
    "Caliber",
    "Mass",
    "Explosive Mass",
    "Explosive Type",
  ];

  const missileFields = [
    "Name",
    "Type",
    "Launcher",
    "Mass",
    "Guidance",
    "Operational Range",
    "Explosive Mass",
    "Explosive Type",
  ];

  const otherFields = ["Name", "Type", "Role"];

  // === Render ===
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Naval Form</h1>

      {/* Basic sections */}
      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        {renderFields(infos, setInfos)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
        {renderFields(dimensions, setDimensions)}
      </section>

      {/* Unified Armament Section */}
      <section className="border rounded p-4 bg-[#0f1720] border-gray-700 space-y-6">
        <h2 className="text-lg font-semibold mb-2 text-green-400">Armament</h2>

        <div>
          <h3 className="font-semibold mb-2 text-blue-400">Guns</h3>
          {renderList(guns, setGuns, gunFields, {}, "Guns")}
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-400">Rockets</h3>
          {renderList(rockets, setRockets, rocketFields, {}, "Rockets")}
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-400">Missiles</h3>
          {renderList(missiles, setMissiles, missileFields, {}, "Missiles")}
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-blue-400">Others</h3>
          {renderList(others, setOthers, otherFields, {}, "Others")}
        </div>
      </section>

      {/* Remaining sections */}
      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Protection</h2>
        {renderFields(protection, setProtection)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Automotive</h2>
        {renderFields(automotive, setAutomotive)}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Sensors</h2>
        {renderList(
          sensors,
          setSensors,
          ["Name", "Type", "Functions"],
          { Name: "", Type: "", Functions: "" },
          "Sensors"
        )}
      </section>

      <section className="border rounded p-4 bg-[#0f1720] border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Aviation Facilities</h2>
        {renderFields(aviationFacilities, setAviationFacilities)}
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
