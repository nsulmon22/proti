import React from 'react'
import { IconButton } from '../core/IconButton.jsx'

export function Dialog({ open = false, title, description, onClose, footer, width = 460, children, style, ...rest }) {
  if (!open) return null
  return React.createElement('div', {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      background: 'var(--scrim)',
      backdropFilter: 'var(--blur-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
    },
  }, React.createElement('div', {
    role: 'dialog',
    'aria-modal': 'true',
    onClick: (e) => e.stopPropagation(),
    ...rest,
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-l)',
      padding: 'var(--space-8)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      ...style,
    },
  },
    React.createElement('div', {
      style: { display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' },
    },
      React.createElement('div', {
        style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 6 },
      },
        title ? React.createElement('h3', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--size-heading-m)',
            color: 'var(--text-heading)',
            margin: 0,
            letterSpacing: 'var(--tracking-snug)',
          },
        }, title) : null,
        description ? React.createElement('p', {
          style: {
            margin: 0,
            fontSize: 'var(--size-body-m)',
            color: 'var(--text-muted)',
            lineHeight: 'var(--leading-normal)',
          },
        }, description) : null,
      ),
      onClose ? React.createElement(IconButton, { icon: 'x', variant: 'plain', size: 's', label: 'Close', onClick: onClose }) : null,
    ),
    children,
    footer ? React.createElement('div', {
      style: { display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' },
    }, footer) : null,
  ))
}
