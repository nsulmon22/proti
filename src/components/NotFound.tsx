import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../design-system'

interface NotFoundProps {
  title: string
  message: string
  // Use a plain anchor (full page load) instead of a router Link — needed
  // when rendered outside the router, e.g. by the error boundary.
  fullReload?: boolean
}

const homeLinkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 'var(--control-height-m)',
  padding: '0 22px',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-control)',
  color: 'var(--ink-0)',
  fontFamily: 'var(--font-text)',
  fontSize: 'var(--size-body-m)',
  fontWeight: 'var(--weight-semibold)',
  textDecoration: 'none',
}

export function NotFound({ title, message, fullReload = false }: NotFoundProps) {
  const content = (
    <>
      <Icon name="arrow-left" size={18} />
      Back to the homepage
    </>
  )
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: 'var(--surface-page)' }}
    >
      <h1 style={{ fontSize: 'var(--size-heading-l)', fontWeight: 600 }}>{title}</h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '40ch' }}>{message}</p>
      {fullReload ? (
        <a href="/" style={homeLinkStyle}>
          {content}
        </a>
      ) : (
        <Link to="/" style={homeLinkStyle}>
          {content}
        </Link>
      )}
    </div>
  )
}
