"use client"

import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'

// Common country codes for East Africa and international
const COUNTRIES = [
  { code: 'UG', flag: '🇺🇬', dialCode: '+256' },
  { code: 'KE', flag: '🇰🇪', dialCode: '+254' },
  { code: 'TZ', flag: '🇹🇿', dialCode: '+255' },
  { code: 'RW', flag: '🇷🇼', dialCode: '+250' },
  { code: 'SS', flag: '🇸🇸', dialCode: '+211' },
  { code: 'ET', flag: '🇪🇹', dialCode: '+251' },
  { code: 'NG', flag: '🇳🇬', dialCode: '+234' },
  { code: 'GH', flag: '🇬🇭', dialCode: '+233' },
  { code: 'ZA', flag: '🇿🇦', dialCode: '+27' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1' },
]

type Country = typeof COUNTRIES[number]

interface PhoneInputProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  error?: string
  disabled?: boolean
  placeholder?: string
  helperText?: string
  defaultCountry?: string
  className?: string
}

const PhoneInput = ({
  value = '',
  onChange,
  label,
  error,
  disabled = false,
  placeholder = '706 888 768',
  helperText,
  defaultCountry = 'UG',
  className
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0]
  )
  const [localNumber, setLocalNumber] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Parse existing value on mount
  useEffect(() => {
    if (value) {
      const country = COUNTRIES.find(c => value.startsWith(c.dialCode))
      if (country) {
        setSelectedCountry(country)
        setLocalNumber(value.substring(country.dialCode.length).trim())
      }
    }
  }, [])

  // Update parent when country or local number changes
  useEffect(() => {
    const fullNumber = localNumber.trim() 
      ? `${selectedCountry.dialCode} ${localNumber.trim()}`
      : ''
    
    // Only call onChange if the value has actually changed
    if (fullNumber !== value) {
      onChange(fullNumber)
    }
  }, [selectedCountry.dialCode, localNumber, onChange, value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits and leading zeros
    const digits = input.replace(/\D/g, '').replace(/^0+/, '')
    
    // Format based on country (simple formatting)
    if (selectedCountry.code === 'UG') {
      // Uganda: XXX XXX XXX
      return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
    } else if (selectedCountry.code === 'US' || selectedCountry.code === 'CA') {
      // US/Canada: XXX XXX XXXX
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }
    
    // Default: XXX XXX XXX
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const formatted = formatPhoneNumber(input)
    setLocalNumber(formatted)
  }

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      <div className="relative flex">
        {/* Country selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-2 px-3 h-12 border border-r-0 rounded-l-lg",
              "bg-background hover:bg-muted transition-colors w-[100px] shrink-0",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error ? "border-red-500" : "border-border"
            )}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
            <svg 
              className={cn(
                "w-3 h-3 transition-transform text-muted-foreground ml-auto",
                isDropdownOpen && "rotate-180"
              )} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto w-[160px]">
              {COUNTRIES.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted transition-colors"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium">{country.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          ref={inputRef}
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 h-12 px-3 border rounded-r-lg bg-background",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-border"
          )}
        />
      </div>

      {/* Error or helper text */}
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

export { PhoneInput }