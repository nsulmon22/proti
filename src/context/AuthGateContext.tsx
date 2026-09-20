import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { LoginModal } from '../components/LoginModal'

interface AuthGateContextValue {
  // Runs `action` immediately if signed in; otherwise opens the login/signup
  // modal and runs `action` right after a successful sign in.
  requireAuth: (action: () => void) => void
}

const AuthGateContext = createContext<AuthGateContextValue | null>(null)

export function AuthGateProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  const requireAuth = useCallback(
    (action: () => void) => {
      if (user) {
        action()
        return
      }
      setPendingAction(() => action)
    },
    [user],
  )

  const handleSuccess = () => {
    const action = pendingAction
    setPendingAction(null)
    action?.()
  }

  return (
    <AuthGateContext.Provider value={{ requireAuth }}>
      {children}
      <LoginModal open={pendingAction !== null} onClose={() => setPendingAction(null)} onSuccess={handleSuccess} />
    </AuthGateContext.Provider>
  )
}

export function useAuthGate() {
  const ctx = useContext(AuthGateContext)
  if (!ctx) throw new Error('useAuthGate must be used within an AuthGateProvider')
  return ctx
}
