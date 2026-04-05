export const generateProjectDescription = (project) => {
  if (project.description && project.description.length > 20) {
    return project.description
  }
  
  const templates = {
    JavaScript: `A dynamic ${project.name} project built with JavaScript. Features modern web technologies and interactive user experiences.`,
    TypeScript: `A type-safe ${project.name} application developed with TypeScript for robust enterprise solutions.`,
    Python: `A Python-based ${project.name} project implementing efficient algorithms and clean code architecture.`,
    Java: `A Java enterprise application ${project.name} with scalable architecture and best practices.`,
    Go: `A high-performance ${project.name} service built with Go for optimal efficiency and concurrency.`,
    Rust: `A memory-safe ${project.name} implementation leveraging Rust's performance and reliability.`,
    default: `An innovative ${project.name} project showcasing modern development practices and technical skills.`
  }
  
  return templates[project.language] || templates.default
}

export const generateUserSummary = (userData) => {
  const languages = userData.languages || []
  const repos = userData.repos || []
  
  let specialization = 'Full-stack Developer'
  if (languages.includes('Python') && languages.length <= 3) {
    specialization = 'Python Developer'
  } else if (languages.includes('JavaScript') || languages.includes('TypeScript')) {
    if (languages.includes('React') || languages.includes('Vue')) {
      specialization = 'Frontend Developer'
    } else {
      specialization = 'JavaScript Developer'
    }
  } else if (languages.includes('Go') || languages.includes('Rust')) {
    specialization = 'Systems Developer'
  } else if (languages.includes('Java') || languages.includes('Kotlin')) {
    specialization = 'Android Developer'
  }
  
  const topProjects = repos.filter(r => r.stars > 5).length
  const contribution = repos.length > 0 ? 'active' : 'emerging'
  
  return {
    summary: `${specialization} with expertise in ${languages.slice(0, 4).join(', ')}. Passionate about building scalable solutions and contributing to open source. ${topProjects > 0 ? `Has ${topProjects} well-received projects.` : ''}`,
    specialization,
    level: repos.length > 10 ? 'Senior' : repos.length > 5 ? 'Mid-level' : 'Junior'
  }
}

export const rankProjects = (repos) => {
  return [...repos]
    .map(repo => {
      let score = 0
      if (repo.stars) score += repo.stars * 2
      if (repo.forks) score += repo.forks
      if (repo.description && repo.description.length > 30) score += 3
      if (repo.topics?.length > 0) score += repo.topics.length
      if (repo.language) score += 1
      return { ...repo, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
}

export const generateResumeBullets = (project) => {
  const bullets = []
  
  if (project.description) {
    bullets.push(`Developed ${project.name} - ${project.description}`)
  }
  
  if (project.language) {
    bullets.push(`Built using ${project.language} with focus on code quality and performance`)
  }
  
  if (project.stars > 0) {
    bullets.push(`Gained ${project.stars} stars, demonstrating community interest and project value`)
  }
  
  if (project.topics?.length > 0) {
    bullets.push(`Implemented using ${project.topics.slice(0, 3).join(', ')} technologies`)
  }
  
  return bullets.slice(0, 3)
}