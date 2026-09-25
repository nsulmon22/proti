import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../design-system'
import { useAuth } from '../context/AuthContext'

interface UserButtonProps {
  style?: CSSProperties
}

// Signed in: the first letter of the email on a mint disc. Signed out: a person glyph on sand.
export function UserButton({ style }: UserButtonProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const initial = user?.email?.trim().charAt(0).toUpperCase()

  return (
    <button
      type="button"
      className={user ? 'account-button' : 'account-button account-button--guest'}
      aria-label={user ? 'Your profile' : 'Sign in'}
      title={user?.email ?? 'Sign in'}
      onClick={() => navigate(user ? '/profile' : '/login')}
      style={style}
    >
      {initial ?? <Icon name="user-round" size={18} />}
    </button>
  )
}
