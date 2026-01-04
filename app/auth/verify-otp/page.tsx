"use client"

import { useState, useEffect } from 'react'
import { AuthLayout } from '../../../components/auth/auth-layout'
import { OTPForm } from '../../../components/auth/otp-form'

type AuthMode = 'login' | 'register'

const OTPPage = () => {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get email and mode from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const emailParam = urlParams.get('email')
      const modeParam = urlParams.get('mode') as AuthMode
      
      if (emailParam) setEmail(emailParam)
      if (modeParam && (modeParam === 'login' || modeParam === 'register')) {
        setMode(modeParam)
      }
    }
  }, [])

  const handleOTPVerify = async (otp: string) => {
    setLoading(true)
    setError('')
    
    try {
      // Simulate API call for UI testing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('OTP verified successfully for:', email)
      
      // Route based on mode (UI flow)
      if (mode === 'register') {
        // Navigate to profile completion with email
        const profileUrl = `/auth/profile-setup?email=${encodeURIComponent(email)}`
        window.location.href = profileUrl
      } else {
        // Navigate to dashboard
        console.log('Navigate to dashboard')
        // window.location.href = '/dashboard'
      }
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to verify code. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      // Simulate API call for UI testing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Code resent to:', email)
      setError('')
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to resend code. Please try again.')
      }
    }
  }

  const handleBack = () => {
    // Navigate back to email input
    // router.push('/auth')
    window.history.back()
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
      <OTPForm
        email={email}
        mode={mode}
        onVerify={handleOTPVerify}
        onResend={handleResendCode}
        onBack={handleBack}
        loading={loading}
        error={error}
      />
    </AuthLayout>
  )
}

export default OTPPage