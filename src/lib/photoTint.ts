// A very soft page tint derived from a recipe photo. The plain average of a
// food photo comes out muddy grey-brown, so instead we take the most vivid hue
// (weighted by saturation x brightness) and mix a little of it into the page cream.

const CREAM = [250, 248, 241] // --cream-1, the page surface
export const TINT_STRENGTH = 0.16
const SAMPLE = 64
const HUE_BUCKETS = 24

const cache = new Map<string, Promise<string | null>>()

function hsvOf(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b) / 255
  const min = Math.min(r, g, b) / 255
  const d = max - min
  const rn = r / 255
  const gn = g / 255
  let h = 0
  if (d > 0) {
    if (max === rn) h = ((gn - b / 255) / d) % 6
    else if (max === gn) h = (b / 255 - rn) / d + 2
    else h = (rn - gn) / d + 4
    h /= 6
    if (h < 0) h += 1
  }
  return [h, max === 0 ? 0 : d / max, max]
}

function rgbOf(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  const [r, g, b] = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ][i % 6]
  return [r * 255, g * 255, b * 255]
}

function tintFromPixels(data: Uint8ClampedArray): string {
  const buckets = new Map<number, { w: number; r: number; g: number; b: number }>()
  let sumR = 0
  let sumG = 0
  let sumB = 0
  const count = data.length / 4

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    sumR += r
    sumG += g
    sumB += b
    const [h, s, v] = hsvOf(r, g, b)
    if (v < 0.25 || s < 0.2) continue
    const key = Math.floor(h * HUE_BUCKETS)
    const w = s * v
    const e = buckets.get(key) ?? { w: 0, r: 0, g: 0, b: 0 }
    e.w += w
    e.r += r * w
    e.g += g * w
    e.b += b * w
    buckets.set(key, e)
  }

  let base: number[] = [sumR / count, sumG / count, sumB / count]
  let best: { w: number; r: number; g: number; b: number } | undefined
  for (const e of buckets.values()) if (!best || e.w > best.w) best = e
  if (best) {
    const [h, s, v] = hsvOf(best.r / best.w, best.g / best.w, best.b / best.w)
    base = rgbOf(h, Math.min(1, s * 1.15), Math.max(v, 0.7))
  }

  const mixed = base.map((c, i) => Math.round(c * TINT_STRENGTH + CREAM[i] * (1 - TINT_STRENGTH)))
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`
}

function computeTint(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const scale = SAMPLE / Math.max(img.naturalWidth, img.naturalHeight)
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale))
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return resolve(null)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(tintFromPixels(ctx.getImageData(0, 0, canvas.width, canvas.height).data))
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

// Resolves to a CSS colour, or null when the photo can't be read (the page then
// simply keeps its normal background).
export function getPhotoTint(url: string): Promise<string | null> {
  let hit = cache.get(url)
  if (!hit) {
    hit = computeTint(url)
    cache.set(url, hit)
  }
  return hit
}
