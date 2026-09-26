import React from 'react'
import { Icon } from '../core/Icon.jsx'
import { IconButton } from '../core/IconButton.jsx'
import { Card } from '../core/Card.jsx'
import { Badge } from '../core/Badge.jsx'
import { TimePill } from './TimePill.jsx'

const TINTS = ['var(--sand-200)', 'var(--mint-200)', 'var(--leaf-300)']

function Stat({ icon, children }) {
  return React.createElement('span', {
    style: { display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' },
  }, React.createElement(Icon, { name: icon, size: 15, color: 'var(--ink-3)' }), children)
}

export function RecipeCard({
  title = 'Untitled recipe',
  image,
  tint = 0,
  minutes,
  protein,
  calories,
  servings,
  tags = [],
  saved = false,
  onSave,
  layout = 'vertical',
  style,
  ...rest
}) {
  const horizontal = layout === 'horizontal'
  const media = React.createElement('div', {
    style: {
      position: 'relative',
      width: horizontal ? 124 : '100%',
      height: horizontal ? undefined : 132,
      minHeight: horizontal ? 124 : undefined,
      flex: '0 0 auto',
      background: image ? `url(${image}) center/cover` : TINTS[tint % TINTS.length],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
    !image ? React.createElement(Icon, { name: 'utensils-crossed', size: 26, color: 'rgba(28,32,25,.30)' }) : null,
    onSave ? React.createElement(IconButton, {
      icon: 'heart',
      variant: 'overlay',
      size: 's',
      label: saved ? 'Remove from favorites' : 'Add to favorites',
      active: saved,
      onClick: (e) => {
        e.stopPropagation()
        onSave()
      },
      style: { position: 'absolute', top: 8, right: 8 },
    }) : null,
  )
  return React.createElement(Card, {
    padding: 'none',
    interactive: true,
    ...rest,
    style: { overflow: 'hidden', display: 'flex', flexDirection: horizontal ? 'row' : 'column', ...style },
  },
    media,
    React.createElement('div', {
      style: { padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 8, flex: 1, minWidth: 0 },
    },
      React.createElement('h3', {
        style: {
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--size-heading-s)',
          fontWeight: 'var(--weight-semibold)',
          color: 'var(--text-heading)',
          margin: 0,
          letterSpacing: 'var(--tracking-snug)',
        },
      }, title),
      React.createElement('div', {
        style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 12px', color: 'var(--text-muted)', fontSize: 'var(--size-body-s)' },
      },
        calories != null ? React.createElement(Stat, { icon: 'flame' }, calories, ' kcal') : null,
        protein != null ? React.createElement(Stat, { icon: 'dumbbell' }, protein, 'g protein') : null,
        servings != null ? React.createElement(Stat, { icon: 'users' }, servings, servings === 1 ? ' serving' : ' servings') : null,
      ),
      tags.length ? React.createElement('div', {
        style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 },
      }, tags.map((t) => React.createElement(Badge, { key: t, tone: 'neutral' }, t))) : null,
      minutes != null ? React.createElement('div', {
        style: { marginTop: 'auto', paddingTop: 4 },
      }, React.createElement(TimePill, { minutes, size: 's' })) : null,
    ),
  )
}
