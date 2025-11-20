export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Tobiira
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        Secure authentication for your business
      </p>
      
      <button className="bg-tobiira-blue-700 hover:bg-tobiira-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
        Get Started
      </button>
      
      <div className="mt-8 grid grid-cols-3 gap-4 w-64">
        <div className="h-16 bg-tobiira-blue-500 rounded"></div>
        <div className="h-16 bg-tobiira-blue-700 rounded"></div>
        <div className="h-16 bg-tobiira-blue-900 rounded"></div>
      </div>
    </main>
  )
}