import React from 'react';
import type { KeyDefinition } from '../types';

interface KeyProps {
  keyDef: KeyDefinition;
  isActive: boolean;
  onNoteOn: (note: string, frequency: number) => void;
  onNoteOff: (note: string) => void;
}

export const Key: React.FC<KeyProps> = ({ keyDef, isActive, onNoteOn, onNoteOff }) => {
  const { note, frequency, keybind, isBlack, offset } = keyDef;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onNoteOn(note, frequency);
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    onNoteOff(note);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActive) {
        onNoteOff(note);
    }
  };

  const keyClasses = isBlack
    ? `absolute h-2/3 w-[5%] bg-stone-900 border-2 border-stone-700 rounded-b-md z-10 transform transition-all duration-75 ease-in-out`
    : `relative flex-1 bg-stone-100 border-2 border-stone-300 rounded-md`;
  
  const activeClasses = isBlack
    ? 'bg-stone-700 h-[65%]'
    : 'bg-amber-200 transform translate-y-px';

  const style = isBlack ? { left: `${(offset || 0) * (100 / 17)}%` } : {};

  return (
    <div
      className={`${keyClasses} ${isActive ? activeClasses : ''} cursor-pointer flex items-end justify-center pb-2`}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => { e.preventDefault(); onNoteOn(note, frequency); }}
      onTouchEnd={(e) => { e.preventDefault(); onNoteOff(note); }}
    >
      <span className={`font-bold text-xs ${isBlack ? 'text-stone-400' : 'text-stone-500'}`}>
        {keybind.toUpperCase()}
      </span>
    </div>
  );
};