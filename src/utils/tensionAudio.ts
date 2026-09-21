// Web Audio API tension sound synthesizer & interactive audio effects

let audioCtx: AudioContext | null = null;
let cosmicOsc1: OscillatorNode | null = null;
let cosmicOsc2: OscillatorNode | null = null;
let cosmicLFO: OscillatorNode | null = null;
let cosmicLFOGain: GainNode | null = null;
let cosmicFilter: BiquadFilterNode | null = null;
let cosmicMasterGain: GainNode | null = null;
let isAudioEnabled = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setTensionAudioEnabled(enabled: boolean) {
  isAudioEnabled = enabled;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (enabled) {
    startCosmicSpaceAmbient();
  } else {
    stopCosmicSpaceAmbient();
  }
}

export function getTensionAudioEnabled(): boolean {
  return isAudioEnabled;
}

// Deep Outer Space Ambient: Ethereal cosmic void, solar wind texture, zero clipping ("flojo y que no pete")
export function startCosmicSpaceAmbient() {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    stopCosmicSpaceAmbient();
    const now = ctx.currentTime;

    // Extremely soft master gain (0.024) - gentle, atmospheric, never clips
    cosmicMasterGain = ctx.createGain();
    cosmicMasterGain.gain.setValueAtTime(0.0001, now);
    cosmicMasterGain.gain.linearRampToValueAtTime(0.025, now + 2.0);

    // Deep resonant space filter: keeps frequencies silky and removes harsh peaks
    cosmicFilter = ctx.createBiquadFilter();
    cosmicFilter.type = 'lowpass';
    cosmicFilter.frequency.setValueAtTime(450, now);
    cosmicFilter.Q.setValueAtTime(2.2, now);

    // Cosmic Void Drone 1: Ethereal harmonic frequency (108 Hz)
    cosmicOsc1 = ctx.createOscillator();
    cosmicOsc1.type = 'sine';
    cosmicOsc1.frequency.setValueAtTime(108, now);

    // Cosmic Void Drone 2: Detuned fifth (162.5 Hz) for subtle gravitational parallax
    cosmicOsc2 = ctx.createOscillator();
    cosmicOsc2.type = 'sine';
    cosmicOsc2.frequency.setValueAtTime(162.5, now);

    // Slow orbital LFO: gently breathes the filter over 7.5 seconds
    cosmicLFO = ctx.createOscillator();
    cosmicLFO.type = 'sine';
    cosmicLFO.frequency.setValueAtTime(0.13, now); // ~7.7s orbital wave

    cosmicLFOGain = ctx.createGain();
    cosmicLFOGain.gain.setValueAtTime(180, now); // Modulates filter between 270Hz and 630Hz

    cosmicLFO.connect(cosmicLFOGain);
    cosmicLFOGain.connect(cosmicFilter.frequency);

    cosmicOsc1.connect(cosmicFilter);
    cosmicOsc2.connect(cosmicFilter);
    cosmicFilter.connect(cosmicMasterGain);
    cosmicMasterGain.connect(ctx.destination);

    cosmicOsc1.start(now);
    cosmicOsc2.start(now);
    cosmicLFO.start(now);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
}

export function stopCosmicSpaceAmbient() {
  try {
    const ctx = getAudioContext();
    const now = ctx ? ctx.currentTime : 0;

    if (cosmicMasterGain && ctx) {
      cosmicMasterGain.gain.cancelScheduledValues(now);
      cosmicMasterGain.gain.setValueAtTime(cosmicMasterGain.gain.value, now);
      cosmicMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    }

    setTimeout(() => {
      if (cosmicOsc1) {
        try { cosmicOsc1.stop(); cosmicOsc1.disconnect(); } catch (e) {}
        cosmicOsc1 = null;
      }
      if (cosmicOsc2) {
        try { cosmicOsc2.stop(); cosmicOsc2.disconnect(); } catch (e) {}
        cosmicOsc2 = null;
      }
      if (cosmicLFO) {
        try { cosmicLFO.stop(); cosmicLFO.disconnect(); } catch (e) {}
        cosmicLFO = null;
      }
      if (cosmicLFOGain) {
        try { cosmicLFOGain.disconnect(); } catch (e) {}
        cosmicLFOGain = null;
      }
      if (cosmicFilter) {
        try { cosmicFilter.disconnect(); } catch (e) {}
        cosmicFilter = null;
      }
      if (cosmicMasterGain) {
        try { cosmicMasterGain.disconnect(); } catch (e) {}
        cosmicMasterGain = null;
      }
    }, 450);
  } catch (e) {
    // ignore
  }
}

// Legacy alias for compatibility
export const startAmbientSirens = startCosmicSpaceAmbient;
export const stopAmbientSirens = stopCosmicSpaceAmbient;

// Glitch Reality Desfase Audio Effect
export function playCosmicGlitchPulse(intensity: number = 1) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    // Rapid glitch frequency jump
    osc.frequency.setValueAtTime(320 * intensity, now);
    osc.frequency.setValueAtTime(840 * intensity, now + 0.02);
    osc.frequency.setValueAtTime(210 * intensity, now + 0.05);

    // Soft, controlled volume so it never hurts ears
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.8, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    // ignore
  }
}

// Reality Phase Shift Whoosh
export function playRealityPhaseShift(pitch: number = 1) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(880 * pitch, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(440 * pitch, now + 0.35);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    // ignore
  }
}

// Tachyon / Quantum Anchor Pulse
export function playTachyonPulse() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  } catch (e) {
    // ignore
  }
}

// Deep Sub-Bass Tension Heartbeat ("thump... thump...")
export function playHeartbeatPulse() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(54, now);
    osc.frequency.exponentialRampToValueAtTime(26, now + 0.18);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.19);

    // Second beat 0.2s later
    setTimeout(() => {
      if (!isAudioEnabled || !ctx || ctx.state === 'closed') return;
      const t = ctx.currentTime;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(48, t);
      osc2.frequency.exponentialRampToValueAtTime(22, t + 0.16);

      gain2.gain.setValueAtTime(0.35, t);
      gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.16);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t);
      osc2.stop(t + 0.17);
    }, 180);
  } catch (e) {
    // ignore
  }
}

// Heavy Cyber Click / Keypress
export function playCyberClick(pitch: number = 800) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch / 2, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);
  } catch (e) {
    // ignore
  }
}

// Slider / Frequency Dial sweep tone
export function playSliderTone(normalizedValue: number) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const freq = 120 + normalizedValue * 550; // 120Hz to 670Hz
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  } catch (e) {
    // ignore
  }
}

// Severe Error / Access Denied Alarm Buzz
export function playErrorAlarm() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    // Dissonant dual square waves
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(160, now);
    osc2.frequency.setValueAtTime(175, now); // discordant tritone-like beating

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.36);
    osc2.stop(now + 0.36);
  } catch (e) {
    // ignore
  }
}

// Logic Gate Switch Heavy Thump & Zap
export function playLogicSwitch(state: boolean) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = state ? 'sine' : 'square';
    osc.frequency.setValueAtTime(state ? 520 : 280, now);
    osc.frequency.exponentialRampToValueAtTime(state ? 780 : 140, now + 0.07);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    // ignore
  }
}

// Quantum Matrix Inversion Node Sound (harmonic based on matrix cell)
export function playQuantumNode(row: number, col: number) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const baseFreqs = [220, 277, 329, 392];
    const freq = baseFreqs[row % 4] * (1 + col * 0.25);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {
    // ignore
  }
}

// Solved Stage Metallic Latch & Harmonic Lock
export function playStageSolvedTone() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    [330, 440, 554, 660].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.2, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  } catch (e) {
    // ignore
  }
}

// Full Mystery Breach Fanfare & Sub-Blast
export function playGrandBreachSiren() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    
    // Sub drop blast
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(140, now);
    subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.2);

    subGain.gain.setValueAtTime(0.4, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.25);

    // Cosmic arpeggio
    [440, 554, 659, 880, 1108].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + 0.2 + i * 0.1);
      gain.gain.setValueAtTime(0.25, now + 0.2 + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + i * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + 0.2 + i * 0.1);
      osc.stop(now + 0.2 + i * 0.1 + 0.85);
    });
  } catch (e) {
    // ignore
  }
}

// Thermal Drill buzz & spark sound
export function playThermalDrillBuzz(temp: number) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Frequency modulates based on drill temperature
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110 + (temp / 10), now);
    osc.frequency.linearRampToValueAtTime(125 + (temp / 10), now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } catch (e) {
    // ignore
  }
}

// Cryo coolant hiss
export function playCoolantHiss() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.18;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch (e) {
    // ignore
  }
}

// Safe cracking mechanics sounds
export function playSafeDialTick(intensity: number = 1) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400 + Math.random() * 200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.08 * intensity, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (e) {
    // ignore
  }
}

export function playSafeTumblerNear() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.06);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.075);
  } catch (e) {
    // ignore
  }
}

export function playSafeTumblerEngage() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // First sharp tick
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(950, now);
    osc1.frequency.exponentialRampToValueAtTime(320, now + 0.05);

    gain1.gain.setValueAtTime(0.22, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.07);

    // Second resonant tumbler drop
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(620, now + 0.03);
    osc2.frequency.exponentialRampToValueAtTime(180, now + 0.16);

    gain2.gain.setValueAtTime(0.18, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.03);
    osc2.stop(now + 0.19);
  } catch (e) {
    // ignore
  }
}

export function playSafePinUnlocked() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Heavy mechanical bolt sliding
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.25);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);

    // High metal chime of lock engaging
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(1240, now + 0.12);
    chime.frequency.exponentialRampToValueAtTime(980, now + 0.4);

    chimeGain.gain.setValueAtTime(0.2, now + 0.12);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    chime.start(now + 0.12);
    chime.stop(now + 0.46);
  } catch (e) {
    // ignore
  }
}

// Weird / Eerie Glitch Harmonic Resonance (triggers only when hitting the exact secret frequency)
export function playWeirdGlitchResonance(channelSeed: number = 1) {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const modGain = ctx.createGain();
    const mainGain = ctx.createGain();

    const baseFreq = 220 + (channelSeed * 67.5);
    carrier.type = 'sawtooth';
    carrier.frequency.setValueAtTime(baseFreq, now);
    carrier.frequency.exponentialRampToValueAtTime(baseFreq * 1.414, now + 0.12);
    carrier.frequency.exponentialRampToValueAtTime(baseFreq * 0.72, now + 0.28);

    modulator.type = 'square';
    modulator.frequency.setValueAtTime(37 + (channelSeed * 11), now);
    modulator.frequency.linearRampToValueAtTime(85, now + 0.28);

    modGain.gain.setValueAtTime(120, now);
    modGain.gain.exponentialRampToValueAtTime(10, now + 0.28);

    modulator.connect(carrier.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800 + (channelSeed * 120), now);
    filter.Q.setValueAtTime(7.5, now);

    mainGain.gain.setValueAtTime(0.25, now);
    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    carrier.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    carrier.start(now);
    modulator.start(now);
    carrier.stop(now + 0.33);
    modulator.stop(now + 0.33);
  } catch (e) {
    // ignore
  }
}




