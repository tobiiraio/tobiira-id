"use client"

import { cn } from '../../lib/utils'

type OrganizationType = 'property_management' | 'hotel' | 'hybrid'

interface OrganizationTypeOption {
  type: OrganizationType
  icon: string
  title: string
  description: string
}

interface OrganizationTypeSelectorProps {
  selectedType: OrganizationType
  onTypeSelect: (type: OrganizationType) => void
  disabled?: boolean
}

const OrganizationTypeSelector = ({
  selectedType,
  onTypeSelect,
  disabled = false
}: OrganizationTypeSelectorProps) => {
  const organizationTypes: OrganizationTypeOption[] = [
    {
      type: 'property_management',
      icon: '🏢',
      title: 'Property Management',
      description: 'Manage residential and commercial properties'
    },
    {
      type: 'hotel',
      icon: '🏨',
      title: 'Hotel Management',
      description: 'Manage hotels, bookings, and guest services'
    },
    {
      type: 'hybrid',
      icon: '🌐',
      title: 'Hybrid Management',
      description: 'Manage both properties and hospitality services'
    }
  ]

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        What type of business do you manage?
      </label>
      <div className="space-y-2">
        {organizationTypes.map((option) => (
          <button
            key={option.type}
            type="button"
            onClick={() => onTypeSelect(option.type)}
            disabled={disabled}
            className={cn(
              "w-full p-3 text-left border rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
              selectedType === option.type
                ? "border-brand bg-brand/5 text-brand"
                : "border-border hover:border-muted-foreground"
            )}
          >
            <div className="flex items-start space-x-3">
              <span className="text-xl">{option.icon}</span>
              <div className="flex-1">
                <div className="font-medium">
                  {option.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </div>
              </div>
              {selectedType === option.type && (
                <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export { OrganizationTypeSelector }
export type { OrganizationType }