"use client"

import { useState } from 'react'
import { Input, Button, EmailIcon, ArrowRightIcon } from '../ui'

interface EmailFormProps {
  onSubmit: (email: string) => Promise<void>
  loading?: boolean
  error?: string
}

const EmailForm = ({ onSubmit, loading = false, error: externalError }: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setError('')
    
    try {
      await onSubmit(email)
    } catch (error) {
      setError('Something went wrong. Please try again.')
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('') // Clear error when user starts typing
  }

  const currentError = externalError || error

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        label="Email"
        placeholder="name@company.com"
        value={email}
        onChange={handleEmailChange}
        error={currentError}
        leftIcon={<EmailIcon />}
        disabled={loading}
        autoComplete="email"
        autoFocus
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
        rightIcon={!loading && <ArrowRightIcon />}
        disabled={!email.trim() || loading}
      >
        Continue
      </Button>
    </form>
  )
}

export { EmailForm }