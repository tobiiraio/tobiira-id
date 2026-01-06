"use client"

import { cn } from '../../lib/utils'

interface Organization {
  id: string
  name: string
  type: 'property_management' | 'hotel' | 'hybrid'
  role: 'owner' | 'admin' | 'staff' | 'member'
  memberCount: number
  isActive: boolean
}

interface OrganizationListProps {
  organizations: Organization[]
  currentOrganizationId?: string
  searchQuery: string
  onSelectOrganization: (orgId: string) => void
  onOrganizationAction: (orgId: string, action: string) => void
}

const OrganizationList = ({
  organizations,
  currentOrganizationId,
  searchQuery,
  onSelectOrganization,
  onOrganizationAction
}: OrganizationListProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨'
      case 'property_management': return '🏢'
      case 'hybrid': return '🌐'
      default: return '🏢'
    }
  }

  const getAppUrl = (type: string) => {
    switch (type) {
      case 'hotel': return 'stay.tobiira.io'
      case 'property_management': return 'one.tobiira.io'
      case 'hybrid': return 'one.tobiira.io'
      default: return 'one.tobiira.io'
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

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (filteredOrganizations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🏢</div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {searchQuery ? 'No organizations found' : 'No organizations yet'}
        </h3>
        <p className="text-muted-foreground">
          {searchQuery ? 'Try a different search term' : 'Create your first organization to get started'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1 pb-20">
      {filteredOrganizations.map((org) => (
        <div
          key={org.id}
          className={cn(
            "p-4 hover:bg-muted/50 transition-colors group cursor-pointer",
            currentOrganizationId === org.id && "bg-brand/5 border-l-2 border-brand"
          )}
          onClick={() => onSelectOrganization(org.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{getTypeIcon(org.type)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-foreground truncate">{org.name}</h3>
                  {currentOrganizationId === org.id && (
                    <span className="text-xs text-brand font-medium">(Current)</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{getAppUrl(org.type)}</p>
                <p className="text-xs text-muted-foreground">
                  {org.memberCount} member{org.memberCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium capitalize",
                getRoleColor(org.role)
              )}>
                {org.role}
              </span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onOrganizationAction(org.id, 'menu')
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-opacity"
              >
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Launch Button */}
          <div className="mt-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(`https://${getAppUrl(org.type)}/dashboard`, '_blank')
              }}
              className="text-xs text-brand hover:text-brand/80 transition-colors"
            >
              → Open {getAppUrl(org.type)}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { OrganizationList }