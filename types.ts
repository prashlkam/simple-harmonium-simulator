export interface KeyDefinition {
  note: string;
  frequency: number;
  keybind: string;
  isBlack: boolean;
  offset?: number;
}

export type RecordingStatus = 'idle' | 'recording' | 'playing';

export interface RecordedNote {
  note: string;
  frequency: number;
  startTime: number;
  duration: number;
}

export type Waveform = 'sine' | 'square' | 'sawtooth' | 'triangle';
