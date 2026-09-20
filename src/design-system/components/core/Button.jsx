import React from 'react'
import { Icon } from './Icon.jsx'

const TONES = {
  primary: { background: 'var(--mint-300)', color: 'var(--ink-0)', border: '1px solid transparent', hover: 'var(--mint-400)' },
  secondary: { background: 'var(--sand-300)', color: 'var(--ink-0)', border: '1px solid transparent', hover: 'var(--sand-400)' },
  tertiary: { background: 'var(--leaf-200)', color: 'var(--ink-0)', border: '1px solid transparent', hover: 'var(--leaf-300)' },
  outline: { background: 'transparent', color: 'var(--ink-0)', border: '1px solid var(--border-default)', hover: 'var(--cream-2)' },
  ghost: { background: 'transparent', color: 'var(--ink-1)', border: '1px solid transparent', hover: 'var(--cream-2)' },
  inverse: { background: 'var(--ink-0)', color: 'var(--cream-0)', border: '1px solid transparent', hover: 'var(--ink-1)' },
}

const SIZES = {
  s: { height: 'var(--control-height-s)', padding: '0 14px', fontSize: 'var(--size-body-s)', gap: 6, icon: 16 },
  m: { height: 'var(--control-height-m)', padding: '0 22px', fontSize: 'var(--size-body-m)', gap: 8, icon: 18 },
  l: { height: 'var(--control-height-l)', padding: '0 30px', fontSize: 'var(--size-body-l)', gap: 10, icon: 20 },
}

export function Button({
  variant = 'primary',
  size = 'm',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = 'button',
  children,
  style,
  ...rest
}) {
  const t = TONES[variant] || TONES.primary
  const s = SIZES[size] || SIZES.m
  const [hover, setHover] = React.useState(false)
  const [press, setPress] = React.useState(false)
  return React.createElement('button', {
    type,
    disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false)
      setPress(false)
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    ...rest,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-text)',
      fontSize: s.fontSize,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-snug)',
      borderRadius: 'var(--radius-control)',
      border: t.border,
      background: disabled ? 'var(--cream-2)' : hover ? t.hover : t.background,
      color: disabled ? 'var(--ink-4)' : t.color,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transform: press && !disabled ? 'scale(var(--press-scale))' : 'none',
      transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
      ...style,
    },
  },
    iconLeft ? React.createElement(Icon, { name: iconLeft, size: s.icon }) : null,
    children,
    iconRight ? React.createElement(Icon, { name: iconRight, size: s.icon }) : null,
  )
}
