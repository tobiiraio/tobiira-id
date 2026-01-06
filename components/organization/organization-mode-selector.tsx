"use client"

import { Button } from '../ui'

interface OrganizationModeSelectorProps {
  userName: string
  onSelectMode: (mode: 'create' | 'join') => void
  onSkip?: () => void
}

const OrganizationModeSelector = ({
  userName,
  onSelectMode,
  onSkip
}: OrganizationModeSelectorProps) => {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome, {userName}!
        </h1>
        <p className="text-muted-foreground">
          To get started, create an organization or join an existing one
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <Button
          onClick={() => onSelectMode('create')}
          className="w-full h-auto p-4 text-left"
          variant="outline"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🏗️</div>
            <div className="flex-1">
              <div className="font-medium">Create Organization</div>
              <div className="text-sm text-muted-foreground mt-1">
                Start fresh with your own organization
              </div>
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onSelectMode('join')}
          className="w-full h-auto p-4 text-left"
          variant="outline"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🤝</div>
            <div className="flex-1">
              <div className="font-medium">Join Organization</div>
              <div className="text-sm text-muted-foreground mt-1">
                Use an invitation code to join an existing team
              </div>
            </div>
          </div>
        </Button>
      </div>

      {/* Skip option */}
      {onSkip && (
        <div className="text-center pt-4 border-t border-border">
          <button
            onClick={onSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            I'll set this up later
          </button>
        </div>
      )}
    </div>
  )
}

export { OrganizationModeSelector }