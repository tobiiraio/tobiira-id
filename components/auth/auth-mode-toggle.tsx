"use client"

import { cn } from '../../lib/utils'

type AuthMode = 'login' | 'register'

interface AuthModeToggleProps {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  className?: string
}

const AuthModeToggle = ({ mode, onModeChange, className }: AuthModeToggleProps) => {
  return (
    <div className={cn("flex p-1 bg-muted rounded-lg", className)}>
      <button
        type="button"
        onClick={() => onModeChange('login')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          mode === 'login'
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Sign In
      </button>
      
      <button
        type="button"
        onClick={() => onModeChange('register')}
        className={cn(
          "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          mode === 'register'
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Create Account
      </button>
    </div>
  )
}

export { AuthModeToggle, type AuthMode }