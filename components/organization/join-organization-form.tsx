"use client"

import { useState } from 'react'
import { Button, Input } from '../ui'

export interface JoinOrganizationFormData {
  invitationCode: string
}

interface JoinOrganizationFormProps {
  onSubmit: (data: JoinOrganizationFormData) => Promise<void>
  onBack: () => void
  onCreateInstead: () => void
  loading?: boolean
  error?: string
}

const JoinOrganizationForm = ({
  onSubmit,
  onBack,
  onCreateInstead,
  loading = false,
  error
}: JoinOrganizationFormProps) => {
  const [formData, setFormData] = useState<JoinOrganizationFormData>({
    invitationCode: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.invitationCode.trim()) {
      errors.invitationCode = 'Invitation code is required'
    } else if (!/^\d{6}$/.test(formData.invitationCode.trim())) {
      errors.invitationCode = 'Invitation code must be 6 digits'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await onSubmit(formData)
  }

  const handleInvitationCodeChange = (value: string) => {
    // Only allow digits and limit to 6 characters
    const formattedValue = value.replace(/\D/g, '').substring(0, 6)
    setFormData(prev => ({ ...prev, invitationCode: formattedValue }))
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <button
          onClick={onBack}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          disabled={loading}
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Invitation Code"
          placeholder="123456"
          value={formData.invitationCode}
          onChange={(e) => handleInvitationCodeChange(e.target.value)}
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
          disabled={formData.invitationCode.length !== 6 || loading}
        >
          Join Organization
        </Button>
      </form>

      {/* Help */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Don't have an invitation code?{' '}
          <button
            onClick={onCreateInstead}
            className="text-brand hover:underline"
            disabled={loading}
          >
            Create your own organization
          </button>
        </p>
      </div>
    </div>
  )
}

export { JoinOrganizationForm }