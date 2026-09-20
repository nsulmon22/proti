interface SpinnerProps {
  size?: number
  label?: string
}

export function Spinner({ size = 32, label = 'Loading' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className="inline-block rounded-full animate-spin"
      style={{
        width: size,
        height: size,
        border: '3px solid var(--border-default)',
        borderTopColor: 'var(--mint-500)',
      }}
    />
  )
}

export function PageSpinner({ label }: { label?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--surface-page)' }}>
      <Spinner label={label} />
    </div>
  )
}
