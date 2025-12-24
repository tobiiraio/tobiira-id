"use client"

import { cn } from '../../lib/utils'
import { Logo } from '../ui/logo'

interface AuthHeaderProps {
  title: string
  subtitle?: string
  showLogo?: boolean
  className?: string
}

const AuthHeader = ({ 
  title, 
  subtitle, 
  showLogo = true, 
  className 
}: AuthHeaderProps) => {
  return (
    <div className={cn("text-center space-y-4", className)}>
      {/* Tobiira Logo */}
      {showLogo && ( 
        <Logo size="lg" className="mx-auto" />
          /*{ <div className="flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
        </div> }*/
      )}
      
      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export { AuthHeader }