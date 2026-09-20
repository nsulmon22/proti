import React from 'react'
import { Icon } from '../core/Icon.jsx'

export function Checkbox({ checked = false, onChange, label, description, disabled = false, style, ...rest }) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
  },
    React.createElement('input', {
      type: 'checkbox',
      checked,
      disabled,
      onChange: (e) => onChange && onChange(e.target.checked),
      style: { position: 'absolute', opacity: 0, width: 0, height: 0 },
      ...rest,
    }),
    React.createElement('span', {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        flex: '0 0 auto',
        marginTop: description ? 1 : 0,
        borderRadius: 'var(--radius-xs)',
        border: checked ? '1px solid var(--mint-400)' : '1px solid var(--border-default)',
        background: checked ? 'var(--mint-300)' : 'var(--surface-card)',
        transition: 'background var(--duration-fast) var(--ease-standard)',
      },
    }, checked ? React.createElement(Icon, { name: 'check', size: 15, color: 'var(--ink-0)' }) : null),
    label ? React.createElement('span', {
      style: { display: 'flex', flexDirection: 'column', gap: 2 },
    },
      React.createElement('span', { style: { fontSize: 'var(--size-body-m)', color: 'var(--text-body)' } }, label),
      description ? React.createElement('span', { style: { fontSize: 'var(--size-body-s)', color: 'var(--text-subtle)' } }, description) : null,
    ) : null,
  )
}
