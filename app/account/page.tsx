"use client"

import { useState, useEffect } from 'react'
import { AccountLayout } from '../../components/shared/account-layout'
import { AccountSettings } from '../../components/accounts/account-settings'
import { BottomNavigation } from '../../components/shared/bottom-navigation'

interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
}

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      // Simulate loading user data
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock user data - replace with actual API call
      setUser({
        id: 'user-123',
        name: 'Joram Granger',
        email: 'joram@gmail.com'
      })
      
      setLoading(false)
    }

    loadUserData()
  }, [])

  const handleSettingAction = (settingId: string, action: string) => {
    console.log('Setting action:', { settingId, action })
    
    // Handle different setting actions
    switch (settingId) {
      case 'profile':
        console.log('Navigate to profile settings')
        // window.location.href = '/account/profile'
        break
      case 'security':
        console.log('Navigate to security settings')
        // window.location.href = '/account/security'
        break
      case 'notifications':
        console.log('Navigate to notification settings')
        // window.location.href = '/account/notifications'
        break
      case 'preferences':
        console.log('Navigate to preferences')
        // window.location.href = '/account/preferences'
        break
      case 'billing':
        console.log('Navigate to billing')
        // window.location.href = '/account/billing'
        break
      case 'privacy':
        console.log('Navigate to privacy settings')
        // window.location.href = '/account/privacy'
        break
      default:
        console.log('Unknown setting:', settingId)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading account...</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="text-center py-12">
          <p className="text-muted-foreground">User not found</p>
        </div>
        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 px-4 py-4">
        <h1 className="text-lg font-semibold text-foreground mb-3">
          Account Settings
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search settings..."
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        <AccountSettings
          user={user}
          searchQuery=""
          onSettingAction={handleSettingAction}
        />
      </div>

      {/* Shared Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export default AccountPage