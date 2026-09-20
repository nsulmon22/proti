import React from 'react'

const TONES = {
  default: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' },
  sunken: { background: 'var(--surface-sunken)', border: '1px solid transparent' },
  accent: { background: 'var(--mint-100)', border: '1px solid var(--mint-200)' },
  sand: { background: 'var(--sand-100)', border: '1px solid var(--sand-200)' },
  leaf: { background: 'var(--leaf-200)', border: '1px solid var(--leaf-300)' },
  inverse: { background: 'var(--ink-0)', border: '1px solid var(--ink-1)' },
}

const PADS = { none: 0, s: 'var(--space-4)', m: 'var(--space-6)', l: 'var(--space-8)' }

export function Card({ tone = 'default', padding = 'm', elevation = 's', interactive = false, children, style, ...rest }) {
  const t = TONES[tone] || TONES.default
  const [hover, setHover] = React.useState(false)
  return React.createElement('div', {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    ...rest,
    style: {
      background: t.background,
      border: t.border,
      color: tone === 'inverse' ? 'var(--text-inverse)' : 'var(--text-body)',
      borderRadius: 'var(--radius-card)',
      padding: PADS[padding],
      boxShadow: `var(--shadow-${interactive && hover ? 'm' : elevation})`,
      transform: interactive && hover ? 'translateY(var(--hover-lift))' : 'none',
      cursor: interactive ? 'pointer' : undefined,
      transition: 'box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)',
      ...style,
    },
  }, children)
}
