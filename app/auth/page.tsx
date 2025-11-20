"use client"

import { useState } from 'react'
import { AuthLayout, AuthHeader, EmailForm } from '../../components/auth'

const AuthPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (email: string) => {
    setLoading(true)
    setError('')
    
    try {
      // TODO: Replace with actual API call to your T1 backend
      // Example: await fetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ email }) })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // On success, navigate to OTP verification screen
      console.log('Email submitted:', email)
      // You would navigate here: router.push('/auth/verify-otp')
      
    } catch (error) {
      setError('Failed to send verification code. Please try again.')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="Sign in to Tobiira"
        subtitle="Enter your email to continue to your account"
      />
      
      <EmailForm
        onSubmit={handleEmailSubmit}
        loading={loading}
        error={error}
      />
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          We'll send you a secure code to verify your identity
        </p>
      </div>
    </AuthLayout>
  )
}

export default AuthPage