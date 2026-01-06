"use client"

import { useState } from 'react'
import { cn } from '../../lib/utils'
import { OrganizationList } from './organization-list'
import { AccountSettings } from '../accounts/account-settings'

interface Organization {
  id: string
  name: string
  type: 'property_management' | 'hotel' | 'hybrid'
  role: 'owner' | 'admin' | 'staff' | 'member'
  memberCount: number
  isActive: boolean
}

interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
}

interface OrganizationDashboardProps {
  organizations: Organization[]
  user: User
  currentOrganizationId?: string
  onCreateOrganization: () => void
  onSelectOrganization: (orgId: string) => void
  onOrganizationAction: (orgId: string, action: string) => void
  onSettingAction: (settingId: string, action: string) => void
}

type TabType = 'organizations' | 'account'

const OrganizationDashboard = ({
  organizations,
  user,
  currentOrganizationId,
  onCreateOrganization,
  onSelectOrganization,
  onOrganizationAction,
  onSettingAction
}: OrganizationDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('organizations')
  const [searchQuery, setSearchQuery] = useState('')

  const getTabIcon = (tab: TabType, isActive: boolean) => {
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

  const getPlaceholderText = () => {
    switch (activeTab) {
      case 'organizations': return 'Search organizations...'
      case 'account': return 'Search settings...'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'organizations':
        return (
          <OrganizationList
            organizations={organizations}
            currentOrganizationId={currentOrganizationId}
            searchQuery={searchQuery}
            onSelectOrganization={onSelectOrganization}
            onOrganizationAction={onOrganizationAction}
          />
        )
      case 'account':
        return (
          <AccountSettings
            user={user}
            searchQuery={searchQuery}
            onSettingAction={onSettingAction}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 px-4 py-4">
        <h1 className="text-lg font-semibold text-foreground mb-3">
          {activeTab === 'organizations' ? 'Organizations' : 'Account'}
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
            placeholder={getPlaceholderText()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {renderContent()}
      </div>

      {/* Floating Action Button - Only for Organizations tab */}
      {activeTab === 'organizations' && (
        <button
          onClick={onCreateOrganization}
          className="fixed bottom-20 right-4 w-14 h-14 bg-brand hover:bg-brand/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border">
        <div className="flex">
          {(['organizations', 'account'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 px-1 transition-colors",
                activeTab === tab ? "text-brand" : "text-muted-foreground"
              )}
            >
              {getTabIcon(tab, activeTab === tab)}
              <span className="text-xs mt-1 capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export { OrganizationDashboard }