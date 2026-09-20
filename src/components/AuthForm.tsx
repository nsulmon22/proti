import { useState, type CSSProperties, type FormEvent } from 'react'
import { Button, Card, Icon, Input } from '../design-system'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

type Mode = 'signin' | 'signup' | 'recover'

const COPY: Record<Mode, { title: string; sub: string; cta: string }> = {
  signin: { title: 'Welcome back', sub: 'Sign in to your favorites and tried recipes.', cta: 'Sign in' },
  signup: { title: 'Create your account', sub: 'Save favorites and track what you have tried.', cta: 'Create account' },
  recover: { title: 'Reset your password', sub: "We'll email you a link to set a new password.", cta: 'Send reset link' },
}

const linkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'var(--font-text)',
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--text-accent-bold)',
}

interface AuthFormProps {
  // Called after a successful sign in, or a sign up that doesn't need email confirmation.
  onSuccess: () => void
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const goToMode = (next: Mode) => {
    setMode(next)
    setError(null)
    setSent(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'recover') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        })
        if (error) throw error
        setSent(true)
      } else if (mode === 'signup') {
        const { error, needsEmailConfirmation } = await signUp(email, password)
        if (error) throw error
        if (needsEmailConfirmation) setSent(true)
        else onSuccess()
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const copy = COPY[mode]

  return (
    <div>
      <h1
        className="mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--size-display-m)',
          fontWeight: 600,
          letterSpacing: 'var(--tracking-tight)',
        }}
      >
        {copy.title}
      </h1>
      <p style={{ color: 'var(--text-muted)' }} className="mb-6">
        {copy.sub}
      </p>

      {sent ? (
        <Card padding="m" tone="accent" elevation="none" className="flex gap-3 items-start">
          <Icon name="mail-check" size={20} />
          <div>
            <div className="font-semibold mb-1">Check your inbox</div>
            <div style={{ fontSize: 'var(--size-body-s)', color: 'var(--text-muted)' }}>
              {mode === 'recover'
                ? `We sent a reset link to ${email || 'your email address'}.`
                : `We sent a confirmation link to ${email || 'your email address'}.`}
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            iconLeft="mail"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {mode !== 'recover' && (
            <Input
              label="Password"
              type="password"
              iconLeft="lock"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint={mode === 'signup' ? 'At least 6 characters.' : undefined}
              minLength={6}
              required
            />
          )}
          {mode === 'signin' && (
            <button type="button" onClick={() => goToMode('recover')} style={{ ...linkStyle, alignSelf: 'flex-end' }}>
              Forgot password?
            </button>
          )}
          {error && <p style={{ color: 'var(--status-danger-fg)', fontSize: 'var(--size-body-s)' }}>{error}</p>}
          <Button type="submit" size="l" fullWidth disabled={submitting}>
            {submitting ? 'Please wait…' : copy.cta}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        {mode === 'recover' ? (
          <button type="button" onClick={() => goToMode('signin')} style={linkStyle}>
            <Icon name="arrow-left" size={14} />
            Back to sign in
          </button>
        ) : (
          <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)' }}>
            {mode === 'signin' ? 'New here? ' : 'Already have an account? '}
            <button type="button" onClick={() => goToMode(mode === 'signin' ? 'signup' : 'signin')} style={linkStyle}>
              {mode === 'signin' ? 'Create an account' : 'Sign in'}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
