// Procedural Web Audio API sound engine
// 100% self-contained, lightweight, zero external asset network requests.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hmr_sound_enabled');
      this.enabled = stored === 'true';
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('hmr_sound_enabled', String(this.enabled));
    }
    if (this.enabled) {
      this.initContext();
      this.playTactileClick(0.08);
    }
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('hmr_sound_enabled', String(this.enabled));
    }
    if (val) this.initContext();
  }

  // Soft tactile click for UI buttons & tabs
  public playTactileClick(volume: number = 0.05) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.025);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);
      filter.Q.setValueAtTime(2, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio context may be restricted
    }
  }

  // Delicate paper-nib friction sound during handwriting strokes
  public playPenScratch(durationMs: number = 220, intensity: number = 0.025) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const dur = durationMs / 1000;
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Filtered pink-ish noise simulation for pen friction
      let lastVal = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastVal + (0.02 * white)) / 1.02;
        lastVal = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400 + Math.random() * 800, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(intensity, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch {
      // audio error handling
    }
  }

  // Gentle harmonic glint when the signature completes
  public playGoldSettle() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.06);

        gain.gain.setValueAtTime(0.0001, t + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.02, t + i * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.55);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + i * 0.06);
        osc.stop(t + i * 0.06 + 0.6);
      });
    } catch {
      // error handled
    }
  }

  // 3D mechanical/spatial feedback on robot rotation & inspection
  public playRobotInspect() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, this.ctx.currentTime + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // error handled
    }
  }
}

export const sound = new SoundEngine();
