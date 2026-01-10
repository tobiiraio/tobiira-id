"use client"

import { useState } from 'react'
import { cn } from '../../lib/utils'
import { OrganizationList } from './organization-list'
import { BottomNavigation } from '../shared/bottom-navigation'

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
}

const OrganizationDashboard = ({
  organizations,
  user,
  currentOrganizationId,
  onCreateOrganization,
  onSelectOrganization,
  onOrganizationAction
}: OrganizationDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 px-4 py-4">
        <h1 className="text-lg font-semibold text-foreground mb-3">
          Organizations
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
            placeholder="Search organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        <OrganizationList
          organizations={organizations}
          currentOrganizationId={currentOrganizationId}
          searchQuery={searchQuery}
          onSelectOrganization={onSelectOrganization}
          onOrganizationAction={onOrganizationAction}
        />
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50">
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Create Organization
        </div>
        
        <button
          onClick={onCreateOrganization}
          className="group w-14 h-14 bg-brand hover:bg-brand/90 active:bg-brand/95 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 duration-200"
        >
          <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Shared Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}

export { OrganizationDashboard }