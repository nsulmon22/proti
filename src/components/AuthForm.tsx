import { useState, type CSSProperties, type FormEvent } from 'react'
import type { AuthError } from '@supabase/supabase-js'
import { Button, Card, Icon, Input } from '../design-system'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

// Password reset works with a code from the email instead of a link: a link opens in the phone's
// browser rather than the installed app, mail scanners click it first and use it up (otp_expired),
// and it depends on the Supabase Site URL. The Supabase "Reset password" email template must show
// {{ .Token }} for this to work.
type Mode = 'signin' | 'signup' | 'recover' | 'reset'

const COPY: Record<Mode, { title: string; sub: string; cta: string }> = {
  signin: { title: 'Welcome back', sub: 'Sign in to your favorites and tried recipes.', cta: 'Sign in' },
  signup: { title: 'Create your account', sub: 'Save favorites and track what you have tried.', cta: 'Create account' },
  recover: { title: 'Reset your password', sub: "We'll email you a code to set a new password.", cta: 'Send code' },
  reset: { title: 'Choose a new password', sub: 'Enter the code we emailed you. It works for 1 hour.', cta: 'Save and sign in' },
}

// Supabase email codes are 6 digits by default; a project can raise that to 10.
const CODE_PATTERN = /^\d{6,10}$/

function friendlyError(err: unknown): string {
  const code = (err as AuthError | null)?.code
  if (code === 'otp_expired') return 'That code is wrong or has expired. Check the latest email, or send a new code.'
  if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit')
    return 'An email was just sent. Wait a minute before asking for a new code.'
  return err instanceof Error ? err.message : 'Something went wrong.'
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
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const goToMode = (next: Mode) => {
    setMode(next)
    setError(null)
    setSent(false)
  }

  const sendCode = async () => {
    // Supabase answers the same whether or not the address has an account.
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim())
    if (error) throw error
    setCode('')
    setPassword('')
    goToMode('reset')
  }

  const resendCode = async () => {
    setError(null)
    setSubmitting(true)
    try {
      await sendCode()
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'recover') {
        await sendCode()
      } else if (mode === 'reset') {
        const token = code.replace(/\s/g, '')
        if (!CODE_PATTERN.test(token)) throw new Error('Enter the code from the email: only digits.')
        // The code signs the user in; then the new password is saved on that session.
        const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: 'recovery' })
        if (error) throw error
        const { error: saveError } = await supabase.auth.updateUser({ password })
        if (saveError && saveError.code !== 'same_password') throw saveError
        onSuccess()
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
      setError(friendlyError(err))
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
        {mode === 'reset' ? `We sent a code to ${email.trim()}. It works for 1 hour.` : copy.sub}
      </p>

      {sent ? (
        <Card padding="m" tone="accent" elevation="none" className="flex gap-3 items-start">
          <Icon name="mail-check" size={20} />
          <div>
            <div className="font-semibold mb-1">Check your inbox</div>
            <div style={{ fontSize: 'var(--size-body-s)', color: 'var(--text-muted)' }}>
              {`We sent a confirmation link to ${email || 'your email address'}.`}
            </div>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode !== 'reset' && (
            <Input
              label="Email address"
              type="email"
              iconLeft="mail"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          {mode === 'reset' && (
            <Input
              label="Code from the email"
              iconLeft="key-round"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]*"
              maxLength={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              hint="No email? Check your spam folder."
              required
            />
          )}
          {mode !== 'recover' && (
            <Input
              label={mode === 'reset' ? 'New password' : 'Password'}
              type="password"
              iconLeft="lock"
              placeholder="••••••••"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint={mode !== 'signin' ? 'At least 6 characters.' : undefined}
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
        {mode === 'recover' || mode === 'reset' ? (
          <div className="flex flex-col items-center gap-3">
            {mode === 'reset' && (
              <button type="button" onClick={resendCode} disabled={submitting} style={linkStyle}>
                Send a new code
              </button>
            )}
            <button type="button" onClick={() => goToMode('signin')} style={linkStyle}>
              <Icon name="arrow-left" size={14} />
              Back to sign in
            </button>
          </div>
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
