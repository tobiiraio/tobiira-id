"use client"

import { useState } from 'react'
import { OTPInput } from './otp-input'
import { ResendCode } from './resend-code'
import { Button, ShieldIcon, ArrowLeftIcon } from '../ui'
import { cn } from '../../lib/utils'

type AuthMode = 'login' | 'register'

interface OTPFormProps {
  email: string
  mode: AuthMode
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
  onBack: () => void
  loading?: boolean
  error?: string
  className?: string
}

const OTPForm = ({
  email,
  mode,
  onVerify,
  onResend,
  onBack,
  loading = false,
  error,
  className
}: OTPFormProps) => {
  const [otp, setOtp] = useState('')

  const handleOTPComplete = async (otpValue: string) => {
    setOtp(otpValue)
    await onVerify(otpValue)
  }

  const maskEmail = (email: string) => {
    const [username, domain] = email.split('@')
    if (username.length <= 2) return email
    
    const maskedUsername = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
    return `${maskedUsername}@${domain}`
  }

  const getContent = (mode: AuthMode) => {
    if (mode === 'login') {
      return {
        title: 'Check your email',
        subtitle: `We sent a 6-digit verification code to`,
        instruction: 'Enter the code below to sign in to your account'
      }
    }
    
    return {
      title: 'Verify your email',
      subtitle: `We sent a 6-digit verification code to`,
      instruction: 'Enter the code below to complete your account setup'
    }
  }

  const content = getContent(mode)

  return (
    <div className={cn("space-y-8", className)}>
      {/* Back Button */}
      <div className="flex justify-start">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={loading}
          leftIcon={<ArrowLeftIcon />}
          className="text-muted-foreground hover:text-foreground p-2"
        >
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center">
            <ShieldIcon className="w-8 h-8 text-brand" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-foreground">
            {content.title}
          </h1>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {content.subtitle}
            </p>
            <p className="text-sm font-medium text-foreground">
              {maskEmail(email)}
            </p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {content.instruction}
            </p>
          </div>
        </div>
      </div>

      {/* OTP Input */}
      <OTPInput
        onComplete={handleOTPComplete}
        loading={loading}
        error={error}
      />

      {/* Manual Verify Button (optional, for accessibility) */}
      {otp.length === 6 && (
        <Button
          onClick={() => handleOTPComplete(otp)}
          loading={loading}
          className="w-full"
          disabled={otp.length !== 6}
        >
          {mode === 'login' ? 'Sign In' : 'Complete Setup'}
        </Button>
      )}

      {/* Resend Code */}
      <ResendCode 
        onResend={onResend}
        disabled={loading}
      />

      {/* Change Email Option */}
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          disabled={loading}
          className="text-xs text-muted-foreground hover:text-foreground h-auto p-1"
        >
          Wrong email? Change it
        </Button>
      </div>
    </div>
  )
}

export { OTPForm }