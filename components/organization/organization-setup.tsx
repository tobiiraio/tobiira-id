"use client"

import { useState } from 'react'
import { OrganizationModeSelector } from './organization-mode-selector'
import { CreateOrganizationForm, CreateOrganizationFormData } from './create-organization-form'
import { JoinOrganizationForm, JoinOrganizationFormData } from './join-organization-form'

interface OrganizationSetupProps {
  userEmail: string
  userName: string
  onCreateOrganization: (data: CreateOrganizationFormData) => Promise<void>
  onJoinOrganization: (data: JoinOrganizationFormData) => Promise<void>
  onSkip?: () => void
  loading?: boolean
  error?: string
}

type SetupMode = 'choose' | 'create' | 'join'

const OrganizationSetup = ({
  userEmail,
  userName,
  onCreateOrganization,
  onJoinOrganization,
  onSkip,
  loading = false,
  error
}: OrganizationSetupProps) => {
  const [mode, setMode] = useState<SetupMode>('choose')

  const handleCreateOrganization = async (data: CreateOrganizationFormData) => {
    await onCreateOrganization(data)
  }

  const handleJoinOrganization = async (data: JoinOrganizationFormData) => {
    await onJoinOrganization(data)
  }

  // Render the appropriate component based on current mode
  switch (mode) {
    case 'choose':
      return (
        <OrganizationModeSelector
          userName={userName}
          onSelectMode={setMode}
          onSkip={onSkip}
        />
      )

    case 'create':
      return (
        <CreateOrganizationForm
          onSubmit={handleCreateOrganization}
          onBack={() => setMode('choose')}
          loading={loading}
          error={error}
        />
      )

    case 'join':
      return (
        <JoinOrganizationForm
          onSubmit={handleJoinOrganization}
          onBack={() => setMode('choose')}
          onCreateInstead={() => setMode('create')}
          loading={loading}
          error={error}
        />
      )

    default:
      return null
  }
}

export { OrganizationSetup }
export type { CreateOrganizationFormData, JoinOrganizationFormData }