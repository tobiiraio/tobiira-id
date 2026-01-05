"use client"

import { useState, useEffect } from 'react'
import { Button, Input } from '../ui'
import { cn } from '../../lib/utils'

// Types based on your OrganizationService backend
type OrganizationType = 'property_management' | 'hotel' | 'hybrid'

interface CreateOrgFormData {
  name: string
  domain: string
  type: OrganizationType
}

interface JoinOrgFormData {
  invitationCode: string
}

interface OrganizationSetupProps {
  userEmail: string
  userName: string
  onCreateOrganization: (data: CreateOrgFormData) => Promise<void>
  onJoinOrganization: (code: string) => Promise<void>
  onSkip?: () => void
  loading?: boolean
  error?: string
}

const OrganizationSetup = ({
  userEmail,
  userName,
  onCreateOrganization,
  onJoinOrganization,
  onSkip,
  loading = false,
  error
}: OrganizationSetupProps) => {
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose')
  const [createForm, setCreateForm] = useState<CreateOrgFormData>({
    name: '',
    domain: '',
    type: 'property_management'
  })
  const [joinForm, setJoinForm] = useState<JoinOrgFormData>({
    invitationCode: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Auto-suggest domain from organization name
  useEffect(() => {
    if (createForm.name && !createForm.domain) {
      const suggestedDomain = createForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20)
      setCreateForm(prev => ({ ...prev, domain: suggestedDomain }))
    }
  }, [createForm.name])

  const validateCreateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!createForm.name.trim()) {
      errors.name = 'Organization name is required'
    } else if (createForm.name.length < 2) {
      errors.name = 'Organization name must be at least 2 characters'
    }

    if (!createForm.domain.trim()) {
      errors.domain = 'Domain is required'
    } else if (!/^[a-z0-9]+$/.test(createForm.domain)) {
      errors.domain = 'Domain can only contain lowercase letters and numbers'
    } else if (createForm.domain.length < 3) {
      errors.domain = 'Domain must be at least 3 characters'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateJoinForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!joinForm.invitationCode.trim()) {
      errors.invitationCode = 'Invitation code is required'
    } else if (!/^\d{6}$/.test(joinForm.invitationCode.trim())) {
      errors.invitationCode = 'Invitation code must be 6 digits'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCreateForm()) return
    await onCreateOrganization(createForm)
  }

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateJoinForm()) return
    await onJoinOrganization(joinForm.invitationCode.trim())
  }

  const getTypeDescription = (type: OrganizationType) => {
    switch (type) {
      case 'property_management':
        return 'Manage residential and commercial properties'
      case 'hotel':
        return 'Manage hotels, bookings, and guest services'
      case 'hybrid':
        return 'Manage both properties and hospitality services'
    }
  }

  const getTypeIcon = (type: OrganizationType) => {
    switch (type) {
      case 'property_management':
        return '🏢'
      case 'hotel':
        return '🏨'
      case 'hybrid':
        return '🌐'
    }
  }

  if (mode === 'choose') {
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
            onClick={() => setMode('create')}
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
            onClick={() => setMode('join')}
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

  if (mode === 'create') {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <button
            onClick={() => setMode('choose')}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to options
          </button>
          <h1 className="text-2xl font-semibold text-foreground">
            Create Organization
          </h1>
          <p className="text-muted-foreground">
            Set up your organization to start managing your business
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="Organization Name"
            placeholder="Acme Properties"
            value={createForm.name}
            onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
            error={formErrors.name}
            disabled={loading}
            autoFocus
            required
          />

          <Input
            label="Domain"
            placeholder="acmeproperties"
            value={createForm.domain}
            onChange={(e) => setCreateForm(prev => ({ ...prev, domain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') }))}
            error={formErrors.domain}
            disabled={loading}
            helperText="Used for your organization's unique identifier"
            required
          />

          {/* Organization Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              What type of business do you manage?
            </label>
            <div className="space-y-2">
              {(['property_management', 'hotel', 'hybrid'] as OrganizationType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setCreateForm(prev => ({ ...prev, type }))}
                  className={cn(
                    "w-full p-3 text-left border rounded-lg transition-colors",
                    createForm.type === type
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-border hover:border-muted-foreground"
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">{getTypeIcon(type)}</span>
                    <div className="flex-1">
                      <div className="font-medium capitalize">
                        {type.replace('_', ' ')}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {getTypeDescription(type)}
                      </div>
                    </div>
                    {createForm.type === type && (
                      <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={!createForm.name.trim() || !createForm.domain.trim() || loading}
          >
            Create Organization
          </Button>
        </form>
      </div>
    )
  }

  if (mode === 'join') {
    return (
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <button
            onClick={() => setMode('choose')}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            ← Back to options
          </button>
          <h1 className="text-2xl font-semibold text-foreground">
            Join Organization
          </h1>
          <p className="text-muted-foreground">
            Enter the invitation code you received
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <Input
            label="Invitation Code"
            placeholder="123456"
            value={joinForm.invitationCode}
            onChange={(e) => setJoinForm(prev => ({ 
              ...prev, 
              invitationCode: e.target.value.replace(/\D/g, '').substring(0, 6)
            }))}
            error={formErrors.invitationCode}
            disabled={loading}
            autoFocus
            required
            helperText="6-digit code from your organization admin"
          />

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={joinForm.invitationCode.length !== 6 || loading}
          >
            Join Organization
          </Button>
        </form>

        {/* Help */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Don't have an invitation code?{' '}
            <button
              onClick={() => setMode('create')}
              className="text-brand hover:underline"
            >
              Create your own organization
            </button>
          </p>
        </div>
      </div>
    )
  }

  return null
}

export { OrganizationSetup }