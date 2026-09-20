import React from 'react'

export function MacroBar({ protein = 0, carbs = 0, fat = 0, showLegend = true, height = 10, style, ...rest }) {
  const total = Math.max(protein + carbs + fat, 1)
  const parts = [
    { key: 'Protein', grams: protein, color: 'var(--macro-protein)' },
    { key: 'Carbs', grams: carbs, color: 'var(--macro-carb)' },
    { key: 'Fat', grams: fat, color: 'var(--macro-fat)' },
  ]
  return React.createElement('div', {
    ...rest,
    style: { display: 'flex', flexDirection: 'column', gap: 10, ...style },
  },
    React.createElement('div', {
      style: { display: 'flex', gap: 3, height, borderRadius: 'var(--radius-pill)', overflow: 'hidden', background: 'var(--cream-2)' },
    }, parts.map((p) => React.createElement('span', {
      key: p.key,
      style: { width: `${(p.grams / total) * 100}%`, background: p.color, borderRadius: 'var(--radius-pill)' },
    }))),
    showLegend ? React.createElement('div', {
      style: { display: 'flex', gap: 'var(--space-5)' },
    }, parts.map((p) => React.createElement('span', {
      key: p.key,
      style: { display: 'inline-flex', alignItems: 'center', gap: 7 },
    },
      React.createElement('span', { style: { width: 8, height: 8, borderRadius: 'var(--radius-pill)', background: p.color } }),
      React.createElement('span', { style: { fontSize: 'var(--size-body-s)', color: 'var(--text-muted)' } }, p.key),
      React.createElement('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 'var(--size-body-s)', color: 'var(--text-heading)' } }, p.grams, 'g'),
    ))) : null,
  )
}
