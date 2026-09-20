import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Icon, IconButton } from '../design-system'
import { PageSpinner } from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import { useUserRecipes } from '../hooks/useUserRecipes'

export function ProfilePage() {
  const { user, initializing, signOut } = useAuth()
  const navigate = useNavigate()
  const { favoritedIds, triedIds, loading } = useUserRecipes()

  useEffect(() => {
    if (!initializing && !user) navigate('/login', { replace: true })
  }, [initializing, user, navigate])

  if (initializing) return <PageSpinner label="Loading profile" />
  if (!user) return null

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-page)' }}>
      <div className="mx-auto max-w-sm px-6 py-10">
        <IconButton icon="arrow-left" variant="plain" label="Back" onClick={() => navigate(-1)} className="mb-6" />

        <Card padding="l" elevation="s" className="flex flex-col items-center text-center gap-3 mb-6">
          <span
            className="flex items-center justify-center"
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-pill)',
              background: 'var(--sand-200)',
            }}
          >
            <Icon name="circle-user" size={30} />
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--size-heading-m)', fontWeight: 600 }}>
            {user.email}
          </div>
        </Card>

        <Card padding="m" elevation="s" className="flex justify-around text-center mb-6">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text-heading)' }}>
              {loading ? '–' : favoritedIds.length}
            </div>
            <div style={{ fontSize: 'var(--size-body-s)', color: 'var(--text-muted)' }}>Favorites</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--text-heading)' }}>
              {loading ? '–' : triedIds.length}
            </div>
            <div style={{ fontSize: 'var(--size-body-s)', color: 'var(--text-muted)' }}>Tried</div>
          </div>
        </Card>

        <Button variant="outline" fullWidth iconLeft="log-out" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </div>
  )
}
