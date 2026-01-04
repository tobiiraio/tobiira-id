"use client"

import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface ResendCodeProps {
  onResend: () => Promise<void>
  initialDelay?: number
  className?: string
  disabled?: boolean
}

const ResendCode = ({ 
  onResend, 
  initialDelay = 60, 
  className, 
  disabled = false 
}: ResendCodeProps) => {
  const [timeLeft, setTimeLeft] = useState(initialDelay)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleResend = async () => {
    if (timeLeft > 0 || loading || disabled) return

    setLoading(true)
    try {
      await onResend()
      setTimeLeft(initialDelay) // Reset timer
    } catch (error) {
      console.error('Failed to resend code:', error)
    } finally {
      setLoading(false)
    }
  }

  const canResend = timeLeft === 0 && !loading && !disabled

  return (
    <div className={cn("text-center text-sm", className)}>
      {timeLeft > 0 ? (
        <p className="text-muted-foreground">
          Resend code in{" "}
          <span className="font-medium text-brand">
            {timeLeft}s
          </span>
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={cn(
            "font-medium transition-colors duration-200",
            canResend
              ? "text-brand hover:text-brand/80 cursor-pointer"
              : "text-muted-foreground cursor-not-allowed"
          )}
        >
          {loading ? "Sending..." : "Resend code"}
        </button>
      )}
    </div>
  )
}

export { ResendCode }