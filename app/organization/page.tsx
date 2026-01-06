"use client"

import { useState, useEffect } from 'react'
import { OrganizationDashboard } from '../../components/organization'

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

const OrganizationPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))

      setUser({
        id: 'user-123',
        name: 'Joram Granger',
        email: 'joram@gmail.com'
      })

      setOrganizations([
        {
          id: 'org-1',
          name: 'Acme Properties',
          type: 'property_management',
          role: 'owner',
          memberCount: 5,
          isActive: true
        },
        {
          id: 'org-2',
          name: 'Sunset Hotels', 
          type: 'hotel',
          role: 'admin',
          memberCount: 12,
          isActive: true
        },
        {
          id: 'org-3',
          name: 'Urban Ventures',
          type: 'hybrid',
          role: 'staff',
          memberCount: 8,
          isActive: true
        }
      ])

      setCurrentOrganizationId('org-1')
      setLoading(false)
    }

    loadData()
  }, [])

  const handleCreateOrganization = () => {
    console.log('Navigate to organization setup')
    // window.location.href = '/organization/setup'
  }

  const handleSelectOrganization = (orgId: string) => {
    console.log('Switch to organization:', orgId)
    setCurrentOrganizationId(orgId)
    // Update user context, refresh data for new org
  }

  const handleOrganizationAction = (orgId: string, action: string) => {
    console.log('Organization action:', { orgId, action })
    // Handle menu actions: edit, leave, transfer ownership, etc.
  }

  const handleSettingAction = (settingId: string, action: string) => {
    console.log('Setting action:', { settingId, action })
    // Navigate to specific setting page
    // window.location.href = `/account/${settingId}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">User not found</p>
      </div>
    )
  }

  return (
    <OrganizationDashboard
      organizations={organizations}
      user={user}
      currentOrganizationId={currentOrganizationId}
      onCreateOrganization={handleCreateOrganization}
      onSelectOrganization={handleSelectOrganization}
      onOrganizationAction={handleOrganizationAction}
      onSettingAction={handleSettingAction}
    />
  )
}

export default OrganizationPage