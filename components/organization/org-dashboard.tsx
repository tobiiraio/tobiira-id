"use client"

import { useState } from 'react'
import { Button } from '../ui'
import { cn } from '../../lib/utils'

// Types based on your backend
interface Organization {
  id: string
  name: string
  domain: string
  type: 'property_management' | 'hotel' | 'hybrid'
  createdAt: string
  isActive: boolean
}

interface OrganizationMember {
  userId: string
  email: string
  fullName: string
  category: 'owner' | 'operator' | 'occupant'
  role: 'owner' | 'admin' | 'staff' | 'member'
  isActive: boolean
  joinedAt: string
}

interface OrganizationDashboardProps {
  organization: Organization
  members: OrganizationMember[]
  currentUserId: string
  onInviteMember: () => void
  onManageMembers: () => void
  onOrganizationSettings: () => void
  onLaunchApp: () => void
}

const OrganizationDashboard = ({
  organization,
  members,
  currentUserId,
  onInviteMember,
  onManageMembers,
  onOrganizationSettings,
  onLaunchApp
}: OrganizationDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members'>('overview')

  const currentUserMember = members.find(m => m.userId === currentUserId)
  const isOwnerOrAdmin = currentUserMember && ['owner', 'admin'].includes(currentUserMember.role)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property_management': return '🏢'
      case 'hotel': return '🏨'
      case 'hybrid': return '🌐'
      default: return '🏢'
    }
  }

  const getTypeDescription = (type: string) => {
    switch (type) {
      case 'property_management': return 'Property Management'
      case 'hotel': return 'Hotel Management'
      case 'hybrid': return 'Property & Hotel Management'
      default: return 'Management'
    }
  }

  const getAppUrl = () => {
    switch (organization.type) {
      case 'hotel': return 'stay.tobiira.io'
      case 'property_management': return 'one.tobiira.io'
      case 'hybrid': return 'one.tobiira.io' // Default to One for hybrid
      default: return 'one.tobiira.io'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'text-brand bg-brand/10'
      case 'admin': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/10'
      case 'staff': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  const activeMembers = members.filter(m => m.isActive)
  const membersByRole = activeMembers.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Organization Header */}
      <div className="bg-gradient-to-r from-brand/5 to-brand/10 rounded-xl p-6 border border-brand/20">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">{getTypeIcon(organization.type)}</div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {organization.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {getTypeDescription(organization.type)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {organization.domain}.tobiira.io
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-right">
            <div className="text-lg font-semibold text-brand">
              {activeMembers.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {activeMembers.length === 1 ? 'member' : 'members'}
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <Button 
          onClick={onLaunchApp}
          className="w-full sm:w-auto"
          size="lg"
        >
          <span className="mr-2">🚀</span>
          Open {getAppUrl()}
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {isOwnerOrAdmin && (
          <button
            onClick={onInviteMember}
            className="p-4 bg-background border border-border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <div className="text-sm font-medium">Invite Member</div>
          </button>
        )}

        <button
          onClick={onManageMembers}
          className="p-4 bg-background border border-border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
            👥
          </div>
          <div className="text-sm font-medium">View Members</div>
        </button>

        {isOwnerOrAdmin && (
          <button
            onClick={onOrganizationSettings}
            className="p-4 bg-background border border-border rounded-lg hover:border-brand hover:bg-brand/5 transition-colors group"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <div className="text-sm font-medium">Settings</div>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "py-3 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === 'overview'
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={cn(
              "py-3 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === 'members'
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Members ({activeMembers.length})
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Organization Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(membersByRole).map(([role, count]) => (
              <div key={role} className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-lg font-semibold text-foreground">
                  {count}
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {role}{count !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-brand rounded-full"></div>
                <span className="text-muted-foreground">Organization created</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(organization.createdAt).toLocaleDateString()}
                </span>
              </div>
              {members.length > 1 && (
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">
                    {members.length - 1} member{members.length > 2 ? 's' : ''} joined
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="space-y-4">
          {/* Members List */}
          <div className="space-y-3">
            {activeMembers.map((member) => (
              <div
                key={member.userId}
                className="bg-background border border-border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-brand">
                      {member.fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {member.fullName}
                      {member.userId === currentUserId && (
                        <span className="text-xs text-muted-foreground ml-2">(You)</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                    getRoleColor(member.role)
                  )}>
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Member Button */}
          {isOwnerOrAdmin && (
            <Button
              onClick={onInviteMember}
              variant="outline"
              className="w-full"
            >
              <span className="mr-2">+</span>
              Invite New Member
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { OrganizationDashboard }