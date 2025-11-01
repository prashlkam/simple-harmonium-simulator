import React from 'react';
import type { RecordingStatus } from '../types';

// Fix: Moved icon components from constants.tsx to resolve module import ambiguity.
// The presence of both constants.ts and constants.tsx was causing an issue.
const RecordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth={2} fill="red" />
  </svg>
);

const StopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 6h12v12H6z" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ClearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

interface ControlsProps {
  status: RecordingStatus;
  hasRecording: boolean;
  onRecord: () => void;
  onStop: () => void;
  onPlay: () => void;
  onClear: () => void;
}

const ControlButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  className?: string;
  title: string;
}> = ({ onClick, disabled, children, className, title }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`px-4 py-2 rounded-md font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 ${className}`}
  >
    {children}
  </button>
);

export const Controls: React.FC<ControlsProps> = ({ status, hasRecording, onRecord, onStop, onPlay, onClear }) => {
  const isRecording = status === 'recording';
  const isPlaying = status === 'playing';

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <ControlButton
        onClick={onRecord}
        disabled={isRecording || isPlaying}
        className={`bg-red-600 hover:bg-red-700 focus:ring-red-500 ${isRecording ? 'animate-pulse' : ''}`}
        title="Record"
      >
        <RecordIcon /> {isRecording ? 'Recording...' : 'Record'}
      </ControlButton>

      <ControlButton
        onClick={onStop}
        disabled={!isRecording}
        className="bg-stone-600 hover:bg-stone-700 focus:ring-stone-500"
        title="Stop Recording"
      >
        <StopIcon /> Stop
      </ControlButton>

      <ControlButton
        onClick={onPlay}
        disabled={isRecording || isPlaying || !hasRecording}
        className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
        title="Play Recording"
      >
        <PlayIcon /> Play
      </ControlButton>

      <ControlButton
        onClick={onClear}
        disabled={isRecording || isPlaying || !hasRecording}
        className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        title="Clear Recording"
      >
        <ClearIcon /> Clear
      </ControlButton>
    </div>
  );
};
