import type { KeyDefinition } from './types';

// Frequencies for notes C4 to E6
const frequencies: { [note: string]: number } = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51,
};

export const KEYBOARD_LAYOUT: KeyDefinition[] = [
  // Octave 4
  { note: 'C4', frequency: frequencies['C4'], keybind: 'a', isBlack: false },
  { note: 'C#4', frequency: frequencies['C#4'], keybind: 'w', isBlack: true, offset: 0.5 },
  { note: 'D4', frequency: frequencies['D4'], keybind: 's', isBlack: false },
  { note: 'D#4', frequency: frequencies['D#4'], keybind: 'e', isBlack: true, offset: 1.5 },
  { note: 'E4', frequency: frequencies['E4'], keybind: 'd', isBlack: false },
  { note: 'F4', frequency: frequencies['F4'], keybind: 'f', isBlack: false },
  { note: 'F#4', frequency: frequencies['F#4'], keybind: 't', isBlack: true, offset: 3.5 },
  { note: 'G4', frequency: frequencies['G4'], keybind: 'g', isBlack: false },
  { note: 'G#4', frequency: frequencies['G#4'], keybind: 'y', isBlack: true, offset: 4.5 },
  { note: 'A4', frequency: frequencies['A4'], keybind: 'h', isBlack: false },
  { note: 'A#4', frequency: frequencies['A#4'], keybind: 'u', isBlack: true, offset: 5.5 },
  { note: 'B4', frequency: frequencies['B4'], keybind: 'j', isBlack: false },
  // Octave 5
  { note: 'C5', frequency: frequencies['C5'], keybind: 'k', isBlack: false },
  { note: 'C#5', frequency: frequencies['C#5'], keybind: 'o', isBlack: true, offset: 7.5 },
  { note: 'D5', frequency: frequencies['D5'], keybind: 'l', isBlack: false },
  { note: 'D#5', frequency: frequencies['D#5'], keybind: 'p', isBlack: true, offset: 8.5 },
  { note: 'E5', frequency: frequencies['E5'], keybind: ';', isBlack: false },
  { note: 'F5', frequency: frequencies['F5'], keybind: "'", isBlack: false },
  { note: 'F#5', frequency: frequencies['F#5'], keybind: '[', isBlack: true, offset: 10.5 },
  { note: 'G5', frequency: frequencies['G5'], keybind: ']', isBlack: false },
  { note: 'G#5', frequency: frequencies['G#5'], keybind: 'z', isBlack: true, offset: 11.5 },
  { note: 'A5', frequency: frequencies['A5'], keybind: 'x', isBlack: false },
  { note: 'A#5', frequency: frequencies['A#5'], keybind: 'c', isBlack: true, offset: 12.5 },
  { note: 'B5', frequency: frequencies['B5'], keybind: 'v', isBlack: false },
  // Octave 6
  { note: 'C6', frequency: frequencies['C6'], keybind: 'b', isBlack: false },
  { note: 'C#6', frequency: frequencies['C#6'], keybind: 'n', isBlack: true, offset: 14.5 },
  { note: 'D6', frequency: frequencies['D6'], keybind: 'm', isBlack: false },
  { note: 'D#6', frequency: frequencies['D#6'], keybind: ',', isBlack: true, offset: 15.5 },
  { note: 'E6', frequency: frequencies['E6'], keybind: '.', isBlack: false },
];
