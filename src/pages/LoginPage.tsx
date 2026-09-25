import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { AuthForm } from '../components/AuthForm'
import protiLogo from '../assets/Proti_Logo_Icon.png'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location } | null)?.from

  const handleSuccess = () => {
    navigate(from ? `${from.pathname}${from.search}` : '/', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10" style={{ background: 'var(--surface-page)' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <img src={protiLogo} alt="" className="h-7 w-7 object-contain" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, letterSpacing: '-.02em' }}>
            Proti
          </span>
        </div>
        <AuthForm onSuccess={handleSuccess} />
      </div>
    </div>
  )
}
