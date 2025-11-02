import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import PortfolioBuilder from './components/PortfolioBuilder'
import Toast from './components/Toast'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const [initialAction, setInitialAction] = useState(null)

  // Check if there's saved portfolio data
  useEffect(() => {
    const saved = localStorage.getItem('portfolioData')
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved))
        setShowBuilder(true)
        // If the landing page set an action, read it and clear it
        const action = localStorage.getItem('landingAction')
        if (action) {
          setInitialAction(action)
          localStorage.removeItem('landingAction')
        }
      } catch (e) {
        console.error('Error loading saved portfolio:', e)
      }
    }
  }, [])

  const handleStartBuilding = () => {
    setShowBuilder(true)
  }

  const handleBackToLanding = () => {
    setShowBuilder(false)
    setPortfolioData(null)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        {!showBuilder ? (
          <Landing onStartBuilding={handleStartBuilding} />
        ) : (
          <PortfolioBuilder 
              initialData={portfolioData}
              initialAction={initialAction}
              onBack={handleBackToLanding}
            />
        )}
        <Toast />
      </div>
    </ThemeProvider>
  )
}

export default App

