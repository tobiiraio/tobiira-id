"use client"

import { useState } from 'react'
import { Button } from '../ui'
import { cn } from '../../lib/utils'

// Types
interface Organization {
  id: string
  name: string
  type: 'property_management' | 'hotel' | 'hybrid'
}

interface Member {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'staff' | 'member'
}

interface Property {
  id: string
  name: string
  type: 'residential' | 'commercial'
  units: number
  address: string
}

interface GoogleDriveStyleDashboardProps {
  organization: Organization
  members: Member[]
  properties: Property[]
  currentUserId: string
  onInviteMember: () => void
  onAddProperty: () => void
  onItemAction: (id: string, type: 'member' | 'property' | 'setting', action: string) => void
}

type TabType = 'properties' | 'members' | 'account'

const GoogleDriveStyleDashboard = ({
  organization,
  members,
  properties,
  currentUserId,
  onInviteMember,
  onAddProperty,
  onItemAction
}: GoogleDriveStyleDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('properties')
  const [searchQuery, setSearchQuery] = useState('')

  const currentUser = members.find(m => m.id === currentUserId)
  const canManage = currentUser && ['owner', 'admin'].includes(currentUser.role)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨'
      case 'property_management': return '🏢'
      case 'hybrid': return '🌐'
      default: return '🏢'
    }
  }

  const getPropertyIcon = (type: string) => {
    return type === 'residential' ? '🏠' : '🏢'
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-brand text-white'
      case 'admin': return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
      case 'staff': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  // Filter data based on active tab and search
  const getFilteredData = () => {
    const query = searchQuery.toLowerCase()
    
    switch (activeTab) {
      case 'properties':
        return properties.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query)
        )
      case 'members':
        return members.filter(m =>
          m.name.toLowerCase().includes(query) ||
          m.email.toLowerCase().includes(query) ||
          m.role.toLowerCase().includes(query)
        )
      default:
        return []
    }
  }

  const filteredData = getFilteredData()

  const getTabIcon = (tab: TabType, isActive: boolean) => {
    const baseClass = "w-5 h-5"
    const colorClass = isActive ? "text-brand" : "text-muted-foreground"
    
    switch (tab) {
      case 'properties':
        return (
          <svg className={cn(baseClass, colorClass)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4m0 0v-3.5a2 2 0 011.732-1.964l.268-.155a2 2 0 011.732 0l.268.155A2 2 0 0114 17.5V21m-7 0V9" />
          </svg>
        )
      case 'members':
        return (
          <svg className={cn(baseClass, colorClass)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
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
      case 'properties': return 'Search properties...'
      case 'members': return 'Search members...'
      case 'account': return 'Search settings...'
    }
  }

  const getEmptyState = () => {
    switch (activeTab) {
      case 'properties':
        return {
          icon: '🏢',
          title: searchQuery ? 'No properties found' : 'No properties yet',
          subtitle: searchQuery ? 'Try a different search term' : 'Add your first property to get started',
          action: !searchQuery && canManage ? { text: 'Add Property', onClick: onAddProperty } : undefined
        }
      case 'members':
        return {
          icon: '👥',
          title: searchQuery ? 'No members found' : 'No members yet',
          subtitle: searchQuery ? 'Try a different search term' : 'Invite your team members',
          action: !searchQuery && canManage ? { text: 'Invite Member', onClick: onInviteMember } : undefined
        }
      case 'account':
        return {
          icon: '⚙️',
          title: 'Account Settings',
          subtitle: 'Manage your organization settings'
        }
    }
  }

  const renderContent = () => {
    if (activeTab === 'account') {
      return (
        <div className="space-y-1 pb-20">
          <div className="space-y-1">
            {/* Organization Info */}
            <div className="p-4 hover:bg-muted/50 transition-colors" onClick={() => onItemAction('org-info', 'setting', 'edit')}>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(organization.type)}</span>
                <div>
                  <p className="font-medium text-foreground">{organization.name}</p>
                  <p className="text-sm text-muted-foreground">Organization details</p>
                </div>
              </div>
            </div>

            {/* Settings Items */}
            <div className="p-4 hover:bg-muted/50 transition-colors" onClick={() => onItemAction('org-settings', 'setting', 'edit')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Organization Settings</p>
                  <p className="text-sm text-muted-foreground">Name, domain, type</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-muted/50 transition-colors" onClick={() => onItemAction('security', 'setting', 'view')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Security</p>
                  <p className="text-sm text-muted-foreground">Login sessions, permissions</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-muted/50 transition-colors" onClick={() => onItemAction('preferences', 'setting', 'edit')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m3 0V2a1 1 0 011-1h2a1 1 0 011 1v2m0 0h2a2 2 0 012 2v2M7 4H5a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h10a2 2 0 002-2V10m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-foreground">Preferences</p>
                  <p className="text-sm text-muted-foreground">Notifications, theme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (filteredData.length === 0) {
      const emptyState = getEmptyState()
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">{emptyState.icon}</div>
          <h3 className="text-lg font-medium text-foreground mb-2">{emptyState.title}</h3>
          <p className="text-muted-foreground mb-6">{emptyState.subtitle}</p>
          {emptyState.action && (
            <Button onClick={emptyState.action.onClick} size="sm">
              {emptyState.action.text}
            </Button>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-1 pb-20">
        {filteredData.map((item: any) => {
          if (activeTab === 'properties') {
            const property = item as Property
            return (
              <div
                key={property.id}
                className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{getPropertyIcon(property.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{property.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{property.address}</p>
                  <p className="text-xs text-muted-foreground">{property.units} units • {property.type}</p>
                </div>
                {canManage && (
                  <button
                    onClick={() => onItemAction(property.id, 'property', 'menu')}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                )}
              </div>
            )
          } else {
            const member = item as Member
            return (
              <div
                key={member.id}
                className="flex items-center space-x-3 p-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-brand">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground truncate">{member.name}</p>
                    {member.id === currentUserId && (
                      <span className="text-xs text-muted-foreground">(You)</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0",
                  getRoleColor(member.role)
                )}>
                  {member.role}
                </span>
                {canManage && member.id !== currentUserId && (
                  <button
                    onClick={() => onItemAction(member.id, 'member', 'menu')}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                )}
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 px-4 py-4">
        <h1 className="text-lg font-semibold text-foreground mb-3">
          {organization.name}
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

      {/* Floating Action Button */}
      {canManage && (activeTab === 'properties' || activeTab === 'members') && (
        <button
          onClick={activeTab === 'properties' ? onAddProperty : onInviteMember}
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
          {(['properties', 'members', 'account'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors",
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

export { GoogleDriveStyleDashboard }