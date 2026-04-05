const themeStyles = {
  developer: {
    bg: 'bg-slate-900',
    card: 'bg-slate-800/50 border-slate-700/50',
    text: 'text-slate-100',
    textMuted: 'text-slate-400',
    accent: 'text-cyan-400',
    button: 'from-cyan-500 to-blue-600',
    gradient: 'from-slate-900 via-slate-800 to-slate-900'
  },
  startup: {
    bg: 'bg-white',
    card: 'bg-white border-orange-100 shadow-lg',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    accent: 'text-orange-600',
    button: 'from-orange-500 to-pink-600',
    gradient: 'from-orange-50 via-white to-pink-50'
  },
  designer: {
    bg: 'bg-purple-950',
    card: 'bg-purple-900/30 border-purple-700/30',
    text: 'text-purple-100',
    textMuted: 'text-purple-300',
    accent: 'text-pink-400',
    button: 'from-purple-500 to-pink-500',
    gradient: 'from-purple-950 via-purple-900 to-pink-950'
  },
  resume: {
    bg: 'bg-gray-100',
    card: 'bg-white border-gray-200',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
    accent: 'text-gray-800',
    button: 'from-gray-700 to-gray-900',
    gradient: 'from-gray-100 via-white to-gray-100'
  },
  hacker: {
    bg: 'bg-black',
    card: 'bg-green-900/20 border-green-800/30',
    text: 'text-green-400',
    textMuted: 'text-green-600',
    accent: 'text-green-500',
    button: 'from-green-600 to-emerald-700',
    gradient: 'from-black via-gray-900 to-black'
  }
}

export default function Portfolio({ userData, theme, onBack, onEdit }) {
  const style = themeStyles[theme] || themeStyles.developer
  const visibleProjects = userData?.repos?.filter(p => p.visible !== false) || []

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
    <div className={`min-h-screen ${style.bg} ${style.gradient} bg-fixed`}>
      <nav className="sticky top-0 backdrop-blur-xl border-b border-slate-800/20 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`text-xl font-bold ${style.accent}`}>DevPersona</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className={`px-4 py-2 text-sm ${style.textMuted} hover:${style.text} transition-colors`}
            >
              ← Back
            </button>
            <button
              onClick={onEdit}
              className={`px-4 py-2 text-sm bg-gradient-to-r ${style.button} text-white rounded-lg font-medium`}
            >
              Edit
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <img
            src={userData?.avatar}
            alt={userData?.username}
            className="w-32 h-32 rounded-2xl mx-auto mb-6 border-4 border-cyan-500/30"
          />
          <h1 className={`text-5xl font-bold ${style.text} mb-3`}>{userData?.name}</h1>
          <p className={`text-xl ${style.textMuted} mb-4`}>@{userData?.username}</p>
          <p className={`text-lg ${style.textMuted} max-w-2xl mx-auto`}>{userData?.bio}</p>
          
          <div className="flex justify-center gap-6 mt-6">
            {userData?.location && (
              <span className={`flex items-center gap-2 ${style.textMuted}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {userData.location}
              </span>
            )}
            {userData?.blog && (
              <a 
                href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 ${style.accent} hover:underline`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Website
              </a>
            )}
          </div>

          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className={`text-3xl font-bold ${style.accent}`}>{userData?.publicRepos}</div>
              <div className={`text-sm ${style.textMuted}`}>Repositories</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${style.accent}`}>{userData?.followers}</div>
              <div className={`text-sm ${style.textMuted}`}>Followers</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold ${style.accent}`}>{userData?.following}</div>
              <div className={`text-sm ${style.textMuted}`}>Following</div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold ${style.text} mb-8 text-center`}>Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {userData?.languages?.map(lang => (
              <span 
                key={lang}
                className={`px-4 py-2 rounded-full text-sm font-medium ${style.card} ${style.text}`}
                style={{ borderColor: getLanguageColor(lang) + '40' }}
              >
                <span 
                  className="inline-block w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: getLanguageColor(lang) }}
                />
                {lang}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className={`text-3xl font-bold ${style.text} mb-8 text-center`}>Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleProjects.map(project => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-2xl ${style.card} hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-semibold ${style.text}`}>{project.name}</h3>
                  <div className="flex items-center gap-3">
                    {project.stars > 0 && (
                      <span className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stars}
                      </span>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${style.textMuted} mb-4`}>
                  {project.description || 'No description available'}
                </p>
                <div className="flex items-center gap-4">
                  {project.language && (
                    <span className="flex items-center gap-2 text-sm">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(project.language) }}
                      />
                      <span className={style.textMuted}>{project.language}</span>
                    </span>
                  )}
                  {project.topics?.slice(0, 2).map(topic => (
                    <span key={topic} className={`text-xs px-2 py-1 rounded-full ${style.textMuted} bg-slate-700/30`}>
                      {topic}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center py-8 border-t border-slate-800/20">
          <p className={`text-sm ${style.textMuted}`}>
            Built with DevPersona • 
            <a 
              href={`https://github.com/${userData?.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${style.accent} hover:underline ml-1`}
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}