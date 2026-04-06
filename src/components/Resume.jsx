import { useState } from 'react'

export default function Resume({ userData, theme, onBack, onEdit }) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const templates = {
    modern: {
      name: 'Modern',
      primary: '#0f172a',
      accent: '#06b6d4'
    },
    minimal: {
      name: 'Minimal',
      primary: '#1f2937',
      accent: '#6b7280'
    },
    creative: {
      name: 'Creative',
      primary: '#7c3aed',
      accent: '#ec4899'
    }
  }

  const downloadPDF = () => {
    window.print()
  }

  const getDevType = () => {
    const langs = userData?.languages || []
    if (langs.includes('Python') && !langs.includes('JavaScript')) return 'Backend Developer'
    if (langs.includes('JavaScript') && langs.includes('TypeScript')) return 'Full Stack Developer'
    if (langs.includes('Go') || langs.includes('Rust')) return 'Systems Engineer'
    return 'Software Developer'
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xl font-bold text-white">
              <span className="text-cyan-400">Dev</span>Persona
            </span>
            <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
              Resume
            </span>
          </div>
          <button
            onClick={downloadPDF}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(templates).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTemplate === key
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-12 print:shadow-none print:p-0" id="resume-content">
          <div className="flex items-start gap-8 mb-8">
            <img
              src={userData?.avatar}
              alt={userData?.username}
              className="w-24 h-24 rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{userData?.name}</h1>
              <p className="text-lg text-gray-600 mb-2">{getDevType()}</p>
              <p className="text-gray-600">{userData?.bio}</p>
              <div className="flex gap-4 mt-4 text-sm text-gray-600">
                <span>@{userData?.username}</span>
                {userData?.location && <span>📍 {userData.location}</span>}
                {userData?.blog && <span>🌐 {userData.blog}</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500">Projects</h2>
              <div className="space-y-4">
                {userData?.repos?.filter(p => p.visible !== false).slice(0, 6).map(project => (
                  <div key={project.id}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      {project.stars > 0 && (
                        <span className="text-sm text-gray-600">★ {project.stars}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.description || `${project.language || 'Project'} implementation`}
                    </p>
                    {project.language && (
                      <span className="text-xs text-gray-500">{project.language}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {userData?.languages?.map(lang => (
                  <span key={lang} className="text-sm px-2 py-1 bg-gray-100 text-gray-700 rounded">
                    {lang}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-cyan-500">Stats</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Repositories</span>
                  <span className="font-medium">{userData?.publicRepos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-medium">{userData?.followers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Stars</span>
                  <span className="font-medium">
                    {userData?.repos?.reduce((acc, r) => acc + (r.stars || 0), 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            Generated by DevPersona • 
            <a href={`https://github.com/${userData?.username}`} className="text-cyan-600 hover:underline ml-1">
              View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}