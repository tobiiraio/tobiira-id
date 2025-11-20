"use client"

import { forwardRef, useState } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text", 
    label, 
    error, 
    leftIcon, 
    rightIcon, 
    helperText, 
    id,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false)
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            id={inputId}
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-background px-3 py-2 text-base",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors duration-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error 
                ? "border-red-500 focus-visible:ring-red-500" 
                : "border-border focus-visible:border-primary",
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-2">
            {error ? (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }