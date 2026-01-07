"use client"

import { useState, useEffect } from 'react'
import { AuthLayout } from '../../../components/auth/auth-layout'
import { AuthHeader } from '../../../components/auth/auth-header'
import { ProfileSetupForm } from '../../../components/auth/profile-setup-form'

interface ProfileFormData {
  fullName: string
  phone?: string
}

const ProfileSetupPage = () => {
  const [email, setEmail] = useState('')
  const [continueUrl, setContinueUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get email and continue from URL params (passed from OTP verification)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const emailParam = urlParams.get('email')
      const continueParam = urlParams.get('continue')
      
      if (emailParam) {
        setEmail(emailParam)
      } else {
        // If no email in URL, redirect back to auth
        console.log('No email found, redirect to auth')
        // router.push('/auth')
      }
      
      if (continueParam) {
        setContinueUrl(continueParam)
      }
    }
  }, [])

  const handleProfileComplete = async (data: ProfileFormData) => {
    setLoading(true)
    setError('')
    
    try {
      // Call your complete-registration API
      // const response = await fetch('/api/v1/auth/complete-registration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email,
      //     fullName: data.fullName,
      //     phone: data.phone
      //   })
      // })
      // 
      // const result = await response.json()
      // 
      // if (!response.ok) {
      //   throw new Error(result.error || 'Failed to complete registration')
      // }
      
      // Simulate API call for UI testing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Registration completed:', { email, ...data })
      
      // After profile completion, redirect to organization setup
      const params = new URLSearchParams({ 
        email,
        name: data.fullName
      })
      
      // Add continue parameter if it exists
      if (continueUrl) {
        params.append('continue', continueUrl)
      }
      
      const orgSetupUrl = `/organization/setup?${params.toString()}`
      window.location.href = orgSetupUrl
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to complete setup. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Don't render if we don't have email from URL params
  if (!email) {
    return (
      <AuthLayout showFooter={false}>
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout showFooter={false}>
      <AuthHeader
        title="Complete your profile"
        subtitle="Just a few more details to get you started"
      />
      
      <ProfileSetupForm
        email={email}
        onComplete={handleProfileComplete}
        loading={loading}
        error={error}
      />
      
      {/* Show return destination */}
      {continueUrl && (
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            After setup, you'll go to{' '}
            <span className="text-brand font-medium">
              {new URL(continueUrl).hostname}
            </span>
          </p>
        </div>
      )}
    </AuthLayout>
  )
}

export default ProfileSetupPage