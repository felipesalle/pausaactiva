/**
 * Centro de Pausas Activas - Sistema de Audio (Web Audio API)
 * Incluye sintetizador procedural para música de fondo (Lo-Fi para CTE y Upbeat/Funk para Primaria)
 * y efectos de sonido en tiempo real sin dependencias externas (100% offline).
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.volume = 0.35; // Volumen por defecto 35%
    this.isPlayingMusic = false;
    this.currentTrack = "lofi"; // "lofi" | "upbeat"
    this.musicTimer = null;
    this.musicStep = 0;
    this.onStateChangeCallbacks = [];
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn("Web Audio API no soportada en este navegador.");
      return;
    }
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
    return this.isMuted;
  }

  setMute(state) {
    this.isMuted = state;
    if (this.masterGain) {
      const target = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.push(callback);
  }

  notify() {
    this.onStateChangeCallbacks.forEach(cb => cb({
      isPlaying: this.isPlayingMusic,
      isMuted: this.isMuted,
      volume: this.volume,
      track: this.currentTrack
    }));
  }

  // ==================== EFECTOS DE SONIDO (SFX) ====================

  /**
   * Clic / Tic-tac para la ruleta
   */
  playTick() {
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const freq = 650 + Math.random() * 150;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  /**
   * Sonido de silbato de árbitro / detención (para semáforo en rojo o cambio de roles)
   */
  playWhistle() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = "triangle";
    osc2.type = "sine";

    // Frecuencias cercanas para crear batimento/trino de silbato
    osc1.frequency.setValueAtTime(2600, now);
    osc2.frequency.setValueAtTime(2780, now);

    // Trémolo
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(28, now);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, now);
    lfo.connect(osc1.frequency);
    lfo.connect(osc2.frequency);
    lfo.start(now);
    lfo.stop(now + 0.55);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.03);
    gain.gain.setValueAtTime(0.45, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  }

  /**
   * Campana / Chime de finalización
   */
  playBell() {
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // Acorde mayor brillante (C, E, G, C)
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      const startTime = now + idx * 0.07;
      const dur = 1.2;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(startTime);
      osc.stop(startTime + dur);
    });
  }

  /**
   * Toque de globo / pelota (bote suave de aire)
   */
  playPop() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const startFreq = 220 + Math.random() * 80;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Beep para conteo (3, 2, 1) y beep final alto
   */
  playCountBeep(high = false) {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(high ? 880 : 440, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (high ? 0.35 : 0.15));

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + (high ? 0.35 : 0.15));
  }

  /**
   * Tono suave / Cuenco tibetano para Vuelta a la Calma
   */
  playGong() {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [196, 392, 587.33, 880];
    const dur = 3.5;

    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25 / (i + 1), now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + dur);
    });
  }

  /**
   * Pulso rítmico para la Cruz de Coordinación (un beat de caja o madera)
   */
  playBeatTick(isDownbeat = false) {
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    const freq = isDownbeat ? 880 : 520;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.06);

    gain.gain.setValueAtTime(isDownbeat ? 0.45 : 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // ==================== BGM GENERATOR (100% Procedural) ====================

  /**
   * Inicia o conmuta la música de fondo
   */
  playBgm(track = null) {
    this.ensureContext();
    if (track) this.currentTrack = track;
    this.isPlayingMusic = true;

    if (this.musicTimer) clearInterval(this.musicTimer);

    if (this.currentTrack === "lofi") {
      this.startLofiLoop();
    } else {
      this.startUpbeatLoop();
    }
    this.notify();
  }

  pauseBgm() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.notify();
  }

  toggleBgm() {
    if (this.isPlayingMusic) {
      this.pauseBgm();
    } else {
      this.playBgm(this.currentTrack);
    }
  }

  /**
   * Sintetizador Lo-Fi: Acordes suaves de 7ma y 9na con textura etérea relajante
   */
  startLofiLoop() {
    // Progresión de acordes Lo-fi cálidos: Dm9 -> G13 -> Cmaj9 -> Am7
    const chords = [
      [220, 261.63, 329.63, 392, 493.88],    // Dm9
      [196, 246.94, 329.63, 370, 440],       // G13 / G9
      [174.61, 220, 261.63, 329.63, 392],    // Fmaj7 / Cmaj9
      [220, 261.63, 329.63, 392, 523.25]     // Am9
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentNotes = chords[chordIdx % chords.length];
      chordIdx++;

      currentNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.03);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(750, now); // Filtro cálido tipo cassette

        const dur = 2.4;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + dur);
      });
    };

    playChord();
    this.musicTimer = setInterval(playChord, 2400);
  }

  /**
   * Sintetizador Upbeat: Línea de bajo funky alegre y arpegios enérgicos para niños
   */
  startUpbeatLoop() {
    // Línea rítmica alegre tipo pop/funk pentatónica
    const bassline = [130.81, 164.81, 196.00, 220.00, 196.00, 164.81, 146.83, 196.00]; // C - E - G - A - G - E - D - G
    const arpeggio = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63, 261.63];

    let beat = 0;
    const tempo = 220; // ~135 BPM

    const playStep = () => {
      if (!this.isPlayingMusic || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Bajo funky
      const bassFreq = bassline[beat % bassline.length];
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = "triangle";
      bassOsc.frequency.setValueAtTime(bassFreq, now);
      bassGain.gain.setValueAtTime(0.12, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      bassOsc.connect(bassGain);
      bassGain.connect(this.musicGain);
      bassOsc.start(now);
      bassOsc.stop(now + 0.18);

      // Melodía ligera alegre
      if (beat % 2 === 0) {
        const leadFreq = arpeggio[(beat / 2) % arpeggio.length];
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = "sine";
        leadOsc.frequency.setValueAtTime(leadFreq, now);
        leadGain.gain.setValueAtTime(0.08, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        leadOsc.connect(leadGain);
        leadGain.connect(this.musicGain);
        leadOsc.start(now);
        leadOsc.stop(now + 0.15);
      }

      // Hit-hat sintético percusivo
      if (beat % 2 === 1) {
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.03, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(6000, now);
        const hatGain = this.ctx.createGain();
        hatGain.gain.setValueAtTime(0.03, now);
        hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

        whiteNoise.connect(filter);
        filter.connect(hatGain);
        hatGain.connect(this.musicGain);

        whiteNoise.start(now);
        whiteNoise.stop(now + 0.03);
      }

      beat++;
    };

    playStep();
    this.musicTimer = setInterval(playStep, tempo);
  }
}

// Instancia global
window.audioMgr = new SoundEngine();
