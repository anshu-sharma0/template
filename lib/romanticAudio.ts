// Romantic & Birthday Web Audio synthesizer for ambient preview and interactions
let globalMusicContext: AudioContext | null = null;
let musicStopCallback: (() => void) | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
}

export function playTickChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.08); // E6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  } catch {}
}

export function playWhoosh() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    // White noise / filtered swoosh
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.3);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch {}
}

export function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  } catch {}
}

export function playCandleBlow() {
  playWhoosh();
  setTimeout(() => {
    playCelebrationChime();
  }, 250);
}

export function playPaperOpen() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch {}
}

export function playBirthdayMelody(): () => void {
  stopBirthdayMelody();
  const ctx = getAudioContext();
  if (!ctx) return () => {};
  globalMusicContext = ctx;

  let isPlaying = true;
  musicStopCallback = () => {
    isPlaying = false;
    try {
      ctx.close();
    } catch {}
    globalMusicContext = null;
  };

  try {
    // "Happy Birthday To You" Notes:
    // G4, G4, A4, G4, C5, B4
    // G4, G4, A4, G4, D5, C5
    // G4, G4, G5, E5, C5, B4, A4
    // F5, F5, E5, C5, D5, C5
    const notes = [
      { f: 392.0, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.0, d: 0.35, pause: 0.1 },  // py
      { f: 440.0, d: 0.7, pause: 0.1 },   // Birth-
      { f: 392.0, d: 0.7, pause: 0.1 },   // day
      { f: 523.25, d: 0.7, pause: 0.1 },  // to
      { f: 493.88, d: 1.2, pause: 0.3 },  // you

      { f: 392.0, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.0, d: 0.35, pause: 0.1 },  // py
      { f: 440.0, d: 0.7, pause: 0.1 },   // Birth-
      { f: 392.0, d: 0.7, pause: 0.1 },   // day
      { f: 587.33, d: 0.7, pause: 0.1 },  // to
      { f: 523.25, d: 1.2, pause: 0.3 },  // you

      { f: 392.0, d: 0.35, pause: 0.1 },  // Hap-
      { f: 392.0, d: 0.35, pause: 0.1 },  // py
      { f: 783.99, d: 0.7, pause: 0.1 },  // Birth-
      { f: 659.25, d: 0.7, pause: 0.1 },  // day
      { f: 523.25, d: 0.7, pause: 0.1 },  // dear
      { f: 493.88, d: 0.7, pause: 0.1 },  // [Name]
      { f: 440.0, d: 1.1, pause: 0.3 },

      { f: 698.46, d: 0.35, pause: 0.1 }, // Hap-
      { f: 698.46, d: 0.35, pause: 0.1 }, // py
      { f: 659.25, d: 0.7, pause: 0.1 },  // Birth-
      { f: 523.25, d: 0.7, pause: 0.1 },  // day
      { f: 587.33, d: 0.7, pause: 0.1 },  // to
      { f: 523.25, d: 1.4, pause: 0.8 },  // you
    ];

    const playTuneLoop = () => {
      if (!isPlaying || !ctx || ctx.state === "closed") return;
      let timeOffset = ctx.currentTime + 0.1;

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music Box / Glockenspiel timbre
        osc.type = "sine";
        osc.frequency.setValueAtTime(note.f, timeOffset);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(note.f * 2, timeOffset); // subtle bell overtone

        gain.gain.setValueAtTime(0.0001, timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.045, timeOffset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, timeOffset + note.d);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc.start(timeOffset);
        osc2.start(timeOffset);
        osc.stop(timeOffset + note.d);
        osc2.stop(timeOffset + note.d);

        timeOffset += note.d + note.pause;
      });

      const totalDuration = timeOffset - ctx.currentTime;
      setTimeout(() => {
        if (isPlaying) {
          playTuneLoop();
        }
      }, totalDuration * 1000);
    };

    playTuneLoop();
  } catch {}

  return () => {
    stopBirthdayMelody();
  };
}

export function stopBirthdayMelody() {
  if (musicStopCallback) {
    musicStopCallback();
    musicStopCallback = null;
  }
}

export function playRomanticChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const frequencies = [349.23, 440.0, 523.25, 659.25, 783.99];
    const now = ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.3);
    });
  } catch {}
}

export function playCelebrationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const frequencies = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.09, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.0);
    });
  } catch {}
}
