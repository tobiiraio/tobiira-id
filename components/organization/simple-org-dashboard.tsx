"use client"

import { useState } from 'react'
import { Button } from '../ui'
import { cn } from '../../lib/utils'

// Simplified types
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
  avatar?: string
}

interface SimpleOrgDashboardProps {
  organization: Organization
  members: Member[]
  currentUserId: string
  onInviteMember: () => void
  onLaunchApp: () => void
  onMemberAction?: (memberId: string, action: string) => void
}

const SimpleOrgDashboard = ({
  organization,
  members,
  currentUserId,
  onInviteMember,
  onLaunchApp,
  onMemberAction
}: SimpleOrgDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨'
      case 'property_management': return '🏢'
      case 'hybrid': return '🌐'
      default: return '🏢'
    }
  }

  const getAppName = (type: string) => {
    switch (type) {
      case 'hotel': return 'Tobiira Stay'
      case 'property_management': return 'Tobiira One'
      case 'hybrid': return 'Tobiira One'
      default: return 'Tobiira One'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-brand text-white'
      case 'admin': return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
      case 'staff': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  // Filter members based on search
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentUserMember = members.find(m => m.id === currentUserId)
  const canInvite = currentUserMember && ['owner', 'admin'].includes(currentUserMember.role)

  return (
    <div className="relative min-h-screen bg-background">
      {/* Header - Organization Info */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-40 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getTypeIcon(organization.type)}</span>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {organization.name}
              </h1>
              <p className="text-xs text-muted-foreground">
                {members.length} member{members.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <Button
            onClick={onLaunchApp}
            size="sm"
            className="hidden sm:flex"
          >
            Open {getAppName(organization.type)}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="px-4 pb-24">
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">👥</div>
            <p className="text-muted-foreground">
              {searchQuery ? 'No members found' : 'No members yet'}
            </p>
            {canInvite && !searchQuery && (
              <Button 
                onClick={onInviteMember}
                className="mt-4"
                size="sm"
              >
                Invite First Member
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-brand">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {member.name}
                    </p>
                    {member.id === currentUserId && (
                      <span className="text-xs text-muted-foreground">(You)</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {member.email}
                  </p>
                </div>

                {/* Role Badge */}
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium capitalize flex-shrink-0",
                  getRoleColor(member.role)
                )}>
                  {member.role}
                </span>

                {/* Actions Menu (for admins) */}
                {canInvite && member.id !== currentUserId && (
                  <button
                    onClick={() => onMemberAction?.(member.id, 'menu')}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
                  >
                    <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-4 flex flex-col space-y-3 z-50">
        {/* Launch App Button (Mobile) */}
        <button
          onClick={onLaunchApp}
          className="sm:hidden w-12 h-12 bg-brand hover:bg-brand/90 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <span className="text-lg">🚀</span>
        </button>

        {/* Invite Member Button */}
        {canInvite && (
          <button
            onClick={onInviteMember}
            className="w-14 h-14 bg-brand hover:bg-brand/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick App Launch for Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border p-4">
        <Button
          onClick={onLaunchApp}
          className="w-full"
          size="lg"
        >
          <span className="mr-2">🚀</span>
          Open {getAppName(organization.type)}
        </Button>
      </div>
    </div>
  )
}

export { SimpleOrgDashboard }