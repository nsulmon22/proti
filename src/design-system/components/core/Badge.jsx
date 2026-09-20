import React from 'react'
import { Icon } from './Icon.jsx'

const TONES = {
  neutral: { background: 'var(--cream-2)', color: 'var(--ink-1)' },
  mint: { background: 'var(--mint-200)', color: 'var(--ink-0)' },
  sand: { background: 'var(--sand-200)', color: 'var(--ink-0)' },
  leaf: { background: 'var(--leaf-200)', color: 'var(--ink-0)' },
  success: { background: 'var(--status-success-bg)', color: 'var(--status-success-fg)' },
  warning: { background: 'var(--status-warning-bg)', color: 'var(--status-warning-fg)' },
  danger: { background: 'var(--status-danger-bg)', color: 'var(--status-danger-fg)' },
}

export function Badge({ tone = 'neutral', icon, children, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral
  return React.createElement('span', {
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.background,
      color: t.color,
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      ...style,
    },
  }, icon ? React.createElement(Icon, { name: icon, size: 13 }) : null, children)
}
