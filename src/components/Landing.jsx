import { useState } from 'react'

export default function Landing({ onGenerate }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim()) return

    setLoading(true)
    setError('')

    try {
      const cleanUsername = username.replace('https://github.com/', '').replace('/', '').trim()
      const response = await fetch(`https://api.github.com/users/${cleanUsername}`)
      
      if (!response.ok) {
        throw new Error('User not found')
      }

      const userData = await response.json()
      
      const reposResponse = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=50`)
      const repos = reposResponse.ok ? await reposResponse.json() : []

      const processedData = {
        username: userData.login,
        name: userData.name || userData.login,
        bio: userData.bio || 'Developer',
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
          updated: repo.updated_at
        })).sort((a, b) => b.stars - a.stars).slice(0, 10),
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created: userData.created_at
      }

      const languages = [...new Set(repos.map(r => r.language).filter(Boolean))]
      processedData.languages = languages

      onGenerate(processedData)
    } catch (err) {
      setError(err.message || 'Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            <span className="text-cyan-400">Dev</span>Persona
          </h1>
          <p className="text-xl text-slate-400">
            Transform your GitHub profile into a stunning portfolio
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter your GitHub username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username or github.com/username"
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Fetching your data...
                </span>
              ) : (
                'Generate Portfolio'
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-sm text-slate-400 text-center">
              Powered by GitHub API • No login required • Free forever
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-cyan-400">5+</div>
            <div className="text-sm text-slate-400 mt-1">Themes</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-cyan-400">AI</div>
            <div className="text-sm text-slate-400 mt-1">Enhanced</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-cyan-400">Export</div>
            <div className="text-sm text-slate-400 mt-1">Ready</div>
          </div>
        </div>
      </div>
    </div>
  )
}