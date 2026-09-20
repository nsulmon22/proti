import React from 'react'

const BASE = 'https://unpkg.com/lucide-static@0.462.0/icons/'

export function Icon({ name = 'utensils', size = 20, color = 'currentColor', style, ...rest }) {
  const url = BASE + name + '.svg'
  return React.createElement('span', {
    'aria-hidden': 'true',
    ...rest,
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      backgroundColor: color,
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style,
    },
  })
}
