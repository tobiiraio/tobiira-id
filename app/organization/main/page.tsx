"use client"

import { useState, useEffect } from 'react'
import { GoogleDriveStyleDashboard } from '../../../components/organization/google-drive-style-dashboard'

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

const OrganizationMainPage = () => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [properties, setProperties] = useState<Property[]>([])
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
        }
      ])

      setProperties([
        {
          id: 'prop-1',
          name: 'Sunset Apartments',
          type: 'residential',
          units: 24,
          address: '123 Sunset Blvd, Los Angeles'
        },
        {
          id: 'prop-2', 
          name: 'Downtown Office Complex',
          type: 'commercial',
          units: 8,
          address: '456 Business Ave, Downtown'
        },
        {
          id: 'prop-3',
          name: 'Riverside Condos',
          type: 'residential', 
          units: 16,
          address: '789 River Rd, Riverside'
        }
      ])

      setLoading(false)
    }

    loadData()
  }, [])

  const handleInviteMember = () => {
    console.log('Open invite member flow')
  }

  const handleAddProperty = () => {
    console.log('Open add property flow')
  }

  const handleItemAction = (id: string, type: 'member' | 'property' | 'setting', action: string) => {
    console.log('Item action:', { id, type, action })
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

  if (!organization) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Organization not found</p>
      </div>
    )
  }

  return (
    <GoogleDriveStyleDashboard
      organization={organization}
      members={members}
      properties={properties}
      currentUserId={currentUserId}
      onInviteMember={handleInviteMember}
      onAddProperty={handleAddProperty}
      onItemAction={handleItemAction}
    />
  )
}

export default OrganizationMainPage