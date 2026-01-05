"use client"

import { useState, useEffect } from 'react'
import { AccountLayout } from '../../components/shared/account-layout'
import { OrganizationDashboard } from '../../components/organization/org-dashboard'

// Mock data types
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

const OrgDashboardPage = () => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [members, setMembers] = useState<OrganizationMember[]>([])
  const [loading, setLoading] = useState(true)

  const currentUserId = 'user-123'

  useEffect(() => {
    const loadOrganizationData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockOrg: Organization = {
        id: 'org-123',
        name: 'Acme Properties',
        domain: 'acmeproperties',
        type: 'property_management',
        createdAt: '2025-01-06T10:00:00Z',
        isActive: true
      }

      const mockMembers: OrganizationMember[] = [
        {
          userId: 'user-123',
          email: 'joram@acmeproperties.com',
          fullName: 'Joram Granger',
          category: 'owner',
          role: 'owner',
          isActive: true,
          joinedAt: '2025-01-06T10:00:00Z'
        },
        {
          userId: 'user-456',
          email: 'sarah@acmeproperties.com',
          fullName: 'Sarah Johnson',
          category: 'operator',
          role: 'admin',
          isActive: true,
          joinedAt: '2025-01-06T11:00:00Z'
        }
      ]

      setOrganization(mockOrg)
      setMembers(mockMembers)
      setLoading(false)
    }

    loadOrganizationData()
  }, [])

  const handleInviteMember = () => {
    console.log('Navigate to invite member flow')
  }

  const handleManageMembers = () => {
    console.log('Navigate to members management')
  }

  const handleOrganizationSettings = () => {
    console.log('Navigate to organization settings')
  }

  const handleLaunchApp = () => {
    if (!organization) return
    
    const appUrl = organization.type === 'hotel' 
      ? 'https://stay.tobiira.io/dashboard'
      : 'https://one.tobiira.io/dashboard'
    
    console.log('Would launch app:', appUrl)
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading organization...</p>
          </div>
        </div>
      </AccountLayout>
    )
  }

  if (!organization) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Organization not found</p>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout
      title={organization.name}
      subtitle="Organization Dashboard"
    >
      <OrganizationDashboard
        organization={organization}
        members={members}
        currentUserId={currentUserId}
        onInviteMember={handleInviteMember}
        onManageMembers={handleManageMembers}
        onOrganizationSettings={handleOrganizationSettings}
        onLaunchApp={handleLaunchApp}
      />
    </AccountLayout>
  )
}

export default OrgDashboardPage