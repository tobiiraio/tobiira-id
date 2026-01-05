"use client"

import { useState, useEffect } from 'react'
import { AuthLayout } from '../../../components/auth/auth-layout'
import { OrganizationSetup } from '../../../components/organization/organization-setup'

interface CreateOrgFormData {
  name: string
  domain: string
  type: 'property_management' | 'hotel' | 'hybrid'
}

const OrganizationSetupPage = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [continueUrl, setContinueUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get user info and continue URL from params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const emailParam = urlParams.get('email')
      const nameParam = urlParams.get('name')
      const continueParam = urlParams.get('continue')
      
      if (emailParam) setUserEmail(emailParam)
      if (nameParam) setUserName(nameParam)
      if (continueParam) setContinueUrl(continueParam)
    }
  }, [])

  const handleCreateOrganization = async (data: CreateOrgFormData) => {
    setLoading(true)
    setError('')
    
    try {
      // Simulate organization creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Organization created:', data)
      
      // Determine redirect URL based on organization type
      let redirectUrl = continueUrl
      if (!redirectUrl) {
        redirectUrl = data.type === 'hotel' 
          ? 'https://stay.tobiira.io/dashboard'
          : 'https://one.tobiira.io/dashboard'
      }
      
      console.log('Would redirect to:', redirectUrl)
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to create organization. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleJoinOrganization = async (invitationCode: string) => {
    setLoading(true)
    setError('')
    
    try {
      // Simulate joining organization
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Joined organization with code:', invitationCode)
      
      // Determine redirect URL based on organization type
      let redirectUrl = continueUrl
      if (!redirectUrl) {
        // For demo, assume hotel organization
        redirectUrl = 'https://stay.tobiira.io/dashboard'
      }
      
      console.log('Would redirect to:', redirectUrl)
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Failed to join organization. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    // For UI demo, just log the action
    if (continueUrl) {
      console.log('Would redirect to continue URL with limited access:', continueUrl)
    } else {
      console.log('Would redirect to account management')
    }
  }

  // Don't render if we don't have user info
  if (!userEmail) {
    return (
      <AuthLayout showFooter={false}>
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout showFooter={false}>
      <OrganizationSetup
        userEmail={userEmail}
        userName={userName}
        onCreateOrganization={handleCreateOrganization}
        onJoinOrganization={handleJoinOrganization}
        onSkip={handleSkip}
        loading={loading}
        error={error}
      />
      
      {/* Show return destination */}
      {continueUrl && (
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            After setup, you'll go to{' '}
            <span className="text-brand font-medium">
              {new URL(continueUrl).hostname}
            </span>
          </p>
        </div>
      )}
    </AuthLayout>
  )
}

export default OrganizationSetupPage