import { Component, type ErrorInfo, type ReactNode } from 'react'
import { NotFound } from './NotFound'

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <NotFound
          fullReload
          title="Something went wrong"
          message="An unexpected error occurred. Head back to the homepage and try again."
        />
      )
    }
    return this.props.children
  }
}
