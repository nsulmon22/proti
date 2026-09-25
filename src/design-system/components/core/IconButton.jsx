import React from 'react'
import { Icon } from './Icon.jsx'
import { HeartIcon } from './HeartIcon.jsx'

const TONES = {
  soft: { background: 'var(--cream-2)', color: 'var(--ink-1)', hover: 'var(--cream-3)' },
  accent: { background: 'var(--mint-300)', color: 'var(--ink-0)', hover: 'var(--mint-400)' },
  plain: { background: 'transparent', color: 'var(--ink-1)', hover: 'var(--cream-2)' },
  overlay: { background: 'rgba(255,253,248,.86)', color: 'var(--ink-0)', hover: 'var(--cream-0)' },
}

const SIZES = { s: 32, m: 40, l: 48 }

export function IconButton({ icon = 'heart', variant = 'soft', size = 'm', label, active = false, style, ...rest }) {
  const t = TONES[variant] || TONES.soft
  const px = SIZES[size] || SIZES.m
  const [hover, setHover] = React.useState(false)
  // The favorite heart is clay red; switched on it fills and sits on a soft clay background.
  const heart = icon === 'heart'
  const activeBackground = heart ? 'var(--clay-200)' : 'var(--mint-300)'
  const glyph = px <= 32 ? 16 : px <= 40 ? 18 : 20
  return React.createElement('button', {
    type: 'button',
    'aria-label': label,
    'aria-pressed': active || undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      background: active ? activeBackground : hover ? t.hover : t.background,
      color: t.color,
      cursor: 'pointer',
      backdropFilter: variant === 'overlay' ? 'var(--blur-overlay)' : undefined,
      transition: 'background var(--duration-fast) var(--ease-standard)',
      ...style,
    },
  }, heart
    ? React.createElement(HeartIcon, { filled: active, size: glyph })
    : React.createElement(Icon, { name: icon, size: glyph }))
}
