import React from 'react'

// The Lucide heart, drawn inline instead of as a mask so it can be filled when a
// recipe is a favorite. Muted clay red: outline only when off, filled when on.
const PATH =
  'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'

export function HeartIcon({ filled = false, size = 20, style, ...rest }) {
  // Pop only on the false -> true transition (favoriting), never on mount —
  // an already-favorited heart shouldn't animate just because it rendered.
  const wasFilled = React.useRef(filled)
  const [popping, setPopping] = React.useState(false)
  React.useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (filled && !wasFilled.current && !reduceMotion) setPopping(true)
    wasFilled.current = filled
  }, [filled])

  return React.createElement('svg', {
    'aria-hidden': 'true',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: filled ? 'var(--clay-500)' : 'none',
    stroke: 'var(--clay-500)',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    onAnimationEnd: () => setPopping(false),
    ...rest,
    style: {
      flex: '0 0 auto',
      transition: 'fill var(--duration-fast) var(--ease-standard)',
      animation: popping ? 'heart-pop var(--duration-slow) var(--ease-out)' : undefined,
      transformOrigin: 'center',
      ...style,
    },
  }, React.createElement('path', { d: PATH }))
}
