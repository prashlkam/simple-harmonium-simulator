import { useState, useRef, useCallback, useEffect } from 'react';
import type { RecordingStatus, RecordedNote, Waveform } from '../types';

interface ActiveOscillator {
  oscillator: OscillatorNode;
  gain: GainNode;
  startTime: number;
}

export const useAudio = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeOscillatorsRef = useRef<Record<string, ActiveOscillator>>({});
  const activeDronesRef = useRef<Record<string, OscillatorNode>>({});

  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [recording, setRecording] = useState<RecordedNote[]>([]);
  const recordingStartTimeRef = useRef<number>(0);
  
  const [volume, setVolume] = useState(0.5);
  const [waveform, setWaveform] = useState<Waveform>('sine');
  const [activeDrones, setActiveDrones] = useState<Set<string>>(new Set());

  // Initialize AudioContext
  const initAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = context;
      masterGainRef.current = context.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, context.currentTime);
      masterGainRef.current.connect(context.destination);
    }
  }, [volume]);

  const noteOn = useCallback((note: string, frequency: number) => {
    initAudioContext();
    const audioCtx = audioCtxRef.current;
    if (!audioCtx || activeOscillatorsRef.current[note]) return;
    
    // Resume context if suspended
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1.0, audioCtx.currentTime + 0.01);
    
    oscillator.connect(gain);
    gain.connect(masterGainRef.current!);
    oscillator.start();
    
    activeOscillatorsRef.current[note] = { oscillator, gain, startTime: audioCtx.currentTime };
    setActiveKeys(prev => new Set(prev).add(note));

    if (status === 'recording') {
        const startTime = audioCtx.currentTime - recordingStartTimeRef.current;
        const tempNote: RecordedNote = { note, frequency, startTime, duration: -1 }; // duration -1 indicates it's still playing
        setRecording(prev => [...prev, tempNote]);
    }
  }, [waveform, status, initAudioContext]);

  const noteOff = useCallback((note: string) => {
    const audioCtx = audioCtxRef.current;
    const activeOsc = activeOscillatorsRef.current[note];
    if (!audioCtx || !activeOsc) return;

    const { oscillator, gain } = activeOsc;
    gain.gain.cancelScheduledValues(audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    oscillator.stop(audioCtx.currentTime + 0.05);
    
    delete activeOscillatorsRef.current[note];
    setActiveKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(note);
      return newSet;
    });

    if (status === 'recording') {
        const endTime = audioCtx.currentTime - recordingStartTimeRef.current;
        setRecording(prev => prev.map(r => 
            (r.note === note && r.duration === -1) 
            ? { ...r, duration: endTime - r.startTime } 
            : r
        ));
    }
  }, [status]);

  const toggleDrone = useCallback((note: string, frequency: number) => {
    initAudioContext();
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;

    if (activeDronesRef.current[note]) {
      activeDronesRef.current[note].stop();
      delete activeDronesRef.current[note];
      setActiveDrones(prev => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    } else {
      const drone = audioCtx.createOscillator();
      drone.type = 'sine'; // Drones are typically sine waves
      drone.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      drone.connect(masterGainRef.current!);
      drone.start();
      activeDronesRef.current[note] = drone;
      setActiveDrones(prev => new Set(prev).add(note));
    }
  }, [initAudioContext]);

  // Recording and Playback
  const onRecord = () => {
    initAudioContext();
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;
    setRecording([]);
    recordingStartTimeRef.current = audioCtx.currentTime;
    setStatus('recording');
  };

  const onStop = () => {
    setStatus('idle');
    // Finalize any notes that are still "on"
    const audioCtx = audioCtxRef.current;
    if (!audioCtx) return;
    const endTime = audioCtx.currentTime - recordingStartTimeRef.current;
    setRecording(prev => prev.map(r => 
        (r.duration === -1) 
        ? { ...r, duration: endTime - r.startTime } 
        : r
    ));
  };

  const onPlay = () => {
    initAudioContext();
    const audioCtx = audioCtxRef.current;
    if (!audioCtx || recording.length === 0) return;
    setStatus('playing');

    const playbackStartTime = audioCtx.currentTime;
    recording.forEach(recNote => {
      const { frequency, startTime, duration } = recNote;
      if (duration <= 0) return;

      const osc = audioCtx.createOscillator();
      osc.type = waveform;
      osc.frequency.setValueAtTime(frequency, 0);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, 0);
      
      osc.connect(gain);
      gain.connect(masterGainRef.current!);

      const noteStartTime = playbackStartTime + startTime;
      const noteEndTime = noteStartTime + duration;

      osc.start(noteStartTime);
      gain.gain.exponentialRampToValueAtTime(1.0, noteStartTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, noteEndTime);
      osc.stop(noteEndTime + 0.05);
    });

    const totalDuration = Math.max(0, ...recording.map(n => n.startTime + n.duration)) * 1000;
    setTimeout(() => setStatus('idle'), totalDuration);
  };
  
  const onClear = () => {
    setRecording([]);
  };

  // Update master volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);
  
  return {
    activeKeys,
    noteOn,
    noteOff,
    status,
    hasRecording: recording.length > 0,
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
  };
};
