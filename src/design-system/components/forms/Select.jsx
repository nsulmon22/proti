import React from 'react'
import { Icon } from '../core/Icon.jsx'

export function Select({ label, hint, options = [], disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false)
  const autoId = React.useId()
  const uid = id || autoId
  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: 6, ...style },
  },
    label ? React.createElement('label', {
      htmlFor: uid,
      style: { fontSize: 'var(--size-body-s)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' },
    }, label) : null,
    React.createElement('div', {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: 'var(--control-height-m)',
        borderRadius: 'var(--radius-field)',
        background: disabled ? 'var(--cream-2)' : 'var(--surface-card)',
        border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-default)'}`,
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      },
    },
      React.createElement('select', {
        id: uid,
        disabled,
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        ...rest,
        style: {
          appearance: 'none',
          WebkitAppearance: 'none',
          flex: 1,
          height: '100%',
          padding: '0 42px 0 16px',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontFamily: 'var(--font-text)',
          fontSize: 'var(--size-body-m)',
          color: 'var(--text-body)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: 'var(--radius-field)',
        },
      }, options.map((o) => {
        const value = typeof o === 'string' ? o : o.value
        const lbl = typeof o === 'string' ? o : o.label
        return React.createElement('option', { key: value, value }, lbl)
      })),
      React.createElement(Icon, {
        name: 'chevron-down',
        size: 18,
        color: 'var(--ink-3)',
        style: { position: 'absolute', right: 14, pointerEvents: 'none' },
      }),
    ),
    hint ? React.createElement('span', { style: { fontSize: 'var(--size-body-s)', color: 'var(--text-subtle)' } }, hint) : null,
  )
}
