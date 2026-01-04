"use client"

import { useState, useCallback } from 'react'
import { Input, Button, CheckIcon, PhoneInput } from '../ui'
import { cn } from '../../lib/utils'

interface ProfileFormData {
  fullName: string
  phone?: string
}

interface ProfileSetupFormProps {
  email: string
  onComplete: (data: ProfileFormData) => Promise<void>
  loading?: boolean
  error?: string
  className?: string
}

const ProfileSetupForm = ({
  email,
  onComplete,
  loading = false,
  error,
  className
}: ProfileSetupFormProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    phone: ''
  })
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {}

    // Full name is required
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Phone validation for international numbers
    if (formData.phone && formData.phone.trim()) {
      // Updated validation for international phone format (+256 706 888 768)
      const phoneRegex = /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = useCallback((field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    setErrors(prev => {
      if (prev[field]) {
        return { ...prev, [field]: undefined }
      }
      return prev
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    // Clean up data before submitting
    const cleanData = {
      fullName: formData.fullName.trim(),
      phone: formData.phone && formData.phone.trim() ? formData.phone.trim() : undefined
    }

    await onComplete(cleanData)
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
            <CheckIcon className="w-5 h-5 text-white" />
          </div>
          <span className="ml-2 text-sm font-medium text-brand">Email verified</span>
        </div>
        
        <div className="w-12 h-px bg-border"></div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">2</span>
          </div>
          <span className="ml-2 text-sm font-medium text-foreground">Complete profile</span>
        </div>
      </div>

      {/* Email confirmation */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Setting up account for
        </p>
        <p className="text-sm font-medium text-brand">
          {email}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          disabled={loading}
          autoComplete="name"
          autoFocus
          required
        />

        <PhoneInput
          label="Phone Number"
          placeholder="712 345 678"
          value={formData.phone || ''}
          onChange={(value) => handleInputChange('phone', value)}
          error={errors.phone}
          disabled={loading}
          helperText="Optional - for account recovery and SMS notifications"
          defaultCountry="UG"
        />

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={loading}
          disabled={!formData.fullName.trim() || loading}
        >
          Complete Setup
        </Button>
      </form>

      {/* Terms */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By completing setup, you agree to our{' '}
          <a href="/terms" className="text-brand hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}

export { ProfileSetupForm }