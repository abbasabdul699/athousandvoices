export type ConfettiSoundRank = 'First Place' | 'Second Place' | 'Third Place'

let sharedCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!sharedCtx) sharedCtx = new AC()
  return sharedCtx
}

/** Call once after user gesture so scroll-triggered confetti can play audio (browser autoplay policy). */
export function primeConfettiAudio(): void {
  const ctx = getAudioContext()
  if (ctx?.state === 'suspended') void ctx.resume()
}

function rankPeak(rank: ConfettiSoundRank): number {
  switch (rank) {
    case 'First Place':
      return 0.2
    case 'Second Place':
      return 0.17
    default:
      return 0.14
  }
}

function rankFilterHz(rank: ConfettiSoundRank): number {
  switch (rank) {
    case 'First Place':
      return 2550
    case 'Second Place':
      return 2100
    default:
      return 1800
  }
}

function noiseBurst(
  ctx: AudioContext,
  dest: GainNode,
  start: number,
  duration: number,
  filterHz: number,
  peak: number
): void {
  const len = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1

  const src = ctx.createBufferSource()
  src.buffer = buf

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = filterHz
  filter.Q.value = 0.82

  const env = ctx.createGain()
  const t0 = start
  env.gain.setValueAtTime(0.0001, t0)
  env.gain.linearRampToValueAtTime(peak, t0 + 0.005)
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  src.connect(filter)
  filter.connect(env)
  env.connect(dest)

  src.start(t0)
  src.stop(t0 + duration + 0.025)
}

function snap(
  ctx: AudioContext,
  dest: GainNode,
  start: number,
  f0: number,
  f1: number,
  vol: number
): void {
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(f0, start)
  osc.frequency.exponentialRampToValueAtTime(Math.max(80, f1), start + 0.045)

  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, start)
  g.gain.linearRampToValueAtTime(vol, start + 0.008)
  g.gain.exponentialRampToValueAtTime(0.0001, start + 0.075)

  osc.connect(g)
  g.connect(dest)
  osc.start(start)
  osc.stop(start + 0.085)
}

/**
 * Short “party popper” layers timed with confetti waves. Skipped when reduced motion is on.
 * Requires prior user interaction for `AudioContext` (see `primeConfettiAudio`).
 */
export function playConfettiExplosionSounds(rank: ConfettiSoundRank): void {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const ctx = getAudioContext()
  if (!ctx) return

  const peak = rankPeak(rank)
  const hz = rankFilterHz(rank)

  const run = (): void => {
    if (ctx.state !== 'running') return

    const master = ctx.createGain()
    master.gain.value = 0.92
    master.connect(ctx.destination)

    const base = ctx.currentTime

    noiseBurst(ctx, master, base, 0.1, hz, peak * 0.95)
    snap(ctx, master, base, 340, 720, peak * 0.32)

    noiseBurst(ctx, master, base + 0.16, 0.085, hz * 0.93, peak * 0.55)
    snap(ctx, master, base + 0.16, 300, 560, peak * 0.2)

    noiseBurst(ctx, master, base + 0.34, 0.07, hz * 0.88, peak * 0.38)
  }

  void ctx.resume().then(run).catch(() => {})
}
