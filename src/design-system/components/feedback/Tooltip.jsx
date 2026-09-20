import React from 'react'

export function Tooltip({ content, placement = 'top', children, style, ...rest }) {
  const [open, setOpen] = React.useState(false)
  const pos = {
    top: { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    left: { right: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
    right: { left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' },
  }[placement]
  return React.createElement('span', {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    ...rest,
    style: { position: 'relative', display: 'inline-flex', ...style },
  },
    children,
    open ? React.createElement('span', {
      role: 'tooltip',
      style: {
        position: 'absolute',
        zIndex: 70,
        ...pos,
        background: 'var(--ink-0)',
        color: 'var(--cream-0)',
        padding: '7px 12px',
        borderRadius: 'var(--radius-s)',
        fontFamily: 'var(--font-text)',
        fontSize: 'var(--size-body-s)',
        lineHeight: 1.35,
        whiteSpace: 'nowrap',
        boxShadow: 'var(--shadow-s)',
        pointerEvents: 'none',
      },
    }, content) : null,
  )
}
