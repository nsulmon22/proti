import React from 'react'

export function Switch({ checked = false, onChange, label, disabled = false, style, ...rest }) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style,
    },
  },
    React.createElement('input', {
      type: 'checkbox',
      role: 'switch',
      checked,
      disabled,
      onChange: (e) => onChange && onChange(e.target.checked),
      style: { position: 'absolute', opacity: 0, width: 0, height: 0 },
      ...rest,
    }),
    React.createElement('span', {
      style: {
        position: 'relative',
        width: 48,
        height: 28,
        flex: '0 0 auto',
        borderRadius: 'var(--radius-pill)',
        background: checked ? 'var(--mint-400)' : 'var(--cream-3)',
        transition: 'background var(--duration-base) var(--ease-standard)',
      },
    }, React.createElement('span', {
      style: {
        position: 'absolute',
        top: 3,
        left: checked ? 23 : 3,
        width: 22,
        height: 22,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--cream-0)',
        boxShadow: 'var(--shadow-xs)',
        transition: 'left var(--duration-base) var(--ease-out)',
      },
    })),
    label ? React.createElement('span', { style: { fontSize: 'var(--size-body-m)', color: 'var(--text-body)' } }, label) : null,
  )
}
