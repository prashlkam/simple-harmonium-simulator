import React from 'react';

interface DronesProps {
  activeDrones: Set<string>;
  toggleDrone: (note: string, frequency: number) => void;
}

const DRONE_NOTES = [
  { note: 'C3', frequency: 130.81 },
  { note: 'F3', frequency: 174.61 },
  { note: 'G3', frequency: 196.00 },
  { note: 'A3', frequency: 220.00 },
  { note: 'C4', frequency: 261.63 },
];

export const Drones: React.FC<DronesProps> = ({ activeDrones, toggleDrone }) => {
  return (
    <div className="mt-6 p-4 bg-stone-800 rounded-lg shadow-inner border border-stone-700">
      <h3 className="text-lg font-semibold text-amber-100 mb-3 text-center">Drones</h3>
      <div className="flex items-center justify-center flex-wrap gap-4">
        {DRONE_NOTES.map(({ note, frequency }) => (
          <button
            key={note}
            onClick={() => toggleDrone(note, frequency)}
            className={`px-6 py-2 rounded-md font-mono text-sm font-bold transition-all duration-200 shadow-md border-2
              ${activeDrones.has(note)
                ? 'bg-amber-500 text-stone-900 border-amber-300 ring-2 ring-amber-200'
                : 'bg-stone-600 text-amber-200 hover:bg-stone-500 border-stone-500'
              }`}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};