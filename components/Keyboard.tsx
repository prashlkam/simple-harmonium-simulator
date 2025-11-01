import React from 'react';
import { Key } from './Key';
import { KEYBOARD_LAYOUT } from '../keyboardConfig.ts';

interface KeyboardProps {
  activeKeys: Set<string>;
  onNoteOn: (note: string, frequency: number) => void;
  onNoteOff: (note: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ activeKeys, onNoteOn, onNoteOff }) => {
  const whiteKeys = KEYBOARD_LAYOUT.filter(k => !k.isBlack);
  const blackKeys = KEYBOARD_LAYOUT.filter(k => k.isBlack);
  
  return (
    <div className="relative flex w-full h-48">
      {whiteKeys.map(keyDef => (
        <Key
          key={keyDef.note}
          keyDef={keyDef}
          isActive={activeKeys.has(keyDef.note)}
          onNoteOn={onNoteOn}
          onNoteOff={onNoteOff}
        />
      ))}
      {blackKeys.map(keyDef => (
        <Key
          key={keyDef.note}
          keyDef={keyDef}
          isActive={activeKeys.has(keyDef.note)}
          onNoteOn={onNoteOn}
          onNoteOff={onNoteOff}
        />
      ))}
    </div>
  );
};