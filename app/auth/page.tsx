"use client"

import { useState } from 'react'
import { AuthLayout, AuthHeader, AuthModeToggle, EmailForm, type AuthMode } from '../../components/auth'
/* import { authApi } from '../../lib/auth-api' */

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getContent = (mode: AuthMode) => {
    if (mode === 'login') {
      return {
        title: 'Welcome back',
        subtitle: 'Enter your email to sign in to your Tobiira account',
        helperText: 'We\'ll send you a secure verification code'
      }
    }
    
    return {
      title: 'Create your account',
      subtitle: 'Enter your email to get started with Tobiira',
      helperText: 'We\'ll send you a verification code to complete setup'
    }
  }

  const content = getContent(mode)

  const handleEmailSubmit = async (email: string) => {
    setLoading(true)
    setError('')
    
    try {
      // Simulate API call for UI testing
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Email submitted:', email)
      
      // Navigate to OTP verification screen with URL params
      const otpUrl = `/auth/verify-otp?email=${encodeURIComponent(email)}&mode=${mode}`
      window.location.href = otpUrl
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to send verification code. Please try again.')
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode)
    setError('') // Clear any existing errors when switching modes
  }

  return (
    <AuthLayout>
      <AuthHeader
        title={content.title}
        subtitle={content.subtitle}
      />
      
      <div className="space-y-6">
        <AuthModeToggle 
          mode={mode} 
          onModeChange={handleModeChange}
        />
        
        <EmailForm
          onSubmit={handleEmailSubmit}
          loading={loading}
          error={error}
        />
      </div>
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {content.helperText}
        </p>
      </div>
    </AuthLayout>
  )
}

export default AuthPage