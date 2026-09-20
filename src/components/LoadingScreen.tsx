import { useEffect, useState } from 'react'
import protiBg from '../assets/logo.png'

interface LoadingScreenProps {
  active: boolean
}

export function LoadingScreen({ active }: LoadingScreenProps) {
  const [mounted, setMounted] = useState(active)

  useEffect(() => {
    if (active) setMounted(true)
  }, [active])

  if (!mounted) return null

  return (
    <div
      onTransitionEnd={(e) => {
        if (e.propertyName === 'opacity' && !active) setMounted(false)
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-700 ease-out"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        backgroundImage: `url(${protiBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="status"
      aria-live="polite"
      aria-busy={active}
    >
      <span
        className="h-9 w-9 rounded-full animate-spin"
        style={{
          border: '3px solid var(--border-default)',
          borderTopColor: 'var(--mint-500)',
        }}
      />
      <span
        className="text-sm font-medium"
        style={{ fontFamily: 'var(--font-text)', color: 'var(--text-muted)' }}
      >
        Loading your recipes…
      </span>
    </div>
  )
}
