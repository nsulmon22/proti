import React from 'react'

export function Radio({ checked = false, onChange, label, description, name, value, disabled = false, style, ...rest }) {
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
      type: 'radio',
      name,
      value,
      checked,
      disabled,
      onChange: () => onChange && onChange(value),
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
        borderRadius: 'var(--radius-pill)',
        border: checked ? '1px solid var(--mint-400)' : '1px solid var(--border-default)',
        background: 'var(--surface-card)',
      },
    }, checked ? React.createElement('span', {
      style: { width: 11, height: 11, borderRadius: 'var(--radius-pill)', background: 'var(--mint-500)' },
    }) : null),
    label ? React.createElement('span', {
      style: { display: 'flex', flexDirection: 'column', gap: 2 },
    },
      React.createElement('span', { style: { fontSize: 'var(--size-body-m)', color: 'var(--text-body)' } }, label),
      description ? React.createElement('span', { style: { fontSize: 'var(--size-body-s)', color: 'var(--text-subtle)' } }, description) : null,
    ) : null,
  )
}
