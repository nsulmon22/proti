import React from 'react'
import { Icon } from '../core/Icon.jsx'

/** Three tiers: quick (mint), moderate (light paprika), long (deep paprika). */
export function timeTier(minutes) {
  if (minutes == null) return null
  if (minutes <= 15) return 'quick'
  if (minutes <= 30) return 'moderate'
  return 'long'
}

const TIERS = {
  quick: { bg: 'var(--mint-300)', fg: 'var(--ink-0)' },
  moderate: { bg: 'var(--paprika-200)', fg: 'var(--paprika-500)' },
  long: { bg: 'var(--paprika-400)', fg: 'var(--text-on-bold)' },
}

export function TimePill({ minutes, size = 'm', style, ...rest }) {
  const tier = TIERS[timeTier(minutes) || 'quick']
  const s = size === 's'
  return React.createElement('span', {
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s ? 4 : 5,
      height: s ? 24 : 28,
      padding: s ? '0 8px' : '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: tier.bg,
      color: tier.fg,
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: s ? 12 : 'var(--size-body-s)',
      whiteSpace: 'nowrap',
      ...style,
    },
  }, React.createElement(Icon, { name: 'clock', size: s ? 13 : 15 }), minutes, ' min')
}
