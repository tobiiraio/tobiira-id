"use client"

import { useRef, useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  loading?: boolean
  error?: string
  className?: string
}

const OTPInput = ({ 
  length = 6, 
  onComplete, 
  loading = false, 
  error, 
  className 
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus management
  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex]?.focus()
    }
  }, [activeIndex])

  // Clear OTP when error changes
  useEffect(() => {
    if (error) {
      setOtp(new Array(length).fill(''))
      setActiveIndex(0)
    }
  }, [error, length])

  const handleChange = (value: string, index: number) => {
    // Only allow single digits
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Take only the last character
    setOtp(newOtp)

    // Auto-advance to next input
    if (value && index < length - 1) {
      setActiveIndex(index + 1)
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === length) {
      onComplete(newOtp.join(''))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        setActiveIndex(index - 1)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1)
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      setActiveIndex(index + 1)
    }
  }

  const handleFocus = (index: number) => {
    setActiveIndex(index)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text')
    const pasteDigits = pasteData.replace(/\D/g, '').slice(0, length)
    
    if (pasteDigits) {
      const newOtp = new Array(length).fill('')
      pasteDigits.split('').forEach((digit, index) => {
        if (index < length) newOtp[index] = digit
      })
      setOtp(newOtp)
      
      // Focus last filled input or next empty one
      const nextIndex = Math.min(pasteDigits.length, length - 1)
      setActiveIndex(nextIndex)
      
      // Auto-complete if full OTP pasted
      if (pasteDigits.length === length) {
        onComplete(pasteDigits)
      }
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-center gap-3">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            disabled={loading}
            className={cn(
              "w-12 h-14 text-center text-xl font-semibold rounded-xl border-2",
              "transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-0",
              // Normal state - FIXED: Better contrast in dark mode
              "border-border bg-background",
              "text-gray-900 dark:text-gray-100", // Explicit dark/light text colors
              // Focus state
              "focus:border-brand focus:scale-105",
              // Filled state - FIXED: Ensure text remains visible
              otp[index] && "border-brand bg-brand/5 text-gray-900 dark:text-gray-100",
              // Error state
              error && "border-red-500 bg-red-50 dark:bg-red-500/10 text-gray-900 dark:text-gray-100",
              // Loading state
              loading && "opacity-50 cursor-not-allowed",
              // Active state animation
              activeIndex === index && !error && "ring-2 ring-brand/20"
            )}
          />
        ))}
      </div>
      
      {error && (
        <div className="flex items-center justify-center gap-2 text-sm text-red-600 animate-in slide-in-from-top-2 duration-300">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

export { OTPInput }