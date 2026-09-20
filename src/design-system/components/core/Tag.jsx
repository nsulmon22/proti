import React from 'react'
import { Icon } from './Icon.jsx'

export function Tag({ selected = false, removable = false, filled = false, onRemove, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false)
  return React.createElement('button', {
    type: 'button',
    'aria-pressed': selected,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 34,
      padding: removable ? '0 8px 0 14px' : '0 14px',
      borderRadius: 'var(--radius-pill)',
      border: selected ? '1px solid var(--mint-400)' : '1px solid var(--border-default)',
      background: selected ? 'var(--mint-200)' : hover ? 'var(--cream-2)' : filled ? 'var(--surface-card)' : 'transparent',
      color: 'var(--ink-1)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flex: '0 0 auto',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--size-body-s)',
      fontWeight: 'var(--weight-medium)',
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      ...style,
    },
  },
    children,
    removable ? React.createElement('span', {
      onClick: (e) => {
        e.stopPropagation()
        onRemove?.()
      },
      style: {
        display: 'inline-flex',
        padding: 3,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--cream-2)',
      },
    }, React.createElement(Icon, { name: 'x', size: 12 })) : null,
  )
}
