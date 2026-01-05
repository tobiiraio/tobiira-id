"use client"

import { useState, useEffect } from 'react'
import { AccountLayout } from '../../../components/shared/account-layout'
import { SimpleOrgDashboard } from '../../../components/organization/simple-org-dashboard'

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

const SimplifiedOrgPage = () => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  const currentUserId = 'user-123'

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800))

      setOrganization({
        id: 'org-123',
        name: 'Acme Properties',
        type: 'property_management'
      })

      setMembers([
        {
          id: 'user-123',
          name: 'Joram Granger',
          email: 'joram@acmeproperties.com',
          role: 'owner'
        },
        {
          id: 'user-456',
          name: 'Sarah Johnson',
          email: 'sarah@acmeproperties.com',
          role: 'admin'
        },
        {
          id: 'user-789',
          name: 'Mike Wilson',
          email: 'mike@acmeproperties.com',
          role: 'staff'
        },
        {
          id: 'user-101',
          name: 'Lisa Chen',
          email: 'lisa@acmeproperties.com',
          role: 'member'
        }
      ])

      setLoading(false)
    }

    loadData()
  }, [])

  const handleInviteMember = () => {
    console.log('Open invite member modal/page')
  }

  const handleLaunchApp = () => {
    if (!organization) return
    
    const appUrl = organization.type === 'hotel' 
      ? 'https://stay.tobiira.io/dashboard'
      : 'https://one.tobiira.io/dashboard'
    
    console.log('Would launch:', appUrl)
  }

  const handleMemberAction = (memberId: string, action: string) => {
    console.log('Member action:', { memberId, action })
  }

  if (loading) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
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
    <div className="min-h-screen bg-background">
      <SimpleOrgDashboard
        organization={organization}
        members={members}
        currentUserId={currentUserId}
        onInviteMember={handleInviteMember}
        onLaunchApp={handleLaunchApp}
        onMemberAction={handleMemberAction}
      />
    </div>
  )
}

export default SimplifiedOrgPage