import { Dialog } from '../design-system'
import { AuthForm } from './AuthForm'

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  return (
    <Dialog open={open} onClose={onClose} width={420}>
      <AuthForm
        onSuccess={() => {
          onClose()
          onSuccess()
        }}
      />
    </Dialog>
  )
}
