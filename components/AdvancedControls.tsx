import React from 'react';
import type { Waveform } from '../types';

interface AdvancedControlsProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  waveform: Waveform;
  onWaveformChange: (waveform: Waveform) => void;
}

const WAVEFORMS: Waveform[] = ['sine', 'square', 'sawtooth', 'triangle'];

export const AdvancedControls: React.FC<AdvancedControlsProps> = ({
  volume,
  onVolumeChange,
  waveform,
  onWaveformChange,
}) => {
  return (
    <div className="mt-6 p-4 bg-stone-800 rounded-lg shadow-inner border border-stone-700">
      <h3 className="text-lg font-semibold text-amber-100 mb-4 text-center">Sound Controls</h3>
      <div className="space-y-4">
        {/* Volume Control */}
        <div>
          <label htmlFor="volume" className="block text-sm font-medium text-amber-200 mb-1">
            Master Volume
          </label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-stone-600 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Waveform Selector */}
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-2">
            Waveform
          </label>
          <div className="flex justify-center gap-2">
            {WAVEFORMS.map((wf) => (
              <button
                key={wf}
                onClick={() => onWaveformChange(wf)}
                className={`px-3 py-1 rounded-md text-sm font-semibold capitalize transition-all duration-200 border-2
                  ${waveform === wf
                    ? 'bg-amber-500 text-stone-900 border-amber-300 ring-2 ring-amber-200'
                    : 'bg-stone-600 text-amber-200 hover:bg-stone-500 border-stone-500'
                  }`}
              >
                {wf}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
