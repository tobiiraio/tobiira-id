"use client"

import { Logo } from '../ui'
import { cn } from '../../lib/utils'

interface AccountLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  showBackButton?: boolean
  onBack?: () => void
  className?: string
}

const AccountLayout = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  onBack,
  className
}: AccountLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Tobiira branding */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBackButton && onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
                  aria-label="Go back"
                >
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              <Logo size="sm" />
              
              <div className="hidden sm:block h-6 w-px bg-border" />
              
              <div className="hidden sm:block">
                <p className="text-xs text-muted-foreground">Identity & Account Management</p>
              </div>
            </div>

            {/* Profile Menu (placeholder for future) */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-brand">J</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn("max-w-4xl mx-auto px-4 py-6", className)}>
        {/* Page Header */}
        {(title || subtitle) && (
          <div className="mb-8 text-center sm:text-left">
            {title && (
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </main>

      {/* Footer with Tobiira branding */}
      <footer className="mt-auto border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Logo size="sm" />
              <span className="text-sm text-muted-foreground">
                © 2026 Tobiira. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { AccountLayout }