"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthLayout, AuthHeader, AuthModeToggle, EmailForm, type AuthMode } from '../../components/auth'

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

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
      
      console.log('Email submitted:', email, 'Mode:', mode)
      
      // Navigate to OTP verification screen with URL params using Next.js router
      const params = new URLSearchParams({
        email,
        mode
      })
      
      // Get continue parameter from current URL if it exists
      if (typeof window !== 'undefined') {
        const currentParams = new URLSearchParams(window.location.search)
        const continueParam = currentParams.get('continue')
        if (continueParam) {
          params.append('continue', continueParam)
        }
      }
      
      router.push(`/auth/verify-otp?${params.toString()}`)
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to send verification code. Please try again.')
      }
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