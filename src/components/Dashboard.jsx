import { useState } from 'react'

const themes = [
  { id: 'developer', name: 'Developer', color: 'from-cyan-500 to-blue-600', icon: '💻' },
  { id: 'startup', name: 'Startup', color: 'from-orange-500 to-pink-600', icon: '🚀' },
  { id: 'designer', name: 'Designer', color: 'from-purple-500 to-pink-500', icon: '🎨' },
  { id: 'resume', name: 'Resume', color: 'from-slate-500 to-slate-700', icon: '📄' },
  { id: 'hacker', name: 'Hacker', color: 'from-green-500 to-emerald-700', icon: '⚡' },
]

export default function Dashboard({ userData, theme, onThemeChange, onViewPortfolio, onEdit, onBack }) {
  const [activeTab, setActiveTab] = useState('projects')
  const [editedProjects, setEditedProjects] = useState(userData?.repos || [])
  const [editedBio, setEditedBio] = useState(userData?.bio || '')
  const [editedName, setEditedName] = useState(userData?.name || '')

  const updateProject = (id, field, value) => {
    setEditedProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const toggleProject = (id) => {
    setEditedProjects(prev => prev.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    ))
  }

  const saveChanges = () => {
    onEdit({
      ...userData,
      repos: editedProjects,
      bio: editedBio,
      name: editedName
    })
  }

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      Go: '#00ADD8',
      Rust: '#dea584',
      Ruby: '#701516',
      PHP: '#4F5D95',
      'C++': '#f34b7d',
      C: '#555555',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Swift: '#F05138',
      Kotlin: '#A97BFF'
    }
    return colors[lang] || '#6b7280'
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-white">
                <span className="text-cyan-400">Dev</span>Persona
              </span>
              <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                Dashboard
              </span>
            </div>
          </div>
          <button
            onClick={onViewPortfolio}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            View Portfolio
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <img
                src={userData?.avatar}
                alt={userData?.username}
                className="w-24 h-24 rounded-2xl mx-auto mb-4 border-2 border-cyan-500/50"
              />
              <h2 className="text-xl font-bold text-white text-center">{userData?.name}</h2>
              <p className="text-slate-400 text-center">@{userData?.username}</p>
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <span className="text-cyan-400 font-semibold">{userData?.publicRepos}</span>
                <span className="text-slate-500">repos</span>
                <span className="text-cyan-400 font-semibold">{userData?.followers}</span>
                <span className="text-slate-500">followers</span>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      theme === t.id 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <div className="text-sm text-slate-300">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData?.languages?.map(lang => (
                  <span 
                    key={lang}
                    className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300 flex items-center gap-2"
                  >
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: getLanguageColor(lang) }}
                    />
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Analytics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Projects</span>
                  <span className="text-white font-semibold">{userData?.repos?.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Stars</span>
                  <span className="text-white font-semibold">
                    {userData?.repos?.reduce((acc, r) => acc + (r.stars || 0), 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Languages Used</span>
                  <span className="text-white font-semibold">{userData?.languages?.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="flex border-b border-slate-700/50">
                {['projects', 'profile', 'export'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab 
                        ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-700/30' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">Projects</h3>
                      <span className="text-sm text-slate-400">
                        {editedProjects.filter(p => p.visible !== false).length} visible
                      </span>
                    </div>
                    {editedProjects.map((project, idx) => (
                      <div 
                        key={project.id}
                        className={`p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 ${
                          project.visible === false ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white font-medium">{project.name}</h4>
                              {project.stars > 0 && (
                                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                                  ★ {project.stars}
                                </span>
                              )}
                              {project.forks && (
                                <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">
                                  Forked
                                </span>
                              )}
                            </div>
                            <input
                              type="text"
                              value={project.description || ''}
                              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                              placeholder="Add project description..."
                            />
                          </div>
                          <button
                            onClick={() => toggleProject(project.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              project.visible === false 
                                ? 'text-red-400 hover:bg-red-500/10' 
                                : 'text-green-400 hover:bg-green-500/10'
                            }`}
                          >
                            {project.visible === false ? '👁' : '✓'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Display Name</label>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Bio</label>
                      <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 resize-none"
                      />
                    </div>
                    <button
                      onClick={saveChanges}
                      className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-400 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                {activeTab === 'export' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors text-left group">
                        <div className="text-2xl mb-2">🌐</div>
                        <div className="text-white font-medium">Live Website</div>
                        <div className="text-sm text-slate-400 mt-1">Share your portfolio</div>
                      </button>
                      <button className="p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors text-left group">
                        <div className="text-2xl mb-2">📄</div>
                        <div className="text-white font-medium">PDF Resume</div>
                        <div className="text-sm text-slate-400 mt-1">Download as PDF</div>
                      </button>
                      <button className="p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors text-left group">
                        <div className="text-2xl mb-2">📦</div>
                        <div className="text-white font-medium">Static Export</div>
                        <div className="text-sm text-slate-400 mt-1">Download HTML/CSS</div>
                      </button>
                      <button className="p-6 bg-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500 transition-colors text-left group">
                        <div className="text-2xl mb-2">🔗</div>
                        <div className="text-white font-medium">Share Link</div>
                        <div className="text-sm text-slate-400 mt-1">Copy link to share</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}