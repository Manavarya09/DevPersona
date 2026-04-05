export const fetchGitHubUser = async (username) => {
  const cleanUsername = username.replace('https://github.com/', '').replace('/', '').trim()
  
  const userResponse = await fetch(`https://api.github.com/users/${cleanUsername}`)
  if (!userResponse.ok) {
    throw new Error('User not found')
  }
  
  const userData = await userResponse.json()
  
  const reposResponse = await fetch(`https://api.github.com/users/${cleanUsername}/repos?sort=updated&per_page=50`)
  const repos = reposResponse.ok ? await reposResponse.json() : []
  
  return processGitHubData(userData, repos)
}

export const processGitHubData = (userData, repos) => {
  const processedRepos = repos
    .map(repo => ({
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
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 12)
  
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))]
  
  const totalStars = processedRepos.reduce((acc, r) => acc + (r.stars || 0), 0)
  const totalForks = processedRepos.reduce((acc, r) => acc + (r.forks ? 1 : 0), 0)
  
  return {
    username: userData.login,
    name: userData.name || userData.login,
    bio: userData.bio || 'Developer passionate about building things',
    avatar: userData.avatar_url,
    location: userData.location,
    blog: userData.blog,
    company: userData.company,
    repos: processedRepos,
    languages,
    publicRepos: userData.public_repos,
    followers: userData.followers,
    following: userData.following,
    created: userData.created_at,
    stats: {
      totalStars,
      totalForks,
      totalProjects: processedRepos.length
    }
  }
}

export const getLanguageColor = (lang) => {
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
    Kotlin: '#A97BFF',
    Vue: '#41b883',
    Dart: '#00B4AB',
    Scala: '#c22d40',
    Shell: '#89e051'
  }
  return colors[lang] || '#6b7280'
}