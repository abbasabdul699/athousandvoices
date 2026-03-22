import confetti from 'canvas-confetti'
import { playConfettiExplosionSounds } from '@/lib/confetti-sound'

export type WinnerPlaceRank = 'First Place' | 'Second Place' | 'Third Place'

function palette(rank: WinnerPlaceRank): string[] {
  switch (rank) {
    case 'First Place':
      return ['#FFD700', '#fabc68', '#FFE566', '#FFF8DC', '#ffffff']
    case 'Second Place':
      return ['#C8C8C8', '#E8E8E8', '#A0A0A0', '#ffffff', '#d4d4d4']
    default:
      return ['#CD7F32', '#E6A85C', '#8B5A2B', '#FFF5E6', '#c99352']
  }
}

function particleTotal(rank: WinnerPlaceRank): number {
  switch (rank) {
    case 'First Place':
      return 340
    case 'Second Place':
      return 280
    default:
      return 230
  }
}

/** Confetti burst when a winner section scroll-reveal finishes. Respects reduced motion. */
export function fireWinnerPlaceConfetti(rank: WinnerPlaceRank): void {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  playConfettiExplosionSounds(rank)

  const colors = palette(rank)
  const total = particleTotal(rank)

  const burst = (ratio: number, opts: confetti.Options) => {
    void confetti({
      disableForReducedMotion: true,
      colors,
      ticks: 260,
      gravity: 1.02,
      ...opts,
      particleCount: Math.max(12, Math.floor(total * ratio)),
    })
  }

  // Initial wide fan — left, center, right
  burst(0.2, { spread: 42, startVelocity: 52, origin: { x: 0.08, y: 0.34 } })
  burst(0.24, { spread: 62, startVelocity: 48, origin: { x: 0.5, y: 0.26 } })
  burst(0.26, { spread: 92, decay: 0.89, scalar: 0.88, origin: { x: 0.92, y: 0.36 } })
  // Extra side streams
  burst(0.14, { spread: 55, startVelocity: 50, origin: { x: 0.22, y: 0.4 } })
  burst(0.14, { spread: 55, startVelocity: 50, origin: { x: 0.78, y: 0.4 } })
  burst(0.12, { spread: 110, startVelocity: 36, origin: { x: 0.5, y: 0.12 } })

  window.setTimeout(() => {
    burst(0.14, { spread: 105, startVelocity: 42, origin: { x: 0.28, y: 0.18 } })
    burst(0.14, { spread: 105, startVelocity: 42, origin: { x: 0.72, y: 0.18 } })
    burst(0.12, { spread: 100, startVelocity: 40, origin: { x: 0.5, y: 0.22 } })
    burst(0.1, { spread: 88, decay: 0.92, origin: { x: 0.12, y: 0.28 } })
    burst(0.1, { spread: 88, decay: 0.92, origin: { x: 0.88, y: 0.28 } })
  }, 160)

  window.setTimeout(() => {
    burst(0.1, { spread: 120, startVelocity: 34, origin: { x: 0.4, y: 0.14 } })
    burst(0.1, { spread: 120, startVelocity: 34, origin: { x: 0.6, y: 0.14 } })
    burst(0.08, { spread: 95, scalar: 0.75, origin: { x: 0.5, y: 0.45 } })
  }, 340)
}
