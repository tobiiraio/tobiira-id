"use client"

import { cn } from '../../lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizes = {
    sm: "text-xl",      // 20px
    md: "text-2xl",     // 24px  
    lg: "text-3xl"      // 30px
  }

  return (
    <span className={cn(
      "font-light tracking-tight text-brand", // Uses theme-aware brand color
      sizes[size],
      className
    )}>
      Tobiira
    </span>
  )
}

export { Logo }