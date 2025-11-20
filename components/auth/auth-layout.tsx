"use client"

import { cn } from '../../lib/utils'

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
  showFooter?: boolean
}

const AuthLayout = ({ children, className, showFooter = true }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className={cn("w-full max-w-sm space-y-8", className)}>
        {children}
        
        {/* Footer */}
        {showFooter && (
          <div className="text-center space-y-4">
            <p className="text-xs text-muted-foreground">
              Secure authentication powered by Tobiira
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-xs">
              <a 
                href="/help" 
                className="text-primary hover:underline transition-colors"
              >
                Need help?
              </a>
              <span className="text-muted-foreground">•</span>
              <a 
                href="/privacy" 
                className="text-primary hover:underline transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { AuthLayout }