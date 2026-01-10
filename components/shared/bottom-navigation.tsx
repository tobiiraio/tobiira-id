"use client"

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'

const BottomNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isOrganizationsActive = pathname === '/organization'
  const isAccountActive = pathname === '/account'

  const getTabIcon = (tab: 'organizations' | 'account', isActive: boolean) => {
    const baseClass = "w-5 h-5"
    const colorClass = isActive ? "text-brand" : "text-muted-foreground"
    
    switch (tab) {
      case 'organizations':
        return (
          <svg className={cn(baseClass, colorClass)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4m0 0v-3.5a2 2 0 011.732-1.964l.268-.155a2 2 0 011.732 0l.268.155A2 2 0 0114 17.5V21m-7 0V9" />
          </svg>
        )
      case 'account':
        return (
          <svg className={cn(baseClass, colorClass)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border z-50">
      <div className="flex">
        {/* Organizations Tab */}
        <button
          onClick={() => handleNavigation('/organization')}
          className={cn(
            "flex-1 flex flex-col items-center justify-center py-3 px-1 transition-colors",
            isOrganizationsActive ? "text-brand" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {getTabIcon('organizations', isOrganizationsActive)}
          <span className="text-xs mt-1">Organizations</span>
        </button>
        
        {/* Account Tab */}
        <button
          onClick={() => handleNavigation('/account')}
          className={cn(
            "flex-1 flex flex-col items-center justify-center py-3 px-1 transition-colors",
            isAccountActive ? "text-brand" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {getTabIcon('account', isAccountActive)}
          <span className="text-xs mt-1">Account</span>
        </button>
      </div>
    </div>
  )
}

export { BottomNavigation }