"use client"

interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
}

interface AccountSettingsProps {
  user: User
  searchQuery: string
  onSettingAction: (settingId: string, action: string) => void
}

const AccountSettings = ({
  user,
  searchQuery,
  onSettingAction
}: AccountSettingsProps) => {
  const settings = [
    {
      id: 'profile',
      icon: '👤',
      color: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
      title: 'Profile',
      description: 'Personal information, photo'
    },
    {
      id: 'security',
      icon: '🔒',
      color: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400', 
      title: 'Security',
      description: 'Login sessions, password'
    },
    {
      id: 'notifications',
      icon: '🔔',
      color: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
      title: 'Notifications',
      description: 'Email, SMS preferences'
    },
    {
      id: 'preferences',
      icon: '⚙️',
      color: 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
      title: 'Preferences', 
      description: 'Theme, language, timezone'
    },
    {
      id: 'billing',
      icon: '💳',
      color: 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
      title: 'Billing',
      description: 'Subscription, payment methods'
    },
    {
      id: 'privacy',
      icon: '🛡️',
      color: 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400',
      title: 'Privacy',
      description: 'Data controls, visibility'
    }
  ]

  const filteredSettings = settings.filter(setting =>
    setting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    setting.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-1 pb-20">
      {/* User Profile Header */}
      <div className="p-4 border-b border-border mb-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium text-brand">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      {filteredSettings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-lg font-medium text-foreground mb-2">No settings found</h3>
          <p className="text-muted-foreground">Try a different search term</p>
        </div>
      ) : (
        <div className="space-y-1">
          {filteredSettings.map((setting) => (
            <div
              key={setting.id}
              className="p-4 hover:bg-muted/50 transition-colors group cursor-pointer"
              onClick={() => onSettingAction(setting.id, 'edit')}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${setting.color}`}>
                  <span className="text-lg">{setting.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { AccountSettings }