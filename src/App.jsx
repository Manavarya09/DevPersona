import { useState } from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import Portfolio from './components/Portfolio'
import Resume from './components/Resume'
import Loading from './components/Loading'
import Error from './components/Error'

function App() {
  const [view, setView] = useState('landing')
  const [userData, setUserData] = useState(null)
  const [theme, setTheme] = useState('developer')
  const [editedData, setEditedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async (username) => {
    setLoading(true)
    setError(null)
    
    try {
      const cleanUsername = username.replace('https://github.com/', '').replace('/', '').trim()
      const response = await fetch(`https://api.github.com/users/${cleanUsername}`)
      
      if (!response.ok) {
        throw new Error('GitHub user not found')
      }

      const userData = await response.json()
      
      const reposResponse = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=50`)
      const repos = reposResponse.ok ? await reposResponse.json() : []

      const processedData = {
        username: userData.login,
        name: userData.name || userData.login,
        bio: userData.bio || 'Developer passionate about building things',
        avatar: userData.avatar_url,
        location: userData.location,
        blog: userData.blog,
        company: userData.company,
        repos: repos.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.fork ? 'Forked' : null,
          url: repo.html_url,
          topics: repo.topics || [],
          updated: repo.updated_at,
          visible: true
        })).sort((a, b) => b.stars - a.stars).slice(0, 12),
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created: userData.created_at
      }

      const languages = [...new Set(repos.map(r => r.language).filter(Boolean))]
      processedData.languages = languages

      const totalStars = processedData.repos.reduce((acc, r) => acc + (r.stars || 0), 0)
      processedData.stats = {
        totalStars,
        totalProjects: processedData.repos.length
      }

      setUserData(processedData)
      setEditedData(processedData)
      setView('dashboard')
    } catch (err) {
      setError(err.message || 'Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  const handleViewPortfolio = () => {
    setView('portfolio')
  }

  const handleViewResume = () => {
    setView('resume')
  }

  const handleEdit = (newData) => {
    setEditedData(newData)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  if (loading) {
    return <Loading message="Fetching your GitHub data..." />
  }

  if (error) {
    return <Error message={error} onRetry={() => { setError(null); setView('landing') }} />
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
          onViewResume={handleViewResume}
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
      {view === 'resume' && (
        <Resume
          userData={editedData}
          theme={theme}
          onBack={() => setView('dashboard')}
        />
      )}
    </div>
  )
}

export default App