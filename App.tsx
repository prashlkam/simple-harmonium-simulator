import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from './components/Keyboard';
import { Controls } from './components/Controls';
import { Login } from './components/Login';
import { Drones } from './components/Drones';
import { AdvancedControls } from './components/AdvancedControls';
import { useAudio } from './hooks/useAudio';
import { KEYBOARD_LAYOUT } from './keyboardConfig';

const KEY_TO_NOTE = KEYBOARD_LAYOUT.reduce((acc, keyDef) => {
  acc[keyDef.keybind] = keyDef;
  return acc;
}, {} as Record<string, typeof KEYBOARD_LAYOUT[0]>);


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { 
    activeKeys, 
    noteOn, 
    noteOff,
    status,
    hasRecording,
    onRecord,
    onStop,
    onPlay,
    onClear,
    volume,
    setVolume,
    waveform,
    setWaveform,
    activeDrones,
    toggleDrone,
  } = useAudio();

  const handleNoteOn = useCallback((note: string, frequency: number) => {
    noteOn(note, frequency);
  }, [noteOn]);

  const handleNoteOff = useCallback((note: string) => {
    noteOff(note);
  }, [noteOff]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const keyDef = KEY_TO_NOTE[e.key];
      if (keyDef) {
        handleNoteOn(keyDef.note, keyDef.frequency);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const keyDef = KEY_TO_NOTE[e.key];
      if (keyDef) {
        handleNoteOff(keyDef.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNoteOn, handleNoteOff]);

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 to-black flex flex-col items-center justify-center p-4 font-sans text-white">
      <main className="w-full max-w-4xl mx-auto p-6 bg-stone-800/50 rounded-xl shadow-2xl border-2 border-black backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-100 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          Harmonium Simulator
        </h1>
        
        <div className="mb-8">
           <Keyboard activeKeys={activeKeys} onNoteOn={handleNoteOn} onNoteOff={handleNoteOff} />
        </div>

        <Controls 
          status={status}
          hasRecording={hasRecording}
          onRecord={onRecord}
          onStop={onStop}
          onPlay={onPlay}
          onClear={onClear}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <AdvancedControls
                volume={volume}
                onVolumeChange={setVolume}
                waveform={waveform}
                onWaveformChange={setWaveform}
            />
            <Drones 
              activeDrones={activeDrones}
              toggleDrone={toggleDrone}
            />
        </div>
      </main>
      <footer className="text-center text-stone-500 mt-6 text-sm">
        <p>Use your mouse or keyboard to play. You can also record, playback, and change sounds.</p>
      </footer>
    </div>
  );
}

export default App;
