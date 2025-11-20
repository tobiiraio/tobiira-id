import { ThemeToggle } from '../components/theme-toggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Tobiira
          </h1>
          <p className="text-lg text-muted-foreground">
            Secure authentication for your business
          </p>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="space-y-4 max-w-md">
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Get Started
          </h2>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Login with OTP
          </button>
        </div>
        
        <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
          <p>Secondary card using your brand colors</p>
        </div>
      </div>
    </main>
  )
}