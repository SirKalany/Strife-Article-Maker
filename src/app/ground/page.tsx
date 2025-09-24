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
  const [infos, setInfos] = useState<InfoField[]>([
    { label: "Name", value: "" },
    { label: "Type", value: "" },
    { label: "Manufacturer", value: "" },
  ]);

  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [armaments, setArmaments] = useState<Armament[]>([]);
  const [ammunitions, setAmmunitions] = useState<Ammunition[]>([]);

  // === Handlers ===
  const handleInfoChange = (idx: number, value: string) => {
    const copy = [...infos];
    copy[idx].value = value;
    setInfos(copy);
  };

  const addSensor = () => setSensors([...sensors, { Name: "", Type: "", Purpose: "" }]);
  const removeSensor = (idx: number) => setSensors(sensors.filter((_, i) => i !== idx));
  const updateSensor = (idx: number, field: keyof Sensor, value: string) => {
    const copy = [...sensors];
    copy[idx][field] = value;
    setSensors(copy);
  };

  const addArmament = () =>
    setArmaments([...armaments, { Category: "", Name: "", Mount: "", Ammunition: "", Stabilizer: "" }]);
  const removeArmament = (idx: number) => setArmaments(armaments.filter((_, i) => i !== idx));
  const updateArmament = (idx: number, field: keyof Armament, value: string) => {
    const copy = [...armaments];
    copy[idx][field] = value;
    setArmaments(copy);
  };

  const addAmmunition = () => setAmmunitions([...ammunitions, { Name: "", Type: "", Velocity: "", Mass: "" }]);
  const removeAmmunition = (idx: number) => setAmmunitions(ammunitions.filter((_, i) => i !== idx));
  const updateAmmunition = (idx: number, field: keyof Ammunition, value: string) => {
    const copy = [...ammunitions];
    copy[idx][field] = value;
    setAmmunitions(copy);
  };

  const exportJSON = () => {
    const json = {
      INFORMATIONS: Object.fromEntries(infos.map((i) => [i.label, i.value])),
      SENSORS: sensors,
      ARMAMENT: armaments,
      "AVAILABLE AMMUNITION": ammunitions,
    };
    console.log(JSON.stringify(json, null, 2));
    alert("Check console for JSON output!");
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Form</h1>

      <section className="space-y-2">
        <h2 className="font-semibold">Informations</h2>
        {infos.map((info, idx) => (
          <div key={idx}>
            <label className="block text-gray-700">{info.label}</label>
            <input
              type="text"
              value={info.value}
              onChange={(e) => handleInfoChange(idx, e.target.value)}
              className="border p-1 w-full"
            />
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Sensors</h2>
        {sensors.map((sensor, idx) => (
          <div key={idx} className="border p-2 space-y-1 relative">
            {(["Name", "Type", "Purpose"] as (keyof Sensor)[]).map((field) => (
              <div key={field}>
                <label>{field}</label>
                <input
                  type="text"
                  value={sensor[field]}
                  onChange={(e) => updateSensor(idx, field, e.target.value)}
                  className="border p-1 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => removeSensor(idx)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSensor} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Sensor
        </button>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Armaments</h2>
        {armaments.map((arm, idx) => (
          <div key={idx} className="border p-2 space-y-1 relative">
            {(["Category", "Name", "Mount", "Ammunition", "Vertical Guidance", "Horizontal Guidance", "Stabilizer"] as (keyof Armament)[]).map(
              (field) => (
                <div key={field}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={arm[field] || ""}
                    onChange={(e) => updateArmament(idx, field, e.target.value)}
                    className="border p-1 w-full"
                  />
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => removeArmament(idx)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addArmament} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Armament
        </button>
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold">Ammunition</h2>
        {ammunitions.map((ammo, idx) => (
          <div key={idx} className="border p-2 space-y-1 relative">
            {(["Name", "Type", "Velocity", "Penetration", "Mass", "Explosive Mass", "TNT Equivalent"] as (keyof Ammunition)[]).map(
              (field) => (
                <div key={field}>
                  <label>{field}</label>
                  <input
                    type="text"
                    value={ammo[field] || ""}
                    onChange={(e) => updateAmmunition(idx, field, e.target.value)}
                    className="border p-1 w-full"
                  />
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => removeAmmunition(idx)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addAmmunition} className="bg-green-500 text-white px-3 py-1 rounded">
          Add Ammunition
        </button>
      </section>

      <button type="button" onClick={exportJSON} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Export JSON
      </button>
    </div>
  );
}
