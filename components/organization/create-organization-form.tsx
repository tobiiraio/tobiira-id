"use client"

import { useState, useEffect } from 'react'
import { Button, Input } from  '../ui'
import { OrganizationTypeSelector, OrganizationType } from './organization-type-selector'

export interface CreateOrganizationFormData {
  name: string
  domain: string
  type: OrganizationType
}

interface CreateOrganizationFormProps {
  onSubmit: (data: CreateOrganizationFormData) => Promise<void>
  onBack: () => void
  loading?: boolean
  error?: string
}

const CreateOrganizationForm = ({
  onSubmit,
  onBack,
  loading = false,
  error
}: CreateOrganizationFormProps) => {
  const [formData, setFormData] = useState<CreateOrganizationFormData>({
    name: '',
    domain: '',
    type: 'property_management'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Auto-suggest domain from organization name
  useEffect(() => {
    if (formData.name && !formData.domain) {
      const suggestedDomain = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20)
      setFormData(prev => ({ ...prev, domain: suggestedDomain }))
    }
  }, [formData.name])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Organization name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Organization name must be at least 2 characters'
    }

    if (!formData.domain.trim()) {
      errors.domain = 'Domain is required'
    } else if (!/^[a-z0-9]+$/.test(formData.domain)) {
      errors.domain = 'Domain can only contain lowercase letters and numbers'
    } else if (formData.domain.length < 3) {
      errors.domain = 'Domain must be at least 3 characters'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await onSubmit(formData)
  }

  const updateFormData = (field: keyof CreateOrganizationFormData, value: string | OrganizationType) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
          Create Organization
        </h1>
        <p className="text-muted-foreground">
          Set up your organization to start managing your business
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Organization Name"
          placeholder="Acme Properties"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          error={formErrors.name}
          disabled={loading}
          autoFocus
          required
        />

        <Input
          label="Domain"
          placeholder="acmeproperties"
          value={formData.domain}
          onChange={(e) => updateFormData('domain', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
          error={formErrors.domain}
          disabled={loading}
          helperText="Used for your organization's unique identifier"
          required
        />

        <OrganizationTypeSelector
          selectedType={formData.type}
          onTypeSelect={(type) => updateFormData('type', type)}
          disabled={loading}
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
          disabled={!formData.name.trim() || !formData.domain.trim() || loading}
        >
          Create Organization
        </Button>
      </form>
    </div>
  )
}

export { CreateOrganizationForm }