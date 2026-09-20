import React from 'react'

export function Tabs({ items = [], value, onChange, variant = 'pill', style, ...rest }) {
  const active = value ?? (items[0] && (items[0].value ?? items[0]))
  const norm = items.map((i) => (typeof i === 'string' ? { value: i, label: i } : i))

  if (variant === 'underline') {
    return React.createElement('div', {
      role: 'tablist',
      ...rest,
      style: { display: 'flex', gap: 'var(--space-6)', borderBottom: '1px solid var(--border-subtle)', ...style },
    }, norm.map((i) => {
      const on = i.value === active
      return React.createElement('button', {
        key: i.value,
        role: 'tab',
        'aria-selected': on,
        onClick: () => onChange && onChange(i.value),
        style: {
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          padding: '10px 2px 12px',
          fontFamily: 'var(--font-text)',
          fontSize: 'var(--size-body-m)',
          fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
          color: on ? 'var(--text-heading)' : 'var(--text-subtle)',
          boxShadow: on ? 'inset 0 -2px 0 0 var(--mint-500)' : 'none',
        },
      }, i.label)
    }))
  }

  return React.createElement('div', {
    role: 'tablist',
    ...rest,
    style: { display: 'inline-flex', gap: 4, padding: 4, background: 'var(--cream-2)', borderRadius: 'var(--radius-pill)', ...style },
  }, norm.map((i) => {
    const on = i.value === active
    return React.createElement('button', {
      key: i.value,
      role: 'tab',
      'aria-selected': on,
      onClick: () => onChange && onChange(i.value),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: '0 18px',
        height: 36,
        borderRadius: 'var(--radius-pill)',
        background: on ? 'var(--surface-card)' : 'transparent',
        boxShadow: on ? 'var(--shadow-xs)' : 'none',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-body-s)',
        fontWeight: 'var(--weight-semibold)',
        color: on ? 'var(--text-heading)' : 'var(--text-muted)',
        transition: 'background var(--duration-fast) var(--ease-standard)',
      },
    }, i.label)
  }))
}
