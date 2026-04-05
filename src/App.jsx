import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import Portfolio from './components/Portfolio'

function App() {
  const [view, setView] = useState('landing')
  const [userData, setUserData] = useState(null)
  const [theme, setTheme] = useState('developer')
  const [editedData, setEditedData] = useState(null)

  const handleGenerate = (data) => {
    setUserData(data)
    setEditedData(data)
    setView('dashboard')
  }

  const handleViewPortfolio = () => {
    setView('portfolio')
  }

  const handleEdit = (newData) => {
    setEditedData(newData)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <div className="min-h-screen">
      {view === 'landing' && <Landing onGenerate={handleGenerate} />}
      {view === 'dashboard' && (
        <Dashboard
          userData={editedData}
          theme={theme}
          onThemeChange={handleThemeChange}
          onViewPortfolio={handleViewPortfolio}
          onEdit={handleEdit}
          onBack={() => setView('landing')}
        />
      )}
      {view === 'portfolio' && (
        <Portfolio
          userData={editedData}
          theme={theme}
          onBack={() => setView('dashboard')}
          onEdit={() => setView('dashboard')}
        />
      )}
    </div>
  )
}

export default App