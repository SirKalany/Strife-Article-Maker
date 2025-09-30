"use client";

import React, { useState } from "react";

type InfoField = { label: string; value: string };

type Sensor = { Name: string; Type: string; Role: string };
type Armament = {
  Category: string;
  Name: string;
  Ammunition: string;
};
type Ammunition = {
  Name: string;
  Type: string;
  Velocity?: string;
  Penetration?: string;
  Mass?: string;
  "Explosive Mass"?: string;
  "TNT Equivalent"?: string;
};

export default function NavalForm() {
  // === Fixed blocks ===
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
  ]);

  const [aircraftCarried, setAircraftCarried] = useState<InfoField[]>([
    { label: "Aircraft", value: "" },
  ]);

  const [aviationFacilities, setAviationFacilities] = useState<InfoField[]>([
    { label: "Facilities", value: "" },
  ]);

  const [performances, setPerformances] = useState<InfoField[]>([
    { label: "Speed", value: "" },
    { label: "Range", value: "" },
  ]);

  // === Modular blocks ===
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [armaments, setArmaments] = useState<Armament[]>([]);
  const [ammunitions, setAmmunitions] = useState<Ammunition[]>([]);

  // === Helpers ===
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
        <div
          key={idx}
          className="border rounded p-2 mb-3 relative shadow-sm bg-gray-700"
        >
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
      "SENSORS & SYSTEMS": sensors,
      ARMAMENT: armaments,
      "AVAILABLE AMMUNITION": ammunitions,
      PROTECTION: Object.fromEntries(protection.map((i) => [i.label, i.value])),
      AUTOMOTIVE: Object.fromEntries(automotive.map((i) => [i.label, i.value])),
      "AIRCRAFT CARRIED": Object.fromEntries(
        aircraftCarried.map((i) => [i.label, i.value])
      ),
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

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Naval Form</h1>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Informations</h2>
        {renderFields(infos, setInfos)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
        {renderFields(dimensions, setDimensions)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Sensors & Systems</h2>
        {renderList(
          sensors,
          setSensors,
          ["Name", "Type", "Role"],
          { Name: "", Type: "", Role: "" },
          "Sensors"
        )}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Armaments</h2>
        {renderList(
          armaments,
          setArmaments,
          ["Category", "Name", "Ammunition"],
          { Category: "", Name: "", Ammunition: "" },
          "Armaments"
        )}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Available Ammunition</h2>
        {renderList(
          ammunitions,
          setAmmunitions,
          [
            "Name",
            "Type",
            "Velocity",
            "Penetration",
            "Mass",
            "Explosive Mass",
            "TNT Equivalent",
          ],
          {
            Name: "",
            Type: "",
            Velocity: "",
            Penetration: "",
            Mass: "",
            "Explosive Mass": "",
            "TNT Equivalent": "",
          },
          "Ammunitions"
        )}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Protection</h2>
        {renderFields(protection, setProtection)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Automotive</h2>
        {renderFields(automotive, setAutomotive)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Aircraft Carried</h2>
        {renderFields(aircraftCarried, setAircraftCarried)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Aviation Facilities</h2>
        {renderFields(aviationFacilities, setAviationFacilities)}
      </section>

      <section className="border rounded p-4 bg-gray-800">
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
