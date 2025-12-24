"use client"

import { cn } from '../../lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo = ({ size = 'md', className }: LogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl", 
    lg: "text-3xl"
  }

  return (
    <span className={cn(
      "font-bold text-foreground tracking-tight",
      sizes[size],
      className
    )}>
      Tobiira
    </span>
  )
}

export { Logo }