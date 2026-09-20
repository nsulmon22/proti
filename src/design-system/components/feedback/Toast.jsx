import React from 'react'
import { Icon } from '../core/Icon.jsx'

const TONES = {
  neutral: { bg: 'var(--ink-0)', fg: 'var(--cream-0)', icon: 'info' },
  success: { bg: 'var(--mint-300)', fg: 'var(--ink-0)', icon: 'check' },
  warning: { bg: 'var(--amber-200)', fg: 'var(--ink-0)', icon: 'triangle-alert' },
  danger: { bg: 'var(--clay-200)', fg: 'var(--ink-0)', icon: 'circle-alert' },
}

export function Toast({ tone = 'neutral', message, action, onAction, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral
  return React.createElement('div', {
    role: 'status',
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '12px 14px 12px 16px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      boxShadow: 'var(--shadow-m)',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-body-m)',
      fontWeight: 'var(--weight-medium)',
      ...style,
    },
  },
    React.createElement(Icon, { name: t.icon, size: 18 }),
    React.createElement('span', null, message),
    action ? React.createElement('button', {
      type: 'button',
      onClick: onAction,
      style: {
        border: 'none',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-body-m)',
        fontWeight: 'var(--weight-semibold)',
        textDecoration: 'underline',
        textUnderlineOffset: 3,
        padding: '0 4px',
      },
    }, action) : null,
    onDismiss ? React.createElement('button', {
      type: 'button',
      'aria-label': 'Dismiss',
      onClick: onDismiss,
      style: {
        display: 'inline-flex',
        border: 'none',
        background: 'transparent',
        color: 'inherit',
        cursor: 'pointer',
        padding: 4,
      },
    }, React.createElement(Icon, { name: 'x', size: 16 })) : null,
  )
}
