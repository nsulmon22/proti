import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../design-system'
import { useAuth } from '../context/AuthContext'

interface UserButtonProps {
  style?: CSSProperties
  variant?: 'soft' | 'overlay'
}

export function UserButton({ style, variant = 'soft' }: UserButtonProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <IconButton
      icon="circle-user"
      variant={variant}
      label={user ? 'Your profile' : 'Sign in'}
      onClick={() => navigate(user ? '/profile' : '/login')}
      style={style}
    />
  )
}
