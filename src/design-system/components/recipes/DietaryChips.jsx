import React from 'react'
import { Tag } from '../core/Tag.jsx'

export const DIETARY_LABELS = ['Nut-free', 'Dairy-free', 'Gluten-free', 'Meat-free']

export function DietaryChips({ options = DIETARY_LABELS, value = [], onChange, style, ...rest }) {
  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  const toggle = (optionValue) => {
    if (!onChange) return
    onChange(value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue])
  }
  return React.createElement('div', {
    ...rest,
    style: { display: 'flex', flexWrap: 'wrap', gap: 8, ...style },
  }, normalized.map((o) => React.createElement(Tag, {
    key: o.value,
    selected: value.includes(o.value),
    filled: true,
    onClick: () => toggle(o.value),
  }, o.label)))
}
