import React from 'react'
import { Icon } from '../core/Icon.jsx'

export function Input({ label, hint, error, iconLeft, size = 'm', disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const autoId = React.useId()
  const uid = id || autoId
  const h = size === 's' ? 'var(--control-height-s)' : size === 'l' ? 'var(--control-height-l)' : 'var(--control-height-m)'
  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 6, ...style },
  },
    label ? React.createElement('label', {
      htmlFor: uid,
      style: { fontSize: 'var(--size-body-s)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' },
    }, label) : null,
    React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: h,
        padding: '0 16px',
        background: disabled ? 'var(--cream-2)' : 'var(--surface-card)',
        border: `1px solid ${error ? 'var(--status-danger-fg)' : focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        borderRadius: 'var(--radius-field)',
        transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
      },
    },
      iconLeft ? React.createElement(Icon, { name: iconLeft, size: 18, color: 'var(--ink-3)' }) : null,
      React.createElement('input', {
        id: uid,
        disabled,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        ...rest,
        style: {
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-text)',
          fontSize: 'var(--size-body-m)',
          color: 'var(--text-body)',
        },
      }),
    ),
    error || hint ? React.createElement('span', {
      style: { fontSize: 'var(--size-body-s)', color: error ? 'var(--status-danger-fg)' : 'var(--text-subtle)' },
    }, error || hint) : null,
  )
}
